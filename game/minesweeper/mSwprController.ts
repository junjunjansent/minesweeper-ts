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
  }

  // private initBoard() {}

  private handleReset = (): void => {
    console.log("reset clicked");
  };
  private handleDifficultyBtns = (event: MouseEvent): void => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    // create board
    console.dir(event.target.dataset.label);
    this.model.initBoard(event.target.dataset.label ?? "");
    this.view.hideVisibilityBtnSection();
  };
}

/*----------------------------- Initialise App -----------------------------*/
const msModel = new MinesweeperModel();
const msView = new MinesweeperView();
const msController = new MinesweeperController(msModel, msView);
