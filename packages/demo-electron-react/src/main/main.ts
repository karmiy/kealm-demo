/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import bootstrap, { AppUpdater, installExtensions } from './bootstrap';
import MenuBuilder from './menu';
import IPCBuilder from './ipc';
import MessageChannelBuilder from './mainMessageChannel';
import DarkModeBuilder from './darkMode';
import ShortcutBuilder from './shortcut';
import DeepLinksBuilder from './deepLinks';
import DragFileBuilder from './dragFile';
import NotificationBuilder from './notification';
import ProgressBarBuilder from './progressBar';
import { resolveHtmlPath, isDebug, Builder } from './util';

let mainWindow: BrowserWindow | null = null;

const initDemoBuilder = (win: BrowserWindow, builders: Array<Builder>) => {
  builders.forEach((B) => new B(win).init());
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged // 如果应用已经打包，isPackaged 返回true，否则返回false，此属性可用于区分开发和生产环境
    ? path.join(process.resourcesPath, 'assets') // process.resourcesPath 表示 resources 目录的路径
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  // 渲染进程第一次完成绘制时，如果窗口还没有被显示，会触发 ready-to-show
  // 解决视觉闪烁问题
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      // 最小化
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  initDemoBuilder(mainWindow, [
    MenuBuilder,
    IPCBuilder,
    MessageChannelBuilder,
    DarkModeBuilder,
    ShortcutBuilder,
    DeepLinksBuilder,
    DragFileBuilder,
    NotificationBuilder,
    ProgressBarBuilder,
  ]);

  // const messageChannelBuilder = new MessageChannelBuilder(mainWindow);
  // messageChannelBuilder.buildChannelPort();
  // messageChannelBuilder.subscribePortMessage((mes) => {
  //   console.log('[main message] subscribe', mes);
  // });

  // render 进程调用 window.open，link 都是默认会在 electron 中开窗口
  // 这里配置 'deny'，即拒绝，而是用 shell 打开用户浏览器来打开窗口
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // mac 所有窗口关了还会保留进程，点图表还可以打开
  // 其他系统如 windows 关了就是关了
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

if (!app.requestSingleInstanceLock()) {
  // deep links
  // 用户可能在已经打开应用时，又去双开应用，这样会有 2 个实例
  // 如果当前进程是应用程序的主要实例，则此方法返回 true，同时你的应用会继续运行
  // 如果当它返回 false，你的程序没有取得锁，它应该立刻退出，并且将参数发送给那个已经取到锁的进程
  app.quit();
} else {
  bootstrap();

  app
    .whenReady()
    .then(() => {
      createWindow();

      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        // [only macOS]
        // 当 Linux 和 Windows 应用在没有窗口打开时会退出
        // 但 macOS 通常即使在没有打开任何窗口的情况下也继续运行
        // 并且在没有窗口可用的情况下激活应用时会打开新的窗口
        // 首次启动应用，任务栏图标时重新激活它
        if (mainWindow === null) createWindow();
      });
    })
    .catch(console.log);
}
