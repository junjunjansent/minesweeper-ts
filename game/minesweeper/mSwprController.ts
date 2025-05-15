import { MinesweeperModel } from "./mSwprModel";
import { MinesweeperView } from "./mSwprView";

class MinesweeperController {
  private model: MinesweeperModel;
  private view: MinesweeperView;

  constructor(model: MinesweeperModel, view: MinesweeperView) {
    this.model = model;
    this.view = view;
    // this.initBoard();

    // bindEventListeners
    this.view.bindReset(this.handleReset);
    this.view.bindDifficultyBtns(this.handleDifficultyBtns);
    this.view.bindMinefieldElmt(this.handleMinefieldInputs);
  }

  // private initBoard() {}

  private handleReset = (): void => {
    console.log("reset clicked");
    this.view.hideVisibilityMinefieldElmt();
    this.view.hideVisibilityNewBoardElmt();
    this.view.showVisibilityBtnSection();
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

    // create board
    console.dir("Controller " + event.target.dataset.label);
    this.model.initBoard(event.target.dataset.label ?? "");
    this.view.hideVisibilityBtnSection();
    this.view.showVisibilityNewBoardElmt();
    this.view.createMinefield(this.model.getBoard());
    this.view.showVisibilityMinefieldElmt();
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

    console.log("has Bomb here?... " + this.model.checkBombStatus(row, col));
    this.model.checkBombStatus(row, col);
    this.model.setBoard(row, col); // model: via utils: open all adjacent rows
    this.view.updateMinefield(this.model.getBoard());

    // if win or lose
    // view: gray out input and update message
    // else if still playing, update message
  };
}

/*----------------------------- Initialise App -----------------------------*/
const msModel = new MinesweeperModel();
const msView = new MinesweeperView();
const msController = new MinesweeperController(msModel, msView);
