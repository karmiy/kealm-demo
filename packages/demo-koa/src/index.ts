import http from 'http';
import https from 'https';
import Koa from 'koa';
const app = new Koa();

// 链式调用
app.use(async (ctx, next) => {
    console.log(1);
    next();
}).use((ctx, next) => {
    console.log(2);
    next();
});

// logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    // ctx.response.set('X-Response-Time', `${ms}ms`);
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async ctx => {
    ctx.body = 'Hello World...';
});

app.listen(3000);
// http.createServer(app.callback()).listen(3000);
// https.createServer(app.callback()).listen(3001);
