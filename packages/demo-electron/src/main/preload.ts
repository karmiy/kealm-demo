import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { CHANNEL } from '../common/constants';
import { RenderMessageChannelManager } from './renderMessageChannel';

// const renderMessageChannel = new RenderMessageChannel();

// 暴露到 render 进程的 APIS
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: CHANNEL, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    invokeMessage(channel: CHANNEL, args: unknown[]) {
      return ipcRenderer.invoke(channel, args);
    },
    on(
      channel: CHANNEL,
      func: (_event: IpcRendererEvent, ...args: unknown[]) => void
    ) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(_event, ...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.off(channel, subscription);
    },
    once(
      channel: CHANNEL,
      func: (_event: IpcRendererEvent, ...args: unknown[]) => void
    ) {
      ipcRenderer.once(channel, (_event, ...args) => {
        func(_event, ...args);
      });
    },
  },
  messageChannel: {
    get(channel: CHANNEL) {
      return RenderMessageChannelManager.get(channel);
    },
  },
  darkMode: {
    toggle: () => ipcRenderer.invoke(CHANNEL.DARK_MODE_TOGGLE),
    system: () => ipcRenderer.invoke(CHANNEL.DARK_MODE_SYSTEM),
  },
  dragger: {
    start: (fileName: string) => {
      ipcRenderer.send(CHANNEL.DRAG_START, fileName);
    },
  },
  notification: {
    show: (options: { title: string; body: string }) =>
      ipcRenderer.send(CHANNEL.NOTIFICATION, options),
  },
  progressBar: {
    start: () => ipcRenderer.send(CHANNEL.START_PROGRESS),
  },
});
