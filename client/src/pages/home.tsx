import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { puzzleImages, type PuzzleImageId } from "@shared/schema";
import { motion } from "framer-motion";

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState<PuzzleImageId | null>(null);
  const [playerName, setPlayerName] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("jodhpur-puzzle-player") ?? "";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("jodhpur-puzzle-player", playerName);
  }, [playerName]);

  const handleStartGame = () => {
    const trimmedName = playerName.trim();
    if (selectedImage && trimmedName) {
      const params = new URLSearchParams({
        image: selectedImage,
        size: "4x4",
        player: trimmedName,
      });
      setLocation(`/game?${params.toString()}`);
    }
  };

  const isStartDisabled = !selectedImage || !playerName.trim();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground" data-testid="text-title">
            Jodhpur Puzzle
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-subtitle">
            Experience the beauty of Rajasthan's Blue City through an elegant sliding puzzle
          </p>
        </div>

        <div className="space-y-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-serif font-semibold text-center" data-testid="text-player-name">
              Who&apos;s playing today?
            </h2>
            <div className="space-y-2">
              <Label htmlFor="player-name" className="text-muted-foreground text-sm">
                Enter your name to personalize the leaderboard.
              </Label>
              <Input
                id="player-name"
                value={playerName}
                onChange={(event) => setPlayerName(event.target.value)}
                placeholder="e.g. Aditi or Team Blue"
                maxLength={32}
                autoComplete="off"
                data-testid="input-player-name"
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-semibold mb-6 text-center" data-testid="text-select-image">
              Select a Landmark
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {Object.entries(puzzleImages).map(([id, image]) => (
                <motion.div
                  key={id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card
                    className={`cursor-pointer overflow-hidden aspect-square relative group ${
                      selectedImage === id ? "ring-4 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedImage(id as PuzzleImageId)}
                    data-testid={`card-image-${id}`}
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-sm">
                      <p className="text-white font-medium text-center text-sm md:text-base">
                        {image.name}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              disabled={isStartDisabled}
              onClick={handleStartGame}
              className="min-w-[200px] h-14 text-lg"
              data-testid="button-start-game"
            >
              Start Puzzle
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
