import { Controller } from 'egg';

export default class SessionController extends Controller {
  public async add() {
    const { ctx } = this;

    ctx.session.userName = 'karmiy';

    // console.log(ctx.session.userName);

    ctx.body = {
      status: 200,
      data: '成功',
    };
  }
}
