import { adjacentCells } from "./mSwprConfig";

// ----------------- General Classes
export class MineCell {
  public adjacentBombs: number;
  public hasBomb: Boolean;
  public isRevealed: Boolean;
  public hasFlag: Boolean;

  constructor(adjacentBombs, hasBomb, isRevealed, hasFlag) {
    this.adjacentBombs = adjacentBombs;
    this.hasBomb = hasBomb;
    this.isRevealed = isRevealed;
    this.hasFlag = hasFlag;
  }
}
// ------------------ Fnuctions (but utilise difficulty and MineCell class)

export const createMinesweeperBoard = ({ rows, cols, bombs }): MineCell[][] => {
  // Initialise board
  // CAUTION note map skips empty cells
  // CAUTION cannot use .fill(array) OR .fill(objects)
  const board = new Array(rows).fill(0);
  for (let i = 0; i < rows; i++) {
    board[i] = new Array(cols)
      .fill(0)
      .map((item) => new MineCell(0, false, false, false));
  }
  //   Cleaner code (that utilise .map and .from, which is safer)
  //   const board = Array.from({ length: rows }, () =>
  //     Array.from({ length: cols }, () => new MineCell(0, false, false, false))
  //   );

  // Fill bombs on board
  let bombsPlaced = 0;
  while (bombsPlaced < bombs) {
    let row_bomb = Math.floor(Math.random() * rows); // cause it is from 0 to rows-1
    let col_bomb = Math.floor(Math.random() * cols);

    if (!board[row_bomb][col_bomb].hasBomb) {
      board[row_bomb][col_bomb].hasBomb = true;
      bombsPlaced++;
    }
  }

  // Update adjacentBombs
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // only updates adjacentBombs if neighbouts if current one has bomb
      if (board[i][j].hasBomb) {
        for (const [i_adj, j_adj] of adjacentCells) {
          const [i_neighbour, j_neighbour] = [i + i_adj, j + j_adj];
          if (
            i_neighbour >= 0 &&
            i_neighbour < rows &&
            j_neighbour >= 0 &&
            j_neighbour < cols
          ) {
            board[i_neighbour][j_neighbour].adjacentBombs++;
          }
        }
      }
    }
  }

  return board;
};
