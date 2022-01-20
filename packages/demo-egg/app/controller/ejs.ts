import { Controller } from 'egg';

export default class EjsController extends Controller {
  public async index() {
    const { ctx } = this;

    await ctx.render('demo-1.html', {
      id: 1,
      name: 'karmiy',
      tags: [
        'tag1',
        'tag2',
        'tag3',
      ],
    });
  }
}
