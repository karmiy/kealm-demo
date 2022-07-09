import { BrowserWindow, ipcMain } from 'electron';
import { CHANNEL } from '../common/constants';

const INCREMENT = 0.03;
const INTERVAL_DELAY = 100; // ms

export default class ProgressBarBuilder {
  constructor(private _mainWindow: BrowserWindow) {}

  private _curBar = 0;

  private _timer = 0;

  init() {
    this._buildProgressSubscribe();
  }

  private _buildProgressSubscribe() {
    ipcMain.on(CHANNEL.START_PROGRESS, () => {
      this._startProgress();
    });
  }

  private _startProgress() {
    this._clearProgress();
    this._timer = setInterval(() => {
      // update progress bar to next value
      // values between 0 and 1 will show progress,
      // < 1 will delete progress bar
      // > 1 will show indeterminate or stick at 100%

      // increment or reset progress bar
      if (this._curBar < 1) {
        this._curBar += INCREMENT;
        this._curBar = Math.min(this._curBar, 1);
      } else {
        this._clearProgress();
      }
      this._mainWindow.setProgressBar(this._curBar);
    }, INTERVAL_DELAY) as any as number;
  }

  private _clearProgress() {
    clearInterval(this._timer);
    this._curBar = 0;
  }
}
