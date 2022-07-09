import { ipcRenderer } from 'electron';
import { CHANNEL } from '../common/constants';
import { BaseMessageChannel } from '../common/messageChannel';

export class RenderMessageChannel extends BaseMessageChannel<MessagePort> {
  constructor(public name: CHANNEL) {
    super();
    this._init();
  }

  private _init = () => {
    const channel = new MessageChannel();
    const { port1, port2 } = channel;
    this._port = port1;
    this._port.addEventListener('message', (_e) => {
      this._subscribes.forEach((item) => item(_e.data));
    });
    // port1/2 都需要 start 裁可以接收消息
    this._port.start();
    ipcRenderer.postMessage(this.name, null, [port2]);
  };
}

export class RenderMessageChannelManager {
  private static _channels: RenderMessageChannel[] = [];

  private static _createChannel(name: CHANNEL) {
    const channel = new RenderMessageChannel(name);
    RenderMessageChannelManager._channels.push(channel);
    return channel;
  }

  static get(name: CHANNEL) {
    return (
      RenderMessageChannelManager._channels.find(
        (item) => item.name === name
      ) || RenderMessageChannelManager._createChannel(name)
    );
  }
}
