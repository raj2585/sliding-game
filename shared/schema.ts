export const puzzleImages = {
  mehrangarh: {
    id: "mehrangarh",
    name: "Mehrangarh Fort Sunrise",
    url: "/images/mehrangarh.jpg",
    credit: "Photo from pexels.com",
  },
  blueCity: {
    id: "blueCity",
    name: "Blue City Rooftops",
    url: "/images/blue-city.jpg",
    credit: "Photo from pexels.com",
  },
  ghantaGhar: {
    id: "ghantaGhar",
    name: "Ghanta Ghar",
    url: "/images/ghanta-ghar.jpg",
    credit: "Photo by Raj",
  },
  umaidBhavan: {
    id: "umaidBhavan",
    name: "Umaid Bhavan Palace Gardens",
    url: "/images/umaid-bhavan.jpg",
    credit: "Photo from pexels.com",
  },
  jaswantThada: {
    id: "jaswantThada",
    name: "Jaswant Thada Reflections",
    url: "/images/jaswant-thada.jpg",
    credit: "Photo from pexels.com",
  },
  stepwell: {
    id: "stepwell",
    name: "Toorji Ka Jhalra Geometry",
    url: "/images/stepwell.jpg",
    credit: "Photo from pexels.com",
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
