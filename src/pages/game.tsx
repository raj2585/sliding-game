import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, Eye, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  puzzleImages,
  type PuzzleImageId,
  type PuzzleSize,
  type GameState,
  type PuzzleTile,
  type BestScore,
} from "@shared/schema";
import { PuzzleTileComponent } from "@/components/puzzle-tile";
import { WinModal } from "@/components/win-modal";
import {
  getActivePlayer,
  getPlayerPuzzleBest,
  savePlayerBestScore,
} from "@/lib/storage";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/logo";

function createSolvableShuffle(size: number): number[] {
  const totalTiles = size * size;
  const tiles = Array.from({ length: totalTiles }, (_, i) => i);
  
  let inversions = 0;
  do {
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    
    inversions = 0;
    for (let i = 0; i < tiles.length; i++) {
      for (let j = i + 1; j < tiles.length; j++) {
        if (tiles[i] !== totalTiles - 1 && tiles[j] !== totalTiles - 1 && tiles[i] > tiles[j]) {
          inversions++;
        }
      }
    }
    
    const emptyRow = Math.floor(tiles.indexOf(totalTiles - 1) / size);
    const isSolvable = size % 2 === 1 
      ? inversions % 2 === 0 
      : (inversions + emptyRow) % 2 === 1;
    
    if (!isSolvable) continue;
    
    const isSolved = tiles.every((tile, idx) => tile === idx);
    if (!isSolved) break;
  } while (true);
  
  return tiles;
}

