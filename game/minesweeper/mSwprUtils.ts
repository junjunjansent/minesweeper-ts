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

export const exploreMinesweeperBoard = (
  row: number,
  col: number,
  board: MineCell[][]
): MineCell[][] => {
  const rows = board.length;
  const cols = board[0].length;

  let visitedEmptyCells: [number, number][] = [];
  let queuedRevealedEmptyCells: [number, number][] = [[row, col]];

  while (queuedRevealedEmptyCells.length > 0) {
    let i = queuedRevealedEmptyCells[0][0];
    let j = queuedRevealedEmptyCells[0][1];
    visitedEmptyCells.push([i, j]);

    // open centre
    board[i][j].isRevealed = true;

    // if at [row,col] adjacentBomb ===0, open surrounding
    if (board[i][j].adjacentBombs === 0) {
      // loop adjacent cells
      for (const [i_adj, j_adj] of adjacentCells) {
        // defined adjacent cells
        const [i_neighbour, j_neighbour] = [i + i_adj, j + j_adj];
        if (
          i_neighbour >= 0 &&
          i_neighbour < rows &&
          j_neighbour >= 0 &&
          j_neighbour < cols
        ) {
          board[i_neighbour][j_neighbour].isRevealed = true;
          if (
            board[i_neighbour][j_neighbour].adjacentBombs === 0 &&
            !queuedRevealedEmptyCells.some(([x, y]) => {
              return x === i_neighbour && y === j_neighbour;
            }) &&
            !visitedEmptyCells.some(([x, y]) => {
              return x === i_neighbour && y === j_neighbour;
            })
          ) {
            queuedRevealedEmptyCells.push([i_neighbour, j_neighbour]);
          }
        }
      }
    }
    // clear i & j remove, since careful adding done via visitedEmptyCells, no need to use .filter
    queuedRevealedEmptyCells.shift();
  }

  // console.log("utils");
  // console.dir(visitedEmptyCells);

  return board;
};

export const countNotRevealedMineCells = (board: MineCell[][]): number => {
  let result: number = 0;
  const rows = board.length;
  const cols = board[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!board[i][j].isRevealed) {
        result++;
      }
    }
  }
  return result;
};
