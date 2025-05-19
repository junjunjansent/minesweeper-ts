import { MinesweeperModel } from "./game/minesweeper/mSwprModel";
import { MinesweeperView } from "./game/minesweeper/mSwprView";
import { MinesweeperController } from "./game/minesweeper/mSwprController";

/*----------------------------- Minesweeper App -----------------------------*/

const msModel = new MinesweeperModel();
const msView = new MinesweeperView();
const msController = new MinesweeperController(msModel, msView);
