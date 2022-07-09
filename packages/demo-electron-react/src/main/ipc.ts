import { BrowserWindow, ipcMain, IpcMainEvent, dialog } from 'electron';
import { CHANNEL } from '../common/constants';

export default class IPCBuilder {
  constructor(private _mainWindow: BrowserWindow) {}

  init() {
    this._buildPingPongIPC();
    this._buildDialogIPC();
  }

  // [Demo] ipcMain.on / ipcRenderer.send 通讯
  private _buildPingPongIPC() {
    ipcMain.on(CHANNEL.PING_PONG, this._pingPong);
  }

  private _disposePingPongIPC() {
    ipcMain.off(CHANNEL.PING_PONG, this._pingPong);
  }

  // 主进程与 render 进程（src/renderer/index.tsx）通讯
  private _pingPong = (event: IpcMainEvent, arg: string) => {
    console.log('[main ipc] ping_pong', arg);

    // Electron 7 之前双向通讯的推荐方式
    // event.reply(CHANNEL.PING_PONG, 'pong');

    // 也可以通过 webContents 实现 main => render
    event.sender.send(CHANNEL.PING_PONG, 'pong');
  };

  // [Demo] ipcMain.handle / ipcRenderer.send 通讯
  private _buildDialogIPC() {
    ipcMain.handle(CHANNEL.DIALOG, this._handleFileOpen);
  }

  private _handleFileOpen = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(
      this._mainWindow
    );
    if (canceled) return;

    return filePaths[0];
  };
}
