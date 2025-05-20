// Enums are sets of named constants
// it helps with code readability, prevent invalid cases, easier maintenance & type safety
export const enum GameStatus {
  PendingDifficulty = "pendingDifficulty",
  InitialisePlay = "initialisePlay",
  Ongoing = "ongoing",
  FinishedWin = "finishedWin",
  FinishedLose = "finishedLose",
}
