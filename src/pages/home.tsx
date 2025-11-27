import { useEffect, useState, useId } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { puzzleImages, type PuzzleImageId } from "@shared/schema";
import { motion } from "framer-motion";
import { UserCircle, LogOut } from "lucide-react";
import { getActivePlayer } from "@/lib/storage";
import { BrandMark } from "@/components/logo";

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState<PuzzleImageId | null>(null);
  const [playerName, setPlayerName] = useState<string | null>(null);
  const startHelpTextId = useId();

  useEffect(() => {
    const stored = getActivePlayer();
    if (!stored) {
      setLocation("/enter");
      return;
    }
    setPlayerName(stored);
  }, [setLocation]);

  const handleStartGame = () => {
    if (selectedImage && playerName) {
      const params = new URLSearchParams({
        image: selectedImage,
      });
      setLocation(`/game?${params.toString()}`);
    }
  };

  const isStartDisabled = !selectedImage || !playerName;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl space-y-12"
      >
        <div className="text-center space-y-4">
          <BrandMark
            orientation="column"
            size={80}
            className="mx-auto cursor-pointer"
            textClassName="text-sm md:text-base font-semibold tracking-[0.4em]"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-subtitle">
            Experience the beauty of Rajasthan's Blue City through an elegant sliding puzzle
          </p>
        </div>

        <div className="space-y-8">
          {playerName && (
            <div className="max-w-3xl mx-auto">
            <Card className="p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <UserCircle className="w-10 h-10 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">
                    Explorer
                  </p>
                  <p className="text-xl font-semibold text-foreground" data-testid="text-player-name">
                    {playerName}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setLocation("/enter")}
                data-testid="button-change-player"
              >
                <LogOut className="w-4 h-4" />
                Switch Player
              </Button>
            </Card>
          </div>
          )}

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

          <div className="flex flex-col items-center justify-center gap-2 pt-4 text-center">
            <Button
              size="lg"
              disabled={isStartDisabled}
              onClick={handleStartGame}
              className="min-w-[200px] h-14 text-lg"
              data-testid="button-start-game"
              aria-describedby={isStartDisabled ? startHelpTextId : undefined}
            >
              Start Puzzle
            </Button>
            {isStartDisabled && (
              <p id={startHelpTextId} className="text-sm text-muted-foreground max-w-sm">
                Select a landmark above to enable the Start Puzzle button.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
