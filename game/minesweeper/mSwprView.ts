// Notes:
// need to find a way to tie the difficulty details into the front page

export class MinesweeperView {
  private messageElmt: HTMLElement;
  private resetElmt: HTMLElement;
  private btnSection: HTMLElement;

  constructor() {
    const messageElement = document.getElementById("message");
    const resetElement = document.getElementById("reset");
    const btnSection = document.getElementById("btn-section");

    if (!messageElement || !resetElement || !btnSection) {
      throw new Error("Something is missing in DOM.");
    }

    this.messageElmt = messageElement;
    this.resetElmt = resetElement;
    this.btnSection = btnSection;
  }

  // ----------- Binders
  bindReset(controllerHandler: () => void): void {
    this.resetElmt.addEventListener("click", controllerHandler);
  }

  bindDifficultyBtns(controllerHandler: (event: MouseEvent) => void): void {
    this.btnSection.addEventListener("click", (event) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.classList.contains("btn-difficulty")
      ) {
        controllerHandler(event);
      }
    });
  }

  // ----------- Board Builder
  updateBoard = () => {};

  // ----------- Visibility
  hideVisibilityBtnSection = () => {
    this.btnSection.style.display = "none";
  };

  showVisibilityBtnSection = () => {
    this.btnSection.style.display = "flex";
  };
}
