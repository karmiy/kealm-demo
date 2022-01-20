import { Controller } from 'egg';

export default class UserController extends Controller {
  public async getMockUser() {
    const { ctx } = this;

    const id = ctx.query.id ?? ctx.params.id;

    if (!id) {
      ctx.body = {};
      return;
    }

    const user = await ctx.service.user.mockGet(Number(id));
    ctx.body = user ?? {};
  }

  public async addMysqlUser() {
    const { ctx } = this;

    const res = await ctx.service.user.mysqlAdd(ctx.query.name ?? `user-${Date.now().toString().slice(0, 6)}`);

    // res?.affectedRows === 1 && console.log('成功');
    ctx.body = res ?? {};
  }

  public async deleteMysqlUser() {
    const { ctx } = this;

    const { id } = ctx.params;
    const res = await ctx.service.user.mysqlDelete(Number(id));
    ctx.body = res ?? {};
  }

  public async updateMysqlUser() {
    const { ctx } = this;

    const { id, name } = ctx.params;
    const res = await ctx.service.user.mysqlUpdate(Number(id), name);
    ctx.body = res ?? {};
  }

  public async getMysqlUser() {
    const { ctx } = this;

    const user = await ctx.service.user.mysqlGet(Number(ctx.params.id ?? 1));
    ctx.body = user ?? {};
  }
}
