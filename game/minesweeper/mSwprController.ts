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
    this.view.showVisibilityNewBoardBtnElmt(`New '${difficultyLevel}' Board`);
    this.view.hideVisibilityBtnSection();

    // update Elmts: message
    const bombQty = this.model.getDifficulty()[difficultyLevel].bombs;
    this.view.updateMessageElmt(`${bombQty} bombs to be found... Good luck!`);
  };

  // ---------- Input Handlers

  private handleReset = (): void => {
    console.log("reset clicked");

    // update Elmts: minefield
    this.view.clearMinefield();
    this.view.hideVisibilityMinefieldElmt();

    // update Elmts: buttons and message
    this.view.hideVisibilityNewBoardBtnElmt();
    this.view.showVisibilityBtnSection();
    this.view.updateMessageElmt("Click to Begin :)");
  };

  private handleNewBoard = (): void => {
    console.log("new board clicked");
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
    const row = parseInt(event.target.dataset.row ?? "-1");
    const col = parseInt(event.target.dataset.col ?? "-1");

    console.log(
      "controller: has Bomb here?... " + this.model.checkBombStatus(row, col)
    );
    this.model.setBoard(row, col); // model: via utils: open all adjacent rows
    this.view.updateMinefield(this.model.getBoard());

    if (this.model.checkBombStatus(row, col)) {
      // bomb discovered, so LOSE condition

      // update Elmts: minefield - open and gray out minefield & highlight error
      this.view.openMinefield(this.model.getBoard());
      this.view.greyMinefieldElmt();
      this.view.redMineCellElmt(row, col);

      // update Elmts: message
      const msg = `You Lost! 😔 Wanna play again?`;
      this.view.updateMessageElmt(msg);
    } else if (this.model.checkWinCondition()) {
      // bomb discovered, so WIN condition

      // update Elmts: minefield - open and gray out minefield
      this.view.openMinefield(this.model.getBoard());
      this.view.greyMinefieldElmt();

      // update Elmts: message
      const msg = `🤩!!You WON!!🤩 Wanna play again?`;
      this.view.updateMessageElmt(msg);
    }
    // if win or lose
    // view: gray out input and update message
    // else if still playing, update message
  };
}

/*----------------------------- Initialise App -----------------------------*/
const msModel = new MinesweeperModel();
const msView = new MinesweeperView();
const msController = new MinesweeperController(msModel, msView);
