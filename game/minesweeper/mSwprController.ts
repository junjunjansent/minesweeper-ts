import { MinesweeperModel } from "./mSwprModel";
import { MinesweeperView } from "./mSwprView";

class MinesweeperController {
  private model: MinesweeperModel;
  private view: MinesweeperView;

  constructor(model: MinesweeperModel, view: MinesweeperView) {
    this.model = model;
    this.view = view;
    this.init();

    // bindEventListeners
    this.view.bindResetBtn(this.handleReset);
    this.view.bindNewBoardBtn(this.handleNewBoard);
    this.view.bindDifficultyBtns(this.handleDifficultyBtns);
    this.view.bindMinefieldElmt(this.handleMinefieldInputs);
  }

  // ---------- initialisers

  private init = () => {
    this.model.loadDifficulty();
    this.view.updateMessageElmt("Click to Begin :)");
    this.view.updateStatsElmt(``);
  };

  private initMinefield = (level?: string) => {
    const difficultyLevel = level ?? this.model.getCurrentDifficultyLevel();

    this.model.setCurrentDifficultyLevel(difficultyLevel);

    // create board
    console.dir("Controller " + difficultyLevel);
    this.model.loadBoard(difficultyLevel);

    // update Elmts: clear and create minefield
    this.view.clearMinefield();
    this.view.hideVisibilityMinefieldElmt();
    this.view.createMinefield(this.model.getBoard());
    this.view.showVisibilityMinefieldElmt();

    // update Elmts: buttons
    this.view.showVisibilityNewBoardBtnElmt();
    this.view.hideVisibilityBtnSection();

    // update Elmts: message
    const bombQty = this.model.getCurrentBombQty();
    const NotRevealedMineCells = this.model.getNotRevealedMineCells();
    this.view.updateMessageElmt(`${bombQty}💣s hidden... Good luck!`);
    this.view.updateStatsElmt(
      `${
        NotRevealedMineCells - bombQty
      } <span class="fa-regular fa-square"></span> more to go! &nbsp &nbsp  ${0} <span class="fa-regular fa-flag"></span> used`
    );
  };

  // ---------- Input Handlers

  private handleReset = (): void => {
    // update Elmts: minefield
    this.view.clearMinefield();
    this.view.hideVisibilityMinefieldElmt();

    // update Elmts: buttons
    this.view.hideVisibilityNewBoardBtnElmt();
    this.view.showVisibilityBtnSection();

    // update Elmts: texts
    this.view.updateMessageElmt("Click to Begin :)");
    this.view.updateStatsElmt(``);
  };

  private handleNewBoard = (): void => {
    this.initMinefield();
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

    // update game model state
    const row = parseInt(event.target.dataset.row ?? "-1");
    const col = parseInt(event.target.dataset.col ?? "-1");
    this.model.setBoard(row, col); // model: via utils: open all adjacent rows
    this.view.updateMinefield(this.model.getBoard());

    const bombQty = this.model.getCurrentBombQty();
    const NotRevealedMineCells = this.model.getNotRevealedMineCells();

    // update variables for view
    let msg = `${bombQty}💣s hidden... Good luck!`;
    let statsHTML = `${
      NotRevealedMineCells - bombQty
    } <span class="fa-regular fa-square"></span> more to go! &nbsp &nbsp  ${0} <span class="fa-regular fa-flag"></span> used`;

    if (this.model.checkBombStatus(row, col)) {
      // bomb discovered, so LOSE condition

      // update Elmts: minefield - open and gray out minefield & highlight error
      this.view.openMinefield(this.model.getBoard());
      this.view.greyMinefieldElmt();
      this.view.redMineCellElmt(row, col);

      // update Elmts: texts - define
      msg = `You Lost! 😔`;
      statsHTML = `Wanna play again?`;
    } else if (bombQty === NotRevealedMineCells) {
      // so WIN condition

      // update Elmts: minefield - open and gray out minefield
      this.view.openMinefield(this.model.getBoard());
      this.view.greyMinefieldElmt();

      // update Elmts: texts - define
      msg = `🤩!!You WON!!🤩 `;
      statsHTML = `Wanna play again?`;
    }

    // update Elmts: texts
    this.view.updateMessageElmt(msg);
    this.view.updateStatsElmt(statsHTML);
  };
}

/*----------------------------- Initialise App -----------------------------*/
const msModel = new MinesweeperModel();
const msView = new MinesweeperView();
const msController = new MinesweeperController(msModel, msView);
