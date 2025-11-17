// Utility helpers for sliding puzzle moves
import type { PuzzleTile } from "@shared/schema";

export function idxToRowCol(index: number, gridSize: number) {
  return { row: Math.floor(index / gridSize), col: index % gridSize };
}

export function isSameLine(a: number, b: number, gridSize: number) {
  const ra = Math.floor(a / gridSize);
  const ca = a % gridSize;
  const rb = Math.floor(b / gridSize);
  const cb = b % gridSize;
  return ra === rb || ca === cb;
}

// returns array of indices strictly between a and b along row/column in order from a->b
export function indicesBetween(a: number, b: number, gridSize: number): number[] {
  if (!isSameLine(a, b, gridSize)) return [];
  const { row: ra, col: ca } = idxToRowCol(a, gridSize);
  const { row: rb, col: cb } = idxToRowCol(b, gridSize);

  const res: number[] = [];
  if (ra === rb) {
    // same row
    const start = Math.min(ca, cb);
    const end = Math.max(ca, cb);
    for (let c = start + 1; c < end; c++) {
      res.push(ra * gridSize + c);
    }
  } else {
    // same column
    const start = Math.min(ra, rb);
    const end = Math.max(ra, rb);
    for (let r = start + 1; r < end; r++) {
      res.push(r * gridSize + ca);
    }
  }
  return res;
}

/**
 * slideTiles:
 * - tiles: array of PuzzleTile objects in row-major order
 * - clickedIndex: index of tile clicked by user
 * - gridSize: size of grid (e.g. 4)
 * Returns new tiles array if a slide happened, or null if invalid move.
 *
 * The algorithm shifts tiles between clickedIndex and emptyIndex one step toward the empty spot,
 * so clicking a tile anywhere in the same row/column as the empty tile causes the entire contiguous line to slide.
 */
export function slideTiles(tiles: PuzzleTile[], clickedIndex: number, gridSize: number): PuzzleTile[] | null {
  const emptyIndex = tiles.findIndex(t => t.isEmpty);
  if (emptyIndex === -1) return null;
  if (clickedIndex === emptyIndex) return null;
  if (!isSameLine(clickedIndex, emptyIndex, gridSize)) return null;

  // Determine delta step from clicked toward empty
  const { row: cr, col: cc } = idxToRowCol(clickedIndex, gridSize);
  const { row: er, col: ec } = idxToRowCol(emptyIndex, gridSize);

  let step: number;
  if (cr === er) {
    step = cc < ec ? 1 : -1;
  } else {
    step = cr < er ? gridSize : -gridSize;
  }

  // Build new tiles by shifting values toward empty
  const newTiles = tiles.map(t => ({ ...t }));
  let cur = emptyIndex;
  while (cur !== clickedIndex) {
    const src = cur - step;
    newTiles[cur] = { ...newTiles[src] };
    cur = src;
  }
  // clicked tile becomes empty
  newTiles[clickedIndex] = { ...newTiles[clickedIndex], isEmpty: true };
  return newTiles;
}
