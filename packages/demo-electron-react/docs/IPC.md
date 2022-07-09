# IPC

进程间通信 (IPC)

进程使用的通讯模块

-  [`ipcMain`](https://www.electronjs.org/zh/docs/latest/api/ipc-main) ：从主进程到渲染进程的异步通信
- [`ipcRenderer`](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer)：从渲染器进程到主进程的异步通信

## [render => main]ipcRenderer.send + ipcMain.on/once

```ts
// main.ts
const { ipcMain } = require('electron');
// 监听
ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title);
});
```

```ts
// preload.ts
// 暴露 API 到渲染进程全局 window
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
});
```

```ts
// render.ts
const setButton = document.getElementById('btn');
setButton.addEventListener('click', () => {
    window.electronAPI.setTitle('title');
});
```

## [render => main with return]ipcRenderer.invoke + ipcMain.handle

```ts
// main.ts
const { ipcMain } = require('electron');

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (canceled) {
    return;
  } else {
    return filePaths[0];
  }
}
// 监听
ipcMain.handle('dialog:openFile', handleFileOpen);
```

```ts
// preload.ts
// 暴露 API 到渲染进程全局 window
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
});
```

```ts
// render.ts
const btn = document.getElementById('btn');

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile();
})
```

> invoke 与 send 的区别在于，invoke 是有 Promise 返回值的，可以接收 main 进程返回的数据

## [render => main with sync return]ipcRenderer.sendSync

```ts
// main.ts
const { ipcMain } = require('electron');
ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg); // 在 Node 控制台中打印 “ping”
  event.returnValue = 'pong';
});
```

```ts
// preload.ts
const { ipcRenderer } = require('electron')

const result = ipcRenderer.sendSync('synchronous-message', 'ping');
console.log(result); // 在 DevTools 控制台中打印 “pong”
```

> 出于性能原因，建议**避免使用此 API**。 它的同步特性意味着它将阻塞渲染器进程，直到收到回复为止

## [main reply in the listener]event.reply

Electron 7 之前通过 IPC 进行异步双向通信的推荐方式

```ts
// main.ts
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // 在 Node 控制台中打印 “ping”
  // 作用如同 `send`，但返回一个消息
  // 到发送原始消息的渲染器
  event.reply('asynchronous-reply', 'pong');
});
```

```ts
// preload.ts
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { CHANNEL } from '../common/constants';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    on(
      channel: CHANNEL,
      func: (_event: IpcRendererEvent, ...args: unknown[]) => void
    ) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(_event, ...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
  },
});

```

```ts
// render.ts
window.electron.ipcRenderer.on('asynchronous-reply', (e, arg) => {
    console.log(arg);
});
```

缺点：

- 需要额外设置 ipcRenderer.on 在 render 进程监听（invoke 可以立即 Promise 接收）
- 额外监听也导致了消息配对是独立的，不能在 render 进程发送的同时在当前函数作用域获取响应结果，逻辑割裂

## [main reply in the listener]webContents.send

可以通过 webContents.send 替代 event.reply 实现 main => render

```ts
// main.ts
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // 在 Node 控制台中打印 “ping”
  // 可以通过 webContents 实现 main => render（这里 sender 即 webContents 实例）
  event.sender.send(CHANNEL.PING_PONG, 'pong');
});
```

## [render reply in the listener]EventEmitter.send

可以通过 EventEmitter.send 在 render 中反馈给 main

```ts
// main.ts
ipcMain.on('message', (event, arg) => {
  console.log(arg);
});
```

```ts
// render.ts
window.electron.ipcRenderer.on('asynchronous-reply', (event, arg) => {
    event.sender.send('message', 100);
});
```

