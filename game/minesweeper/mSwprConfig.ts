export const difficulty = {
  easy: { rows: 9, cols: 9, bombs: 10 },
  medium: { rows: 15, cols: 15, bombs: 40 },
  hard: { rows: 30, cols: 30, bombs: 180 },
};

export const adjacentCells = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
