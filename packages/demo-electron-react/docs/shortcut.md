# Shortcut

## 菜单指定快捷键

```ts
const { app, BrowserWindow, Menu, MenuItem } = require('electron');

const menu = new Menu();
menu.append(new MenuItem({
  label: 'Electron',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
    click: () => { console.log('Electron rocks!') },
  }],
}));
```

## 全局快捷键

```ts
const { globalShortcut, dialog } = require('electron');

globalShortcut.register('Alt+CommandOrControl+I', () => {
    dialog.showMessageBox(this._mainWindow, {
        message: '[main] You click Alt+CommandOrControl+I',
        type: 'info',
    });
});
```

## Web 端快捷键

web 端即常规的 keyup, keydown 监听

```ts
const onKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        alert('[web] You click Control+K');
    }
};
window.addEventListener('keydown', onKeydown);
```

## main 进程拦截 keydown/up

页面中的`keydown`和`keyup`事件之前，会发出 [`before-input-event`](https://www.electronjs.org/zh/docs/latest/api/web-contents#event-before-input-event) 事件。 它可以用于捕获和处理在菜单中不可见的自定义快捷方式

```ts
mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
        // 阻止默认，从而不触发 web 的 keydown/up
        event.preventDefault();
        dialog.showMessageBox(this._mainWindow, {
            message: '[main] You click Control+I',
            type: 'info',
        });
    }
});
```

## 第三方库

可以使用 [mousetrap](https://github.com/ccampbell/mousetrap)