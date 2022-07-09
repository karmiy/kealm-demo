import { IpcRendererEvent } from 'electron';
import { CHANNEL } from '../common/constants';
import { RenderMessageChannel } from '../main/renderMessageChannel';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: CHANNEL, ...args: unknown[]): void;
        invokeMessage(channel: CHANNEL, ...args: unknown[]): Promise<any>;
        on(
          channel: string,
          func: (_event: IpcRendererEvent, ...args: unknown[]) => void
        ): (() => void) | undefined;
        once(
          channel: string,
          func: (_event: IpcRendererEvent, ...args: unknown[]) => void
        ): void;
      };
      messageChannel: {
        get(channel: CHANNEL): RenderMessageChannel;
      };
      darkMode: {
        toggle: () => boolean;
        system: () => void;
      };
      dragger: {
        start: (fileName: string) => void;
      };
      notification: {
        show: (options: { title: string; body: string }) => void;
      };
      progressBar: {
        start: () => void;
      };
    };
  }
}

export {};
