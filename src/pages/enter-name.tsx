import { useState, useMemo, useId } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Trophy, Users, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { puzzleImages } from "@shared/schema";
import { BrandMark } from "@/components/logo";
import {
  getActivePlayer,
  getLeaderboard,
  registerPlayer,
  setActivePlayer,
} from "@/lib/storage";

const MIN_NAME_LENGTH = 3;

export default function EnterName() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState(() => getActivePlayer() ?? "");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const leaderboard = useMemo(() => getLeaderboard(), [username]);
  const helperId = useId();
  const infoId = `${helperId}-info`;
  const errorId = error ? `${helperId}-error` : undefined;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = username.trim();

    if (trimmed.length < MIN_NAME_LENGTH) {
      setError(`Enter at least ${MIN_NAME_LENGTH} characters`);
      return;
    }

    setSubmitting(true);
    registerPlayer(trimmed);
    setActivePlayer(trimmed);
    setSubmitting(false);
    setError("");
    setLocation("/select");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40 flex flex-col items-center justify-start px-4 py-6">
      <header className="w-full max-w-4xl flex items-center justify-between mb-4">
        <BrandMark />
      </header>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl grid gap-8 md:grid-cols-2"
      >
        <Card className="p-8 space-y-6 shadow-2xl border-primary/10">
          <div className="space-y-2">
            <p className="uppercase tracking-wide text-xs text-primary font-semibold">
              Welcome to the Jodhpur Puzzle League
            </p>
            <h1 className="font-serif text-4xl text-foreground" id={`${helperId}-heading`}>
              Claim your unique explorer name
            </h1>
            <p className="text-muted-foreground text-sm">
              Usernames are unique across the leaderboard. Choose wisely and start building your legacy.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-muted-foreground"
              >
                Explorer name
              </label>
              <Input
                id="username"
                value={username}
                maxLength={24}
                autoComplete="off"
                onChange={(event) => {
                  setUsername(event.target.value);
                  if (error) setError("");
                }}
                placeholder="e.g. DesertFox, BlueCityDiva"
                aria-describedby={[infoId, errorId].filter(Boolean).join(" ") || undefined}
              />
              <div id={infoId} className="text-xs text-muted-foreground">
                At least {MIN_NAME_LENGTH} characters, unique on the leaderboard.
              </div>
              {error && (
                <p
                  id={errorId}
                  className="text-sm text-destructive"
                  role="alert"
                  aria-live="assertive"
                >
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg"
              disabled={submitting}
              data-testid="button-enter-gallery"
              aria-describedby={`${helperId}-submit-hint`}
            >
              Enter the Gallery
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <p id={`${helperId}-submit-hint`} className="text-xs text-muted-foreground">
              Submitting stores your name locally so you can track scores.
            </p>
          </form>

          <div className="rounded-xl bg-muted/40 p-4 border border-muted">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <p className="font-medium">How it works</p>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
              <li>Pick a unique username (one per player)</li>
              <li>Choose a landmark puzzle in the next step</li>
              <li>Climb the leaderboard with your best time</li>
            </ul>
          </div>
        </Card>

        <Card
          className="p-6 bg-card/80 backdrop-blur shadow-xl border-muted"
          aria-labelledby={`${helperId}-leaderboard-title`}
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-primary" aria-hidden="true" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Global Leaderboard
              </p>
              <p className="font-semibold text-lg text-foreground" id={`${helperId}-leaderboard-title`}>
                Top explorers
              </p>
            </div>
          </div>

          {leaderboard.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground" role="status" aria-live="polite">
              <p>No scores yet. Be the first to set a record!</p>
            </div>
          ) : (
            <ol className="space-y-4" aria-live="polite">
              {leaderboard.slice(0, 8).map((entry, index) => (
                <li
                  key={entry.username}
                  className="rounded-lg border border-border/60 p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      #{index + 1} {entry.username}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.puzzleSize} · {puzzleImages[entry.imageId].name}
                    </p>
                  </div>
                  <div className="text-right" aria-label={`Best time ${formatTime(entry.bestTime)} in ${entry.bestMoves} moves`}>
                    <p className="font-mono text-lg text-foreground">
                      {formatTime(entry.bestTime)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.bestMoves} moves
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

function formatTime(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

