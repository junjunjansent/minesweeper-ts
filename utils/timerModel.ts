export class TimerModel {
  private timerStart: number = 0;
  private timerSession: number | null = null;

  start = (viewTimerHandler: (sessionSeconds: number) => void): void => {
    this.stop();
    this.timerStart = Date.now();

    this.timerSession = window.setInterval(() => {
      // because Date stores in milliseconds
      const seconds = Math.floor((Date.now() - this.timerStart) / 1000);
      viewTimerHandler(seconds);
    }, 1000); // only updates once, every 1000milliseconds
  };

  stop = (): void => {
    if (this.timerSession !== null) {
      clearInterval(this.timerSession);
      this.timerSession = null;
    }
  };

  reset = (): void => {
    this.stop();
    this.timerStart = 0;
  };
}
