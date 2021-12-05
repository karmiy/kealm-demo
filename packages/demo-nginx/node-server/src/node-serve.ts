import Koa from 'koa';

const app = new Koa();

app.use(async ctx => {
    // 返回 HTML
    ctx.body = `
        <h1>HTML</h1>
        <img src='./logo-kealm.png' />
    `;
});

app.listen(3000, () => {
    console.log('3000 service');
});
