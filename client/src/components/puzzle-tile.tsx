import { motion } from "framer-motion";
import type { PuzzleTile } from "@shared/schema";

interface PuzzleTileProps {
  tile: PuzzleTile;
  imageSrc: string;
  gridSize: number;
  onClick: () => void;
}

export function PuzzleTileComponent({ tile, imageSrc, gridSize, onClick }: PuzzleTileProps) {
  if (tile.isEmpty) {
    return (
      <div className="bg-muted/30 rounded-lg" data-testid={`tile-empty`} />
    );
  }

  const row = Math.floor(tile.id / gridSize);
  const col = tile.id % gridSize;
  const backgroundPositionX = (col / (gridSize - 1)) * 100;
  const backgroundPositionY = (row / (gridSize - 1)) * 100;

  return (
    <motion.button
      layout
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      onClick={onClick}
      className="relative overflow-hidden rounded-lg shadow-md hover-elevate active-elevate-2 cursor-pointer aspect-square"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: `${gridSize * 100}%`,
        backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
      }}
      data-testid={`tile-${tile.id}`}
    />
  );
}
