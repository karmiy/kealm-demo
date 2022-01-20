import { Context } from 'egg';

// export default function CounterMiddleware(options: EggAppConfig, app: Application) {
export default function CounterMiddleware() {
//   console.log(options, app);
  return async (ctx: Context, next: () => Promise<any>) => {
    if (ctx.session.counter) {
      ctx.session.counter++;
    } else {
      ctx.session.counter = 1;
    }
    await next();
  };
}
