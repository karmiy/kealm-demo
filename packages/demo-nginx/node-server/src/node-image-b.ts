import fs from 'fs';
import path from 'path';
import Koa from 'koa';

const app = new Koa();
/* -------------------- static -------------------- */
// http://192.168.2.243:3002/logo-kealm.png
// app.use(serve(path.join(__dirname, './static')));
app.use(async ctx => {
    const data = fs.readFileSync(path.join(__dirname, 'static/alipay.png'));
    // 返回 HTML
    ctx.set('content-type', 'image/png');
    ctx.body = data;
});

app.listen(3002, () => {
    console.log('3002 service');
});
