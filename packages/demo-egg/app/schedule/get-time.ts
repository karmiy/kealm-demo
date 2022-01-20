import { Subscription } from 'egg';

export default class GetTime extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      //   interval: '2s', // 2s 间隔
      //   interval: 3000, // 3s 间隔

      // cron 有 6 个星号，需要更灵活的配置，cron 更合适
      // second (0 - 59, optional)
      // minute (0 - 59)
      // hour (0 - 23)
      // day of month (1 - 31)
      // month (1 - 12)
      // day of week (0 - 7) (0 or 7 is Sun)
      // cron: '0 0 */3 * * *', // 每三小时准点执行一次
      cron: '*/3 * * * * *', // 每 3 秒执行一次

      // type: 'all', // 指定所有的 worker 都需要执行（因为 Egg.js 是多进程，会有需要 worker 进行都在跑这个源码，具体见官网 “多进程模型和进程间通讯” 小节）
      type: 'worker', // 每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    // console.log(Date.now());
  }
}
