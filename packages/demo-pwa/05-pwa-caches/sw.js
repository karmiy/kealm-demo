const CACHE_NAME = 'cache_v1';

/* 缓存内容 */
self.addEventListener('install', async e => {
    // ...
    // console.log('install', e);
    // 开启一个 cache，得到一个 cache 对象
    const cache = await caches.open(CACHE_NAME);
    // cache 对象可以存储的资源
    await cache.addAll([
        '/',
        '/manifest.json',
        '/images/home-screen.png',
        '/index.css',
        // '/api/xxx' // 接口数据
    ]);
    
    await self.skipWaiting();
});

/* 清理缓存 */
self.addEventListener('activate', async e => {
    // console.log('activate', e);

    // 清掉旧资源（试着把上面缓存名修改，刷新页面，可以看到旧的清除了）
    const keys = await caches.keys();
    keys.forEach(key => {
        if (key === CACHE_NAME) return;

        caches.delete(key);
    });
    await self.clients.claim();
});

/* 操作缓存或读取网络资源 */
self.addEventListener('fetch', e => {
    // console.log('fetch', e);

    // 只缓存同源内容
    const req = e.request;
    const url = new URL(req.url);
    if (url.origin !== self.origin) return;


    // 判断资源是否能请求成功，成功正常响应，失败读缓存 caches
    // respondWith 即给浏览器响应
    e.respondWith(req.url.includes('/api') ? networkFirst(req) : cacheFirst(req));
});

/* 缓存优先，一般使用静态资源 */
async function cacheFirst(req) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    if (cached) return cached;

    return await fetch(req);
}

/* 网络优先，一般用于实时数据，如接口 */
async function networkFirst(req) {
    const cache = await caches.open(CACHE_NAME);
    try {
        const fresh = await fetch(req);
        // 不要 fresh.json()，这个是任何请求资源，包括图片什么的，直接响应即可

        // 网络优先的数据要再更新到缓存，如果缓存里都是旧的
        // 不加 clone 的话，cache.put 存了后，return 的 fresh 就用不了了
        cache.put(req, fresh.clone());
        return fresh;
    } catch (error) {
        const cached = await cache.match(req);
        console.log('cached', cached);
        return cached;
    }
}