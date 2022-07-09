import { app, dialog, BrowserWindow } from 'electron';
import path from 'path';

const PROTOCOL = 'react-electron-demo';

export default class DeepLinksBuilder {
  constructor(private _mainWindow: BrowserWindow) {}

  // F:\github\electron-react-boilerplate\node_modules\electron\dist\electron.exe
  // --require
  // true
  init() {
    this._buildDeepLink();
  }

  private _buildDeepLink() {
    if (process.defaultApp) {
      if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, [
          path.resolve(process.argv[1]),
        ]);
      }
    } else {
      app.setAsDefaultProtocolClient(PROTOCOL);
    }

    app.on(
      'second-instance',
      (event, commandLine, workingDirectory, additionalData) => {
        // 输出从第二个实例中接收到的数据
        console.log('[second-instance] additionalData', additionalData);

        // Windows，用户试图运行第二个实例，我们应该关注我们的窗口
        if (this._mainWindow) {
          if (this._mainWindow.isMinimized()) this._mainWindow.restore();
          this._mainWindow.focus();
        }
      }
    );

    app.on('open-url', (event, url) => {
      dialog.showErrorBox('欢迎回来', `导向自: ${url}`);
    });
  }
}
