
self.addEventListener('install', e => {
    // ...
    console.log('install', e);

    // 让 service worker 跳过等待，直接进入 activate 状态
    // self.skipWaiting();

    // 但因为 skipWaiting 返回 Promise，会导致在 install 结束前 activate 就触发了
    // 可以利用 waitUntil 解决
    // e.waitUntil 接收 promise，会在 promise 结束后才会完成当前生命周期函数
    // 如下就等 skipWaiting 结束，才进入 activate
    e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', e => {
    console.log('activate', e);

    // service worker 注册后，页面在下次加载前（刷新）不会使用它，即这次注册成功后，不会立即管理我们页面，需要下次刷新才生效
    // claim 表示 service worker 激活后立即获取控制权
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
    console.log('fetch', e);
});