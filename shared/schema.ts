export const puzzleImages = {
  mehrangarh: {
    id: "mehrangarh",
    name: "Mehrangarh Fort Sunrise",
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80",
    credit: "Photo by Annie Spratt on Unsplash",
  },
  blueCity: {
    id: "blueCity",
    name: "Blue City Rooftops",
    url: "https://images.unsplash.com/photo-1500534314887-48c8c63687c2?auto=format&fit=crop&w=1600&q=80",
    credit: "Photo by Shalender Kumar on Unsplash",
  },
  ghantaGhar: {
    id: "ghantaGhar",
    name: "Ghanta Ghar Market Glow",
    url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80",
    credit: "Photo by Sagar on Unsplash",
  },
  umaidBhavan: {
    id: "umaidBhavan",
    name: "Umaid Bhavan Palace Gardens",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80",
    credit: "Photo by Govind Krishnan on Unsplash",
  },
  jaswantThada: {
    id: "jaswantThada",
    name: "Jaswant Thada Reflections",
    url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
    credit: "Photo by Fancycrave on Unsplash",
  },
  stepwell: {
    id: "stepwell",
    name: "Toorji Ka Jhalra Geometry",
    url: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
    credit: "Photo by Louis Hansel on Unsplash",
  },
} as const;

export type PuzzleImageId = keyof typeof puzzleImages;

export type PuzzleSize = "4x4";
export const puzzleSizes: PuzzleSize[] = ["4x4"];

export interface PuzzleTile {
  id: number;
  position: number;
  correctPosition: number;
  isEmpty: boolean;
}

export interface GameState {
  tiles: PuzzleTile[];
  moves: number;
  startTime: number | null;
  isComplete: boolean;
  selectedImage: PuzzleImageId;
  puzzleSize: PuzzleSize;
}

export interface BestScore {
  time: number;
  moves: number;
  date: string;
}

export type BestScores = {
  [key in PuzzleSize]: {
    [key in PuzzleImageId]?: BestScore;
  };
};
