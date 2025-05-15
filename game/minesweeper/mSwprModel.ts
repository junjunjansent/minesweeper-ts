import {
  MineCell,
  createMinesweeperBoard,
  exploreMinesweeperBoard,
} from "./mSwprUtils";
import { difficulty } from "./mSwprConfig";

export class MinesweeperModel {
  //   private mineCell: MineCell;
  private difficulty; // NEED TO BETTER DEFINE
  private board: MineCell[][];
  private gameState: "pendingStart" | "ongoing" | "finished";

  loadBoard = (difficultyLevel: string): void => {
    if (!difficulty[difficultyLevel]) {
      console.log("Unknown Difficulty Selected");
      return;
    }
    this.difficulty = difficulty;
    this.board = [[]];
    this.board = createMinesweeperBoard(this.difficulty[difficultyLevel]);
    this.gameState = "ongoing";

    console.log("Model");
    console.dir(this.board);
  };

  setBoard = (row: number, col: number) => {
    exploreMinesweeperBoard(row, col, this.board);
  };

  setGameState = (status: "pendingStart" | "ongoing" | "finished"): void => {
    this.gameState = status;
  };

  checkBombStatus = (row: number, col: number): Boolean => {
    return this.board[row][col].hasBomb;
  };

  // NEED TO BETTER DEFINE
  getDifficulty = (): unknown => {
    return this.difficulty;
  };

  getBoard = (): MineCell[][] => {
    return this.board;
  };

  getGameState = (): string => {
    return this.gameState;
  };
}
