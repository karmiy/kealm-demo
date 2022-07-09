import { ipcMain } from 'electron';
import path from 'path';
import { CHANNEL } from '../common/constants';

export default class DragFileBuilder {
  private _iconName = path.join(__dirname, '../assets/iconForDragAndDrop.png');

  init() {
    this._buildDragStart();
  }

  private _buildDragStart() {
    ipcMain.on(CHANNEL.DRAG_START, (event, filePath) => {
      event.sender.startDrag({
        file: path.join(__dirname, '../assets', filePath),
        icon: this._iconName,
      });
    });
  }
}
