import {
  MineCell,
  createMinesweeperBoard,
  exploreMinesweeperBoard,
  countNotRevealedMineCells,
} from "./mSwprUtils";
import { difficulty } from "./mSwprConfig";

export class MinesweeperModel {
  //   private mineCell: MineCell;
  private difficulty; // NEED TO BETTER DEFINE
  private board: MineCell[][];
  private currentDifficultyLevel: string;
  private gameState: "pendingStart" | "ongoing" | "finished";

  // ---------- Loaders

  // NEED TO BETTER DEFINE
  loadDifficulty = (): void => {
    this.difficulty = difficulty;
  };

  // NEED to look at if can replace difficultyLevel with currentDifficulty Level
  loadBoard = (difficultyLevel: string): void => {
    if (!difficulty[this.currentDifficultyLevel]) {
      console.log("Unknown Difficulty Selected");
      return;
    }

    const difficultyValues = this.difficulty[this.currentDifficultyLevel];
    this.board = createMinesweeperBoard(difficultyValues);
    this.gameState = "ongoing";

    console.log("Model");
    console.dir(this.board);
  };

  // ---------- Setters

  setCurrentDifficultyLevel = (difficultyLevel: string): void => {
    this.currentDifficultyLevel = difficultyLevel;
  };

  setBoard = (row: number, col: number): void => {
    exploreMinesweeperBoard(row, col, this.board);
  };

  setGameState = (status: "pendingStart" | "ongoing" | "finished"): void => {
    this.gameState = status;
  };

  // ---------- Game Logic

  checkBombStatus = (row: number, col: number): Boolean => {
    return this.board[row][col].hasBomb;
  };

  // ---------- Getters

  getDifficulty = (): unknown => {
    return this.difficulty;
  };

  getCurrentDifficultyLevel = (): string => {
    return this.currentDifficultyLevel;
  };

  getCurrentBombQty = (): number => {
    const { bombs } = this.difficulty[this.currentDifficultyLevel];
    return bombs;
  };

  getBoard = (): MineCell[][] => {
    return this.board;
  };

  getNotRevealedMineCells = (): number => {
    return countNotRevealedMineCells(this.board);
  };

  getGameState = (): string => {
    return this.gameState;
  };
}
