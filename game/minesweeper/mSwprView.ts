// Notes:
// need to find a way to tie the difficulty details into the front page

import { MineCell } from "./mSwprUtils";

export class MinesweeperView {
  private messageElmt: HTMLElement;
  private statsPanelElmt: HTMLElement;
  private statsProgressElmt: HTMLElement;
  private statsFlaggedElmt: HTMLElement;
  private resetElmt: HTMLButtonElement;
  private refreshBoardElmt: HTMLButtonElement;
  private statsFlagSwitchElmt: HTMLInputElement;
  private btnSection: HTMLElement;
  private minefieldElmt: HTMLElement;

  constructor() {
    const messageElement = document.getElementById("message");
    const statsPanelElmt = document.getElementById("stats");
    const statsProgressElmt = document.getElementById("stats-progress");
    const statsFlaggedElmt = document.getElementById("stats-flagged");
    const resetElement = document.getElementById("reset");
    const refreshBoardElmt = document.getElementById("refresh");
    const statsFlagSwitchElmt = document.getElementById("flag-state");
    const btnSection = document.getElementById("btn-section");
    const minefieldElmt = document.getElementById("minefield");

    if (
      !messageElement ||
      !statsPanelElmt ||
      !statsProgressElmt ||
      !statsFlaggedElmt ||
      !resetElement ||
      !refreshBoardElmt ||
      !statsFlagSwitchElmt ||
      !btnSection ||
      !minefieldElmt
    ) {
      throw new Error("Something is missing in DOM.");
    }

    if (
      !(resetElement instanceof HTMLButtonElement) ||
      !(refreshBoardElmt instanceof HTMLButtonElement)
    ) {
      throw new Error("'Reset' or 'Refresh' is not a button element.");
    }

    if (!(statsFlagSwitchElmt instanceof HTMLInputElement)) {
      throw new Error("flag-state is not an input element.");
    }

    this.messageElmt = messageElement;
    this.statsPanelElmt = statsPanelElmt;
    this.statsProgressElmt = statsProgressElmt;
    this.statsFlaggedElmt = statsFlaggedElmt;
    this.resetElmt = resetElement;
    this.refreshBoardElmt = refreshBoardElmt;
    this.statsFlagSwitchElmt = statsFlagSwitchElmt;
    this.btnSection = btnSection;
    this.minefieldElmt = minefieldElmt;
  }

  // ----------- Binders
  bindResetBtn(controllerHandler: () => void): void {
    this.resetElmt.addEventListener("click", controllerHandler);
  }

  bindRefreshBoardBtn(controllerHandler: () => void): void {
    this.refreshBoardElmt.addEventListener("click", controllerHandler);
  }

  bindFlagSwitch(controllerHandler: () => void): void {
    this.statsFlagSwitchElmt.addEventListener("click", controllerHandler);
  }

  bindDifficultyBtns(controllerHandler: (event: MouseEvent) => void): void {
    this.btnSection.addEventListener("click", controllerHandler);
  }

  bindMinefieldElmt(controllerHandler: (event: MouseEvent) => void): void {
    this.minefieldElmt.addEventListener("click", controllerHandler);
  }

  // NEED to remove
  getFlagSwitchState = () => {
    console.dir(this.statsFlagSwitchElmt.checked);
  };

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
          td.dataset.marker = "";

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

  updateFlaggedMinefield = (board: MineCell[][]): void => {
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

        if (board[i][j].isFlagged) {
          td.dataset.marker = "flagged";
        } else {
          td.dataset.marker = "";
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
  updateStatsPanel(statsProgressHTML: string, statsFlaggedHTML: string): void {
    this.statsProgressElmt.innerHTML = statsProgressHTML;
    this.statsFlaggedElmt.innerHTML = statsFlaggedHTML;
  }

  // ----------- Visibility

  hideVisibilityStatsPanelElmt = (): void => {
    this.statsPanelElmt.style.display = "none";
  };

  showVisibilityStatsPanelElmt = (): void => {
    this.statsPanelElmt.style.display = "flex";
  };
  hideVisibilityStatsFlagSwitchElmt = (): void => {
    const labelEl = this.statsFlagSwitchElmt.labels?.[0]; // because only one label expected
    if (labelEl) {
      labelEl.style.display = "none";
    }
  };
  showVisibilityStatsFlagSwitchElmt = (): void => {
    const labelEl = this.statsFlagSwitchElmt.labels?.[0]; // because only one label expected
    if (labelEl) {
      labelEl.style.display = "block";
    }
  };

  uncheckStatsFlagSwitchElmt = (): void => {
    this.statsFlagSwitchElmt.checked = false;
  };

  hideVisibilityCtrlBtns = (): void => {
    this.refreshBoardElmt.style.display = "none";
    this.resetElmt.style.display = "none";
  };

  showVisibilityCtrlBtns = (): void => {
    this.refreshBoardElmt.style.display = "flex";
    this.resetElmt.style.display = "flex";
  };

  hideVisibilityBtnSection = (): void => {
    this.btnSection.style.display = "none";
  };

  showVisibilityBtnSection = (): void => {
    this.btnSection.style.display = "flex";
  };
}
