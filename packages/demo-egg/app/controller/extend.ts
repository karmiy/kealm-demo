import { Controller } from 'egg';

export default class ExtendController extends Controller {
  public async application() {
    const { ctx, app } = this;
    ctx.body = { currentTime: app.currentTime };
  }

  public async context() {
    const { ctx } = this;
    ctx.body = { params: ctx.getParams(), id: ctx.getParams('id') };
  }

  public async request() {
    const { ctx } = this;
    ctx.body = { status: 200, token: ctx.request.token };
  }

  public async response() {
    const { ctx } = this;
    ctx.response.setToken('XDS 7n9jxxxxx');
    ctx.body = 'success';
  }

  public async helper() {
    const { ctx } = this;
    ctx.body = { name: ctx.helper.base64Encode('karmiy') };
  }
}
