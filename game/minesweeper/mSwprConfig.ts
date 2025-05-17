export const difficulty = {
  baby: { rows: 5, cols: 5, bombs: 3 },
  easy: { rows: 9, cols: 9, bombs: 10 },
  medium: { rows: 12, cols: 12, bombs: 25 },
  hard: { rows: 20, cols: 20, bombs: 80 },
};

export const enum GameStatus {
  PendingDifficulty = "pendingDifficulty",
  Ongoing = "ongoing",
  FinishedWin = "finishedWin",
  FinishedLose = "finishedLose",
}

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
