export class TimerView {
  private element: HTMLElement;

  // Now accepts HTMLElement directly
  constructor(element: HTMLElement) {
    this.element = element;
  }

  update = (sessionSeconds: number): void => {
    const mins = Math.floor(sessionSeconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (sessionSeconds % 60).toString().padStart(2, "0");
    this.element.innerHTML = `<span class="fa-solid fa-clock"> </span>
      <h5>Timer: ${mins}:${secs}</h5>`;
  };

  reset = (): void => {
    this.element.innerHTML = `<span class="fa-solid fa-clock"> </span>
    <h5>Timer: 00:00</h5>`;
  };
}
