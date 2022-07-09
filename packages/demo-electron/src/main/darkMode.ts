import { ipcMain, nativeTheme } from 'electron';
import { CHANNEL } from '../common/constants';

export default class DarkModeBuilder {
  init() {
    this._buildDarkModeToggle();
    this._buildDarkModeSystem();
  }

  // [Demo] dark mode toggle
  private _buildDarkModeToggle() {
    ipcMain.handle(CHANNEL.DARK_MODE_TOGGLE, () => {
      if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light';
      } else {
        nativeTheme.themeSource = 'dark';
      }
      return nativeTheme.shouldUseDarkColors;
    });
  }

  // [Demo] dark mode system
  private _buildDarkModeSystem() {
    ipcMain.handle(CHANNEL.DARK_MODE_SYSTEM, () => {
      nativeTheme.themeSource = 'system';
    });
  }
}
