# WebContents

负责渲染并控制网页，是 BrowserWindow 对象的属性

可从主进程用 win 的 [`webContent`](https://www.electronjs.org/zh/docs/latest/api/web-contents) 对象与网页内容进行交互

```ts
const { BrowserWindow } = require('electron');

const win = new BrowserWindow({ width: 800, height: 1500 });
win.loadURL('https://github.com');

const contents = win.webContents;
console.log(contents);
```

## WebContents 获取 BrowserWindow 实例

```ts
const webContents = event.sender;
const win = BrowserWindow.fromWebContents(webContents);
```
