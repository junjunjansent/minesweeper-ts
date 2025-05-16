// Notes:
// need to find a way to tie the difficulty details into the front page

import { MineCell } from "./mSwprUtils";

export class MinesweeperView {
  private messageElmt: HTMLElement;
  private statsElmt: HTMLElement;
  private resetElmt: HTMLElement;
  private newBoardElmt: HTMLElement;
  private btnSection: HTMLElement;
  private minefieldElmt: HTMLElement;

  constructor() {
    const messageElement = document.getElementById("message");
    const statsElmt = document.getElementById("stats");
    const resetElement = document.getElementById("reset");
    const newBoardElmt = document.getElementById("new");
    const btnSection = document.getElementById("btn-section");
    const minefieldElmt = document.getElementById("minefield");

    if (
      !messageElement ||
      !statsElmt ||
      !resetElement ||
      !newBoardElmt ||
      !btnSection ||
      !minefieldElmt
    ) {
      throw new Error("Something is missing in DOM.");
    }

    this.messageElmt = messageElement;
    this.statsElmt = statsElmt;
    this.resetElmt = resetElement;
    this.newBoardElmt = newBoardElmt;
    this.btnSection = btnSection;
    this.minefieldElmt = minefieldElmt;
  }

  // ----------- Binders
  bindResetBtn(controllerHandler: () => void): void {
    this.resetElmt.addEventListener("click", controllerHandler);
  }

  bindNewBoardBtn(controllerHandler: () => void): void {
    this.newBoardElmt.addEventListener("click", controllerHandler);
  }

  bindDifficultyBtns(controllerHandler: (event: MouseEvent) => void): void {
    this.btnSection.addEventListener("click", controllerHandler);
  }

  bindMinefieldElmt(controllerHandler: (event: MouseEvent) => void): void {
    this.minefieldElmt.addEventListener("click", controllerHandler);
  }

  // ----------- Minefield Elements Builder
  createMinefield = (board: MineCell[][]): void => {
    const rows = board.length;
    const cols = board[0].length;

    for (let i = 0; i < rows; i++) {
      const tr = document.createElement("tr");
      this.minefieldElmt.append(tr);
      for (let j = 0; j < cols; j++) {
        const td = document.createElement("td");
        td.dataset.row = i.toString();
        td.dataset.col = j.toString();
        td.dataset.state = "not-revealed";
        // td.dataset.marker = "flagged";
        tr.append(td);
      }
    }
  };

  updateMinefield = (board: MineCell[][]): void => {
    const rows = board.length;
    const cols = board[0].length;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const td = document.querySelector(
          `td[data-row="${i}"][data-col="${j}"]`
        );
        if (!(td instanceof HTMLElement)) {
          continue;
        }

        if (board[i][j].isRevealed) {
          td.dataset.state = "revealed";

          // further updating to revealed cells
          if (board[i][j].hasBomb) {
            td.innerHTML = '<i class="fa-solid fa-bomb"></i>';
          } else if (board[i][j].adjacentBombs > 0) {
            td.textContent = board[i][j].adjacentBombs.toString();
          } else if (board[i][j].adjacentBombs === 0) {
            td.textContent = "";
          }
        }
      }
    }
  };

  clearMinefield = (): void => {
    this.minefieldElmt.innerHTML = "";
  };

  openMinefield = (board: MineCell[][]): void => {
    // direct DOM manipulation, no game state change
    const rows = board.length;
    const cols = board[0].length;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const td = document.querySelector(
          `td[data-row="${i}"][data-col="${j}"]`
        );
        if (!(td instanceof HTMLElement)) {
          continue;
        }

        if (!board[i][j].isRevealed) {
          td.dataset.state = "end-revealed";
        }

        if (board[i][j].hasBomb) {
          td.innerHTML = '<i class="fa-solid fa-bomb"></i>';
        }
      }
    }
  };

  // ----------- Minefield: Style

  redMineCellElmt = (row: number, col: number): void => {
    const td = document.querySelector(
      `td[data-row="${row}"][data-col="${col}"]`
    );
    if (!(td instanceof HTMLElement)) {
      return;
    }

    td.dataset.state = "end-error";
  };

  greyMinefieldElmt = (): void => {
    this.minefieldElmt.style.opacity = "0.7";
  };

  hideVisibilityMinefieldElmt = (): void => {
    this.minefieldElmt.style.display = "none";
  };

  showVisibilityMinefieldElmt = (): void => {
    // do not use display: flex or display:block for table
    this.minefieldElmt.style.display = "table";
    this.minefieldElmt.style.opacity = "1";
  };

  // ----------- update Texts

  updateMessageElmt(msg: string): void {
    this.messageElmt.textContent = msg;
  }
  updateStatsElmt(html: string): void {
    this.statsElmt.innerHTML = html;
  }

  // ----------- Visibility

  hideVisibilityNewBoardBtnElmt = (): void => {
    this.newBoardElmt.style.display = "none";
  };

  showVisibilityNewBoardBtnElmt = (): void => {
    this.newBoardElmt.style.display = "flex";
  };

  hideVisibilityBtnSection = (): void => {
    this.btnSection.style.display = "none";
  };

  showVisibilityBtnSection = (): void => {
    this.btnSection.style.display = "flex";
  };
}
