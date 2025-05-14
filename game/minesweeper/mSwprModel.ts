import { MineCell, createMinesweeperBoard } from "./mSwprUtils";
import { difficulty } from "./mSwprConfig";
export class MinesweeperModel {
  //   private difficulty: difficulty;
  private mineCell: MineCell;
  private board: MineCell[][];
  // setBoard:

  initBoard = (difficultyLevel: string): void => {
    if (!difficulty[difficultyLevel]) {
      console.log("Unknown Difficulty Selected");
      return;
    }
    this.board = createMinesweeperBoard(difficulty[difficultyLevel]);
    console.dir(this.board);
  };
}
