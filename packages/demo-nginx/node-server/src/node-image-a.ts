import path from 'path';
import Koa from 'koa';
import serve from 'koa-static';

const app = new Koa();
/* -------------------- static -------------------- */
// http://192.168.2.243:3001/logo-kealm.png
app.use(serve(path.join(__dirname, './static')));

app.listen(3001, () => {
    console.log('3001 service');
});
