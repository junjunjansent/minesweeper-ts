import { MinesweeperModel } from "./mSwprModel";
import { MinesweeperView } from "./mSwprView";
import { GameStatus } from "./mSwprConfig";

export class MinesweeperController {
  private model: MinesweeperModel;
  private view: MinesweeperView;

  constructor(model: MinesweeperModel, view: MinesweeperView) {
    this.model = model;
    this.view = view;
    this.init();

    // bindEventListeners
    this.view.bindResetBtn(this.handleReset);
    this.view.bindRefreshBoardBtn(this.handleRefreshBoard);
    this.view.bindFlagSwitch(this.handleFlagState);
    this.view.bindDifficultyBtns(this.handleDifficultyBtns);
    this.view.bindMinefieldElmt(this.handleMinefieldInputs);
  }

  // ---------- initialisers

  private init = () => {
    this.model.loadDifficulty();
    this.model.setCurrentGameStatus(GameStatus.PendingDifficulty);
    // update Elmts: command
    this.configCommand();
  };

  private initMinefield = (level?: string) => {
    const difficultyLevel = level ?? this.model.getCurrentDifficultyLevel();

    this.model.setCurrentDifficultyLevel(difficultyLevel);

    // create board
    console.dir("Controller " + difficultyLevel);
    console.dir(this.model.getBoard());
    this.model.loadBoard(difficultyLevel);

    // update Elmts: clear and create minefield
    this.view.clearMinefield();
    this.view.hideVisibilityMinefieldElmt();
    this.view.createMinefield(this.model.getBoard());
    this.view.showVisibilityMinefieldElmt();

    // update Elmts: difficulty buttons
    this.view.hideVisibilityBtnSection();
  };

  private configCommand = (): void => {
    switch (this.model.getCurrentGameStatus()) {
      case GameStatus.PendingDifficulty:
        this.view.updateMessageElmt("Click to Begin :)");
        this.view.hideVisibilityCtrlBtns();
        this.view.hideVisibilityStatsPanelElmt();
        this.view.hideVisibilityStatsFlagSwitchElmt();
        this.model.resetTimer();
        this.view.hideVisibilityTimerElmt();
        break;
      case GameStatus.InitialisePlay: {
        const bombQty = this.model.getCurrentBombQty();
        const notRevealedMineCells = this.model.getNotRevealedMineCells();
        const statsProgress = notRevealedMineCells - bombQty;
        const statsFlagged = this.model.getFlaggedMineCells();

        // message texts
        const bombQtyMsg = `${bombQty} 💣s hidden... Good luck!`;
        const statsProgressHTML = `${statsProgress} <span class="fa-regular fa-square"></span> more to go!`;
        const statsFlaggedHTML = `${statsFlagged} <span class="fa-regular fa-flag"></span> used`;

        this.view.updateMessageElmt(bombQtyMsg);
        this.view.showVisibilityCtrlBtns();
        this.view.showVisibilityStatsPanelElmt();
        this.view.showVisibilityStatsFlagSwitchElmt();
        this.view.updateStatsPanel(statsProgressHTML, statsFlaggedHTML);
        this.view.resetTimerElmt();
        this.model.startTimer(this.view.updateTimerElmt);
        break;
      }
      case GameStatus.Ongoing: {
        const bombQty = this.model.getCurrentBombQty();
        const notRevealedMineCells = this.model.getNotRevealedMineCells();
        const statsProgress = notRevealedMineCells - bombQty;
        const statsFlagged = this.model.getFlaggedMineCells();

        // message texts
        const bombQtyMsg = `${bombQty} 💣s hidden... Good luck!`;
        const statsProgressHTML = `${statsProgress} <span class="fa-regular fa-square"></span> more to go!`;
        const statsFlaggedHTML = `${statsFlagged} <span class="fa-regular fa-flag"></span> used`;

        this.view.updateMessageElmt(bombQtyMsg);
        this.view.updateStatsPanel(statsProgressHTML, statsFlaggedHTML);
        break;
      }
      case GameStatus.FinishedWin:
        this.view.updateMessageElmt(`🤩!!You WON!!🤩 `);
        this.view.updateStatsPanel(`Wanna play again?`, "");
        this.view.hideVisibilityStatsFlagSwitchElmt();
        this.model.stopTimer();
        break;
      case GameStatus.FinishedLose:
        this.view.updateMessageElmt(`You Lost! 😔`);
        this.view.updateStatsPanel(`Wanna play again?`, "");
        this.view.hideVisibilityStatsFlagSwitchElmt();
        this.model.stopTimer();
        break;
      default:
        break;
    }

    if (!this.model.getCursorFlagMode()) {
      this.view.uncheckStatsFlagSwitchElmt();
    }
  };

  // ---------- Input Handlers

  private handleReset = (): void => {
    // update Elmts: minefield
    this.view.clearMinefield();
    this.view.hideVisibilityMinefieldElmt();

    // update Elmts: buttons
    this.view.showVisibilityBtnSection();

    // affect Game Status
    this.model.setCurrentGameStatus(GameStatus.PendingDifficulty);

    // update Elmts: command
    this.configCommand();
  };

  private handleRefreshBoard = (): void => {
    this.initMinefield();

    // affect cursor mode
    this.model.loadFalseCursorFlagMode();

    // affect Game Status
    this.model.setCurrentGameStatus(GameStatus.InitialisePlay);

    // update Elmts: command
    this.configCommand();
  };

  private handleFlagState = (): void => {
    this.model.toggleCursorFlagMode();

    //NEED TO REMOVE
    this.view.getFlagSwitchState();
  };

  private handleDifficultyBtns = (event: MouseEvent): void => {
    if (
      !(
        event.target instanceof HTMLElement &&
        event.target.classList.contains("btn-difficulty")
      )
    ) {
      return;
    }

    const difficultyLevel = event.target.dataset.label ?? "";
    this.initMinefield(difficultyLevel);

    // affect cursor mode
    this.model.loadFalseCursorFlagMode();

    // affect Game Status
    this.model.setCurrentGameStatus(GameStatus.InitialisePlay);

    // affect cursor mode
    this.configCommand();
  };

  private handleMinefieldInputs = (event: MouseEvent): void => {
    if (
      !(
        event.target instanceof HTMLElement &&
        event.target.dataset.state === "not-revealed"
      )
    ) {
      return;
    }

    // affect Game Status
    this.model.setCurrentGameStatus(GameStatus.Ongoing);

    // define variable
    const row = parseInt(event.target.dataset.row ?? "-1");
    const col = parseInt(event.target.dataset.col ?? "-1");

    // handle flagmode & early return
    if (this.model.getCursorFlagMode()) {
      this.model.toggleFlagOnMineCell(row, col);
      this.view.updateFlaggedMinefield(this.model.getBoard());
      this.configCommand();
      return;
    }

    // update board state
    this.model.setBoard(row, col); // model: via utils: open all adjacent rows
    this.view.updateMinefield(this.model.getBoard());

    if (this.model.checkLoseCondition(row, col)) {
      this.model.setCurrentGameStatus(GameStatus.FinishedLose);
      // update Elmts: minefield - open and gray out minefield & highlight error
      this.view.openMinefield(this.model.getBoard());
      this.view.greyMinefieldElmt();
      this.view.redMineCellElmt(row, col);
    } else if (this.model.checkWinCondition()) {
      this.model.setCurrentGameStatus(GameStatus.FinishedWin);
      // update Elmts: minefield - open and gray out minefield
      this.view.openMinefield(this.model.getBoard());
      this.view.greyMinefieldElmt();
      this.view.showConfetti();
    } else {
    }

    this.configCommand();
  };
}
