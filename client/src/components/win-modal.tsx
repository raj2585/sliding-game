import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Sparkles, RotateCcw, Home } from "lucide-react";

interface WinModalProps {
  open: boolean;
  onClose: () => void;
  time: number;
  moves: number;
  imageSrc: string;
  imageName: string;
  onPlayAgain: () => void;
  onChangeImage: () => void;
  isNewBest: boolean;
}

export function WinModal({
  open,
  onClose,
  time,
  moves,
  imageSrc,
  imageName,
  onPlayAgain,
  onChangeImage,
  isNewBest,
}: WinModalProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-testid="modal-win">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 pt-6"
            >
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10"
                >
                  <Trophy className="w-10 h-10 text-primary" />
                </motion.div>

                <div>
                  <h2 className="font-serif text-3xl font-bold text-foreground" data-testid="text-congratulations">
                    Puzzle Complete!
                  </h2>
                  {isNewBest && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-center gap-2 mt-2 text-primary"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="font-medium text-sm">New Best Score!</span>
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>
              </div>

              <Card className="overflow-hidden">
                <img
                  src={imageSrc}
                  alt={imageName}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4 text-center bg-muted/30">
                  <p className="font-medium text-foreground">{imageName}</p>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-sm text-muted-foreground mb-1">Time</div>
                  <div className="text-2xl font-mono font-bold tabular-nums text-foreground" data-testid="text-final-time">
                    {formatTime(time)}
                  </div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-sm text-muted-foreground mb-1">Moves</div>
                  <div className="text-2xl font-mono font-bold tabular-nums text-foreground" data-testid="text-final-moves">
                    {moves}
                  </div>
                </Card>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={onChangeImage}
                  data-testid="button-change-puzzle"
                >
                  <Home className="w-4 h-4 mr-2" />
                  New Puzzle
                </Button>
                <Button
                  className="flex-1"
                  onClick={onPlayAgain}
                  data-testid="button-play-again"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
