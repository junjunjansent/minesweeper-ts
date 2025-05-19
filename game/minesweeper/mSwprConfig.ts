export const difficulty = {
  baby: { rows: 5, cols: 5, bombs: 3 },
  easy: { rows: 9, cols: 9, bombs: 10 },
  medium: { rows: 12, cols: 12, bombs: 25 },
  hard: { rows: 20, cols: 20, bombs: 80 },
};

// Enums are sets of named constants
// it helps with code readability, prevent invalid cases, easier maintenance & type safety
export const enum GameStatus {
  PendingDifficulty = "pendingDifficulty",
  InitialisePlay = "initialisePlay",
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
