import { ipcMain, MessagePortMain } from 'electron';
import { CHANNEL } from '../common/constants';
import { BaseMessageChannel } from '../common/messageChannel';

class MainMessageChannel extends BaseMessageChannel<MessagePortMain> {
  constructor(public name: CHANNEL) {
    super();
    ipcMain.on(name, (e) => {
      this.dispose();
      const [port] = e.ports;
      this._init(port);
    });
  }

  private _init(port: MessagePortMain) {
    this._port = port;
    this._port.addListener('message', (_e) => {
      this._subscribes.forEach((item) => item(_e.data));
    });
    this._port.start();
  }
}

export class MainMessageChannelManager {
  private static _channels: MainMessageChannel[] = [];

  private static _createChannel(name: CHANNEL) {
    return new MainMessageChannel(name);
  }

  static get(name: CHANNEL) {
    return (
      MainMessageChannelManager._channels.find((item) => item.name === name) ||
      MainMessageChannelManager._createChannel(name)
    );
  }

  static dispose() {
    MainMessageChannelManager._channels.forEach((item) => item.dispose());
    this._channels = [];
  }
}

export default class MessageChannelBuilder {
  init() {
    const mainMessageChannel = MainMessageChannelManager.get(
      CHANNEL.MESSAGE_CHANNEL_1
    );
    mainMessageChannel.on((mes) => {
      console.log('[main message channel] get message', mes);
      mainMessageChannel.postMessage('response message');
    });
  }
}
