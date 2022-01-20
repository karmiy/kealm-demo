import { Controller } from 'egg';

export default class CookieController extends Controller {
  public async add() {
    const { ctx } = this;

    ctx.cookies.set('user', 'XDS 7n9jxxxxx', {
      // maxAge: 1000 * 2, // 2s 时效
      // httpOnly: false, // true 即通过 js 脚本无法读取 cookie 信息，只允许在服务端操作，在浏览器控制台打印 document.cookie 会发现没有。设为 false 的话才可以访问到
      // encrypt: true, // 加密，否则 cookies.set 无法设置 value 是中文，不过拿的时候需要
    });

    // ctx.cookies.set('user', null);

    /* console.log(ctx.cookies.get('user', {
      encrypt: true, // 如果 set 设置了 encrypt，get 的时候也需要设置
    })); */

    ctx.body = {
      status: 200,
      data: '成功',
    };
  }
}
