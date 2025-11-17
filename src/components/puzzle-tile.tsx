import { motion } from "framer-motion";
import type { PuzzleTile } from "@shared/schema";

interface PuzzleTileProps {
  tile: PuzzleTile;
  imageSrc: string; // combined image (existing behavior)
  gridSize: number;
  onClick: () => void;
  // optional per-tile image (not required now)
  tileImageSrc?: string;
}

export function PuzzleTileComponent({ tile, imageSrc, gridSize, onClick, tileImageSrc }: PuzzleTileProps) {
  if (tile.isEmpty) {
    return <div className="bg-muted/30 rounded-lg" data-testid={`tile-empty`} />;
  }

  // If explicit per-tile image provided, render <img />
  if (tileImageSrc) {
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
        data-testid={`tile-${tile.id}`}
      >
        <img src={tileImageSrc} alt={`tile-${tile.id}`} className="w-full h-full object-cover" />
      </motion.button>
    );
  }

  // Fallback: slice from the combined full image (existing behavior)
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
