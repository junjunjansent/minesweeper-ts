import {
  MineCell,
  createMinesweeperBoard,
  exploreMinesweeperBoard,
  countNotRevealedMineCells,
  countFlaggedMineCells,
} from "./mSwprUtils";
import { difficulty } from "./mSwprConfig";
import { GameStatus } from "../gameConstants";
import { TimerModel } from "../../utils/timerModel";

export class MinesweeperModel {
  //   private mineCell: MineCell;
  private difficulty; // NEED TO BETTER DEFINE
  private currentGameStatus: GameStatus;
  private currentDifficultyLevel: string;
  private cursorFlagMode: Boolean;
  private board: MineCell[][];
  private timer: TimerModel;

  constructor() {
    this.timer = new TimerModel();
  }

  // ---------- Loaders

  // NEED TO BETTER DEFINE
  loadDifficulty = (): void => {
    this.difficulty = difficulty;
  };

  loadFalseCursorFlagMode = (): void => {
    this.cursorFlagMode = false;
  };

  loadBoard = (difficultyLevel: string): void => {
    if (!difficulty[this.currentDifficultyLevel]) {
      console.log("Unknown Difficulty Selected");
      return;
    }

    const difficultyValues = this.difficulty[this.currentDifficultyLevel];
    this.board = createMinesweeperBoard(difficultyValues);
  };

  // ---------- Setters

  setCurrentDifficultyLevel = (difficultyLevel: string): void => {
    this.currentDifficultyLevel = difficultyLevel;
  };

  setBoard = (row: number, col: number): void => {
    exploreMinesweeperBoard(row, col, this.board);
  };

  toggleFlagOnMineCell = (row: number, col: number): void => {
    this.board[row][col].isFlagged = !this.board[row][col].isFlagged;
  };

  toggleCursorFlagMode = (): void => {
    this.cursorFlagMode = !this.cursorFlagMode;
  };

  setCurrentGameStatus = (status: GameStatus): void => {
    this.currentGameStatus = status;
  };

  // ---------- Game Logic

  checkLoseCondition = (row: number, col: number): Boolean => {
    return this.board[row][col].hasBomb;
  };

  checkWinCondition = () => {
    const { bombs } = this.difficulty[this.currentDifficultyLevel];
    return bombs === countNotRevealedMineCells(this.board);
  };

  // ---------- Timer

  startTimer(mSwprViewTimerHandler: (sessionSeconds: number) => void) {
    this.timer.start(mSwprViewTimerHandler);
  }

  stopTimer() {
    this.timer.stop();
  }

  resetTimer() {
    this.timer.reset();
  }

  // ---------- Getters

  getDifficulty = (): unknown => {
    return this.difficulty;
  };

  getCurrentGameStatus = (): string => {
    return this.currentGameStatus;
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

  getFlaggedMineCells = (): number => {
    return countFlaggedMineCells(this.board);
  };

  getCursorFlagMode = (): Boolean => {
    return this.cursorFlagMode;
  };
}
