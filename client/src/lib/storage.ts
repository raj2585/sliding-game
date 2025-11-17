import type { BestScores, PuzzleSize, PuzzleImageId, BestScore } from "@shared/schema";

const STORAGE_KEY = "jodhpur-puzzle-best-scores";
const DEFAULT_SCORES: BestScores = { "4x4": {} };

export function getBestScores(): BestScores {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_SCORES;
    const parsed = JSON.parse(stored);
    return {
      "4x4": parsed?.["4x4"] ?? {},
    };
  } catch {
    return DEFAULT_SCORES;
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
    if (!scores[size]) {
      scores[size] = {};
    }
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
