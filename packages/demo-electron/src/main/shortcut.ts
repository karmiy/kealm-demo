import { BrowserWindow, globalShortcut, dialog } from 'electron';

export default class ShortcutBuilder {
  constructor(private _mainWindow: BrowserWindow) {}

  init() {
    this._buildGlobalShortcut();
    this._buildBeforeInputEvent();
  }

  // [Demo] 全局快捷键
  private _buildGlobalShortcut() {
    // CommandOrControl 即 macOS 上使用 Command ，在 Windows/Linux 上使用 Control
    globalShortcut.register('Alt+CommandOrControl+I', () => {
      dialog.showMessageBox(this._mainWindow, {
        message: '[main] You click Alt+CommandOrControl+I',
        type: 'info',
      });
    });
  }

  // [Demo] 页面中的 keydown 和 keyup 事件之前，会发出 before-input-event 事件
  private _buildBeforeInputEvent() {
    this._mainWindow.webContents.on('before-input-event', (event, input) => {
      if (input.control && input.key.toLowerCase() === 'i') {
        event.preventDefault();
        dialog.showMessageBox(this._mainWindow, {
          message: '[main] You click Control+I',
          type: 'info',
        });
      }
    });
  }
}
