import { MessagePortMain } from 'electron';
import { Subscribe } from './subscribe';

export class BaseMessageChannel<
  T extends MessagePort | MessagePortMain
> extends Subscribe {
  protected _port?: T;

  postMessage = (message: any) => {
    this._port?.postMessage(message);
  };

  dispose() {
    this._port?.close();
  }
}
