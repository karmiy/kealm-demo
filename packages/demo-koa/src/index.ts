import http from 'http';
import https from 'https';
import path from 'path';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import serve from 'koa-static';
import views from 'koa-views';
import cors from 'koa2-cors';

const app = new Koa();

/* -------------------- 链式调用 -------------------- */
/* app.use(async (ctx, next) => {
    console.log(1);
    next();
}).use((ctx, next) => {
    console.log(2);
    next();
}); */

/* -------------------- logger -------------------- */
/* app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
}); */

/* -------------------- x-response-time -------------------- */
/* app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    // ctx.response.set('X-Response-Time', `${ms}ms`);
    ctx.set('X-Response-Time', `${ms}ms`);
}); */

/* -------------------- 返回 HTML -------------------- */
/* app.use(async ctx => {
    // 返回 HTML
    ctx.body = `<h1>HTML</h1>`;
}); */

/* -------------------- 跨域 -------------------- */
app.use(cors());

/* -------------------- Get 请求 -------------------- */
/* app.use(async ctx => {
    const url = ctx.url;

    // 从 request 接收
    const request = ctx.request;
    const query = request.query;
    const queryString = request.querystring;

    // 也可从 ctx 接收，是 alias 别名
    // const query = ctx.query;
    // const queryString = ctx.querystring;

    // http://192.168.2.243:3000/?id=198&name=karmiy
    // 页面输出：{"url":"/?id=198&name=karmiy","query":{"id":"198","name":"karmiy"},"queryString":"id=198&name=karmiy"}
    ctx.body = {
        url,
        query,
        queryString,
    };
}); */

/* -------------------- Post 请求 -------------------- */
app.use(bodyParser());

/* app.use(async ctx => {
    // bodyParser 中间件会把 data 放到 body
    const data = ctx.request.body;
    console.log('method', ctx.method);
    console.log('data', data);
    ctx.body = data;
}); */

/* -------------------- 子路由 -------------------- */
const patientRouter = new Router();
patientRouter.get('/list', ctx => {
    ctx.body = 'Page Path: /patient/list';
});
patientRouter.get('/detail', ctx => {
    ctx.body = `Page Path: /patient/detail, queryString: ${ctx.querystring}`;
});

/* -------------------- 父路由 -------------------- */
const router = new Router({
    prefix: '/omc',
});
router.use('/patient', patientRouter.routes(), patientRouter.allowedMethods());

// allowedMethods 表示遵循 router 的 method，如 router.get('/')，如果接收的是 post 则抛错
router
    .get('/', ctx => {
        ctx.body = 'Page Path: /';
    })
    .get('/doctor', ctx => {
        ctx.body = 'Page Path: /doctor';
    });

/* -------------------- cookie -------------------- */
router.get('/cookie', ctx => {
    ctx.cookies.set('Auth', 'XDS 7a1x1215484bv', {
        domain: '192.168.2.243',
        path: '/omc/cookie',
        maxAge: 1000 * 60,
        // expires: new Date(), // 貌似已被 maxAge 替代
        httpOnly: true,
        overwrite: false,
    });
    // ctx.cookies.get('Auth');
    ctx.body = 'Page Path: /cookie';
});

/* -------------------- ejs -------------------- */
app.use(views(path.join(__dirname, './views'), { extension: 'ejs' }));

router.get('/ejs', async ctx => {
    await ctx.render('index', { title: `It's ejs` });
});

app.use(router.routes()).use(router.allowedMethods());

/* -------------------- static -------------------- */
// http://192.168.2.243:3000/index.css
app.use(serve(path.join(__dirname, './static')));

app.listen(3000, () => {
    console.log('3000 service');
});
// http.createServer(app.callback()).listen(3000);
// https.createServer(app.callback()).listen(3001);
