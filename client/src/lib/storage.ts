import type { PuzzleSize, PuzzleImageId, BestScore } from "@shared/schema";

const PLAYER_SCORES_KEY = "jodhpur-puzzle-player-scores";
const ACTIVE_PLAYER_KEY = "jodhpur-puzzle-active-player";

type ScoreBucket = Partial<Record<PuzzleImageId, BestScore>>;
type PlayerSizeScores = Partial<Record<PuzzleSize, ScoreBucket>>;
type PlayerScores = Record<string, PlayerSizeScores>;

export interface LeaderboardEntry {
  username: string;
  bestTime: number;
  bestMoves: number;
  puzzleSize: PuzzleSize;
  imageId: PuzzleImageId;
  updatedAt: string;
}

function getEmptyScores(): PlayerSizeScores {
  return {
    "4x4": {},
  };
}

function readScores(): PlayerScores {
  try {
    const raw = localStorage.getItem(PLAYER_SCORES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as PlayerScores;
    return parsed ?? {};
  } catch {
    return {};
  }
}

function writeScores(scores: PlayerScores) {
  localStorage.setItem(PLAYER_SCORES_KEY, JSON.stringify(scores));
}

export function getActivePlayer(): string | null {
  try {
    return localStorage.getItem(ACTIVE_PLAYER_KEY);
  } catch {
    return null;
  }
}

export function setActivePlayer(username: string) {
  localStorage.setItem(ACTIVE_PLAYER_KEY, username);
}

export function clearActivePlayer() {
  localStorage.removeItem(ACTIVE_PLAYER_KEY);
}

export function registerPlayer(username: string): { created: boolean } {
  const normalized = username.trim();
  const scores = readScores();
  if (!scores[normalized]) {
    scores[normalized] = getEmptyScores();
    writeScores(scores);
    return { created: true };
  }
  return { created: false };
}

export function getPlayerNames(): string[] {
  return Object.keys(readScores());
}

export function getPlayerScores(username: string): PlayerSizeScores {
  const scores = readScores();
  if (!scores[username]) {
    scores[username] = getEmptyScores();
    writeScores(scores);
  }
  return scores[username];
}

export function getPlayerPuzzleBest(
  username: string,
  size: PuzzleSize,
  imageId: PuzzleImageId
): BestScore | undefined {
  const scores = readScores();
  return scores[username]?.[size]?.[imageId];
}

function ensureScoreBuckets(
  scores: PlayerScores,
  username: string,
  size: PuzzleSize
): ScoreBucket {
  if (!scores[username]) {
    scores[username] = getEmptyScores();
  }
  if (!scores[username][size]) {
    scores[username][size] = {};
  }
  return scores[username][size];
}

export function savePlayerBestScore(
  username: string,
  size: PuzzleSize,
  imageId: PuzzleImageId,
  time: number,
  moves: number
) {
  try {
    const trimmed = username.trim();
    if (!trimmed) return { isNewPersonalBest: false, best: undefined as BestScore | undefined };

    const scores = readScores();
    const bucket = ensureScoreBuckets(scores, trimmed, size);
    const currentBest = bucket[imageId];
    const isNewPersonalBest =
      !currentBest ||
      time < currentBest.time ||
      (time === currentBest.time && moves < currentBest.moves);

    if (isNewPersonalBest) {
      bucket[imageId] = {
        time,
        moves,
        date: new Date().toISOString(),
      };
      writeScores(scores);
    } else {
      // still persist any newly registered player bucket
      writeScores(scores);
    }

    return {
      isNewPersonalBest,
      best: bucket[imageId],
    };
  } catch (error) {
    console.error("Failed to save personal best:", error);
    return { isNewPersonalBest: false, best: undefined as BestScore | undefined };
  }
}

export function getLeaderboard(): LeaderboardEntry[] {
  const scores = readScores();
  const entries: LeaderboardEntry[] = [];

  Object.entries(scores).forEach(([username, sizeMap]) => {
    let personalBest: LeaderboardEntry | null = null;

    (Object.keys(sizeMap) as PuzzleSize[]).forEach((size) => {
      const puzzles = sizeMap[size];
      if (!puzzles) return;
      (Object.keys(puzzles) as PuzzleImageId[]).forEach((imageId) => {
        const score = puzzles[imageId];
        if (!score) return;

        if (
          !personalBest ||
          score.time < personalBest.bestTime ||
          (score.time === personalBest.bestTime && score.moves < personalBest.bestMoves)
        ) {
          personalBest = {
            username,
            bestTime: score.time,
            bestMoves: score.moves,
            puzzleSize: size,
            imageId,
            updatedAt: score.date,
          };
        }
      });
    });

    if (personalBest) {
      entries.push(personalBest);
    }
  });

  return entries.sort((a, b) => {
    if (a.bestTime === b.bestTime) {
      return a.bestMoves - b.bestMoves;
    }
    return a.bestTime - b.bestTime;
  });
}
