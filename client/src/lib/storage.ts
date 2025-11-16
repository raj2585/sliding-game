import type { BestScores, PuzzleSize, PuzzleImageId, BestScore } from "@shared/schema";

const STORAGE_KEY = "jodhpur-puzzle-best-scores";

export function getBestScores(): BestScores {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { "4x4": {}, "5x5": {} };
    return JSON.parse(stored);
  } catch {
    return { "4x4": {}, "5x5": {} };
  }
}

export function saveBestScore(
  size: PuzzleSize,
  imageId: PuzzleImageId,
  time: number,
  moves: number
): void {
  try {
    const scores = getBestScores();
    const currentBest = scores[size][imageId];

    const isNewBest =
      !currentBest ||
      time < currentBest.time ||
      (time === currentBest.time && moves < currentBest.moves);

    if (isNewBest) {
      const newScore: BestScore = {
        time,
        moves,
        date: new Date().toISOString(),
      };

      scores[size][imageId] = newScore;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    }
  } catch (error) {
    console.error("Failed to save best score:", error);
  }
}
