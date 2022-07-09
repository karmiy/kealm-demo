import { app, Notification, ipcMain } from 'electron';
import path from 'path';
import { CHANNEL } from '../common/constants';

export default class NotificationBuilder {
  init() {
    this._buildNotificationListener();
  }

  private _buildNotificationListener() {
    if (process.platform === 'win32') {
      // windows 配置应用名为 app.name => 'Electron'
      app.setAppUserModelId(app.name);
    }

    ipcMain.on(
      CHANNEL.NOTIFICATION,
      (e, options: { title: string; body: string }) => {
        const { title, body } = options;
        new Notification({
          icon: path.join(__dirname, '..', 'assets', 'notification-icon.png'),
          title,
          body,
        }).show();
      }
    );
  }
}
