import {
  MineCell,
  createMinesweeperBoard,
  exploreMinesweeperBoard,
} from "./mSwprUtils";
import { difficulty } from "./mSwprConfig";
export class MinesweeperModel {
  //   private difficulty: difficulty;
  //   private mineCell: MineCell;
  private board: MineCell[][];
  private gameState: "pendingStart" | "ongoing" | "finished";

  initBoard = (difficultyLevel: string): void => {
    if (!difficulty[difficultyLevel]) {
      console.log("Unknown Difficulty Selected");
      return;
    }
    this.board = createMinesweeperBoard(difficulty[difficultyLevel]);
    this.gameState = "ongoing";
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

  getBoard = (): MineCell[][] => {
    return this.board;
  };

  getGameState = (): string => {
    return this.gameState;
  };
}