export default function Game() {
  const [, setLocation] = useLocation();
  const search = typeof window !== "undefined" ? window.location.search : "";
  const params = new URLSearchParams(search);

  const isValidImageId = (value: string | null): value is PuzzleImageId => {
    if (!value) return false;
    return Object.prototype.hasOwnProperty.call(puzzleImages, value);
  };

  const imageParam = params.get("image");
  const imageId = isValidImageId(imageParam) ? imageParam : ("mehrangarh" as PuzzleImageId);
  const puzzleSize: PuzzleSize = "4x4";
  const gridSize = 4;

  const initializeGame = useCallback(
    (image: PuzzleImageId, size: PuzzleSize): GameState => {
      const totalTiles = gridSize * gridSize;
      const shuffled = createSolvableShuffle(gridSize);

      const tiles: PuzzleTile[] = shuffled.map((tileId, position) => ({
        id: tileId,
        position: position,
        correctPosition: tileId,
        isEmpty: tileId === totalTiles - 1,
      }));

      return {
        tiles,
        moves: 0,
        startTime: Date.now(),
        isComplete: false,
        selectedImage: image,
        puzzleSize: size,
      };
    },
    [gridSize],
  );

  const [gameState, setGameState] = useState<GameState>(() => initializeGame(imageId, puzzleSize));
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [playerName, setPlayerName] = useState<string | null>(() => getActivePlayer());
  const [personalBest, setPersonalBest] = useState<BestScore | undefined>(() =>
    playerName ? getPlayerPuzzleBest(playerName, puzzleSize, imageId) : undefined
  );
  const [justSetPersonalBest, setJustSetPersonalBest] = useState(false);

  useEffect(() => {
    if (!gameState.startTime || gameState.isComplete) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - gameState.startTime!) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.startTime, gameState.isComplete]);

  const checkWin = useCallback((tiles: PuzzleTile[]) => {
    return tiles.every((tile) => tile.position === tile.correctPosition);
  }, []);

  const moveTile = useCallback((tilePosition: number) => {
    if (gameState.isComplete || !playerName) return;

    setGameState((prev) => {
      const emptyIndex = prev.tiles.findIndex((t) => t.isEmpty);
      if (emptyIndex === -1) return prev;

      const emptyPos = emptyIndex;
      const emptyRow = Math.floor(emptyPos / gridSize);
      const emptyCol = emptyPos % gridSize;
      const tileRow = Math.floor(tilePosition / gridSize);
      const tileCol = tilePosition % gridSize;

      const isAdjacent =
        (Math.abs(emptyRow - tileRow) === 1 && emptyCol === tileCol) ||
        (Math.abs(emptyCol - tileCol) === 1 && emptyRow === tileRow);

      if (!isAdjacent) return prev;

      const newTiles = [...prev.tiles];
      const tileToMove = newTiles[tilePosition];
      const emptyTile = newTiles[emptyPos];
      
      newTiles[emptyPos] = { ...tileToMove, position: emptyPos };
      newTiles[tilePosition] = { ...emptyTile, position: tilePosition };

      const isWin = checkWin(newTiles);
      
      if (isWin && prev.startTime) {
        const finalTime = Math.floor((Date.now() - prev.startTime) / 1000);
        const finalMoves = prev.moves + 1;
        const { isNewPersonalBest, best } = savePlayerBestScore(
          playerName,
          prev.puzzleSize,
          prev.selectedImage,
          finalTime,
          finalMoves
        );
        setJustSetPersonalBest(isNewPersonalBest);
        if (best) {
          setPersonalBest(best);
        }
        setTimeout(() => setShowWinModal(true), 300);
      }

      return {
        ...prev,
        tiles: newTiles,
        moves: prev.moves + 1,
        isComplete: isWin,
      };
    });
  }, [gameState.isComplete, gridSize, checkWin, playerName]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState.isComplete) return;

      const emptyIndex = gameState.tiles.findIndex((t) => t.isEmpty);
      if (emptyIndex === -1) return;

      const emptyRow = Math.floor(emptyIndex / gridSize);
      const emptyCol = emptyIndex % gridSize;

      let targetRow = emptyRow;
      let targetCol = emptyCol;

      switch (e.key) {
        case "ArrowUp":
          targetRow = emptyRow - 1;
          break;
        case "ArrowDown":
          targetRow = emptyRow + 1;
          break;
        case "ArrowLeft":
          targetCol = emptyCol - 1;
          break;
        case "ArrowRight":
          targetCol = emptyCol + 1;
          break;
        default:
          return;
      }

      if (targetRow < 0 || targetRow >= gridSize || targetCol < 0 || targetCol >= gridSize) {
        return;
      }

      const targetPos = targetRow * gridSize + targetCol;
      moveTile(targetPos);
      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState, gridSize, moveTile]);

  useEffect(() => {
    const handleShortcuts = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
          target.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        handleRestart();
      }

      if (event.key.toLowerCase() === "p") {
        event.preventDefault();
        setShowPreview((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleShortcuts);
    return () => window.removeEventListener("keydown", handleShortcuts);
  }, [handleRestart]);

  const handleRestart = useCallback(() => {
    setGameState(initializeGame(imageId, puzzleSize));
    setElapsedTime(0);
    setShowWinModal(false);
    setJustSetPersonalBest(false);
  }, [initializeGame, imageId, puzzleSize]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const active = getActivePlayer();
    if (!active) {
      setLocation("/enter");
      return;
    }
    setPlayerName(active);
    setPersonalBest(getPlayerPuzzleBest(active, puzzleSize, imageId));
  }, [setLocation, puzzleSize, imageId]);

  const imageSrc = puzzleImages[imageId].url;
  const imageName = puzzleImages[imageId].name;
  const activePlayerName = playerName || "Explorer";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 bg-card border-b border-card-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/select")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <BrandMark showText size={36} className="px-2 py-1" textClassName="text-[0.55rem]" />
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-8 justify-center">
            <Card className={cn("px-4 py-2 min-w-[140px] text-center", !playerName && "opacity-70")}>
              <div className="text-xs text-muted-foreground">Player</div>
              <div className="text-lg font-semibold" data-testid="text-player-name-value">
                {activePlayerName}
              </div>
            </Card>

            <Card className="px-4 py-2">
              <div className="text-xs text-muted-foreground text-center">Time</div>
              <div className="text-xl font-mono font-semibold tabular-nums" data-testid="text-timer">
                {formatTime(elapsedTime)}
              </div>
            </Card>

            <div
              className="relative"
              onMouseEnter={() => setShowPreview(true)}
              onMouseLeave={() => setShowPreview(false)}
              onTouchStart={() => setShowPreview(true)}
              onTouchEnd={() => setShowPreview(false)}
            >
              <Button
                variant="outline"
                size="icon"
                className="relative"
                data-testid="button-preview"
                aria-label="Preview solved puzzle"
                aria-pressed={showPreview}
                aria-keyshortcuts="P"
              >
                <Eye className="w-5 h-5" />
              </Button>
              <AnimatePresence>
                {showPreview && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50"
                  >
                    <Card className="p-2 shadow-2xl w-64 md:w-80">
                      <img
                        src={imageSrc}
                        alt={`Preview of ${imageName}`}
                        className="w-full rounded-lg"
                      />
                      <p className="text-sm text-center mt-2 text-muted-foreground">
                        {imageName}
                      </p>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Card className="px-4 py-2">
              <div className="text-xs text-muted-foreground text-center">Moves</div>
              <div className="text-xl font-mono font-semibold tabular-nums" data-testid="text-moves">
                {gameState.moves}
              </div>
            </Card>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleRestart}
            data-testid="button-restart"
            aria-label="Restart puzzle"
            aria-keyshortcuts="R"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-2 md:p-4 shadow-2xl">
              <div
                className={`grid gap-1 md:gap-2 aspect-square`}
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                }}
              >
                {gameState.tiles.map((tile) => (
                  <PuzzleTileComponent
                    key={tile.id}
                    tile={tile}
                    imageSrc={imageSrc}
                    gridSize={gridSize}
                    onClick={() => moveTile(tile.position)}
                  />
                ))}
              </div>
            </Card>
          </motion.div>

          {personalBest && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Personal best: {formatTime(personalBest.time)} in {personalBest.moves} moves
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <WinModal
        open={showWinModal}
        onClose={() => setShowWinModal(false)}
        time={elapsedTime}
        moves={gameState.moves}
        imageSrc={imageSrc}
        imageName={imageName}
        playerName={activePlayerName}
        onMenu={() => setLocation("/select")}
        onQuit={() => setLocation("/")}
        isNewBest={justSetPersonalBest}
      />
    </div>
  );
}
