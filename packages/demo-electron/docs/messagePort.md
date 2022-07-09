# MessagePort

[IPC](./IPC.md) 只能单向通讯，或在同一时刻 reply 双向通讯（例如 invoke + handle）

而不是做到任意时刻的双向通讯

[`MessagePort`](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort) 是一个允许在不同上下文之间传递消息的Web功能。 就像 `window.postMessage`, 但是在不同的通道上

可以在 electron 中使用 MessagePort 来达到双向通讯

## 注册在 preload

值得注意的是，由于 contextBridge 暴露的对象[不包含 prototype 原型](./preload.md)，这导致 transfer 时 port 的方法可能会丢失

我们需要将 MessageChannel 在 render 端的逻辑放置在 preload 中，再通过 contextBridge 暴露，而不是直接在 render 代码

## Render MessageChannel

```ts
// preload.ts
const channel = new MessageChannel();
const { port1, port2 } = channel;
// render 端
port1.addEventListener('message', (_e) => {
    console.log('[render message channel] get message1', _e.data);
});
// port1/2 都需要 start 裁可以接收消息
port1.start();
// 通过 postMessage 传送给 main 进程
ipcRenderer.postMessage('message-channel-test', null, [port2]);

export function postMessage(message: string) {
    // port1 通过 postMessage 传输消息给 port2
	port1.postMessage(message);
}
```

```ts
// main.ts
ipcMain.on('message-channel-test', (e) => {
    // 获取 render 传送过来的 port2
    const [port] = e.ports;
    port.addListener('message', (_e) => {
      	console.log('[main message channel] get message', _e.data);
      	port.postMessage('response message');
    });
    port.start();
});
```

## Main MessageChannel

也可以在 main 进程创建 MessageChannel

electron 提供了 MessageChannelMain 类

见 [官方实例](https://www.electronjs.org/zh/docs/latest/tutorial/message-ports#worker%E8%BF%9B%E7%A8%8B)
