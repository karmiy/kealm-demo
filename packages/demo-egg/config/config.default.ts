import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1642605165960_475';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // ejs template
  config.view = {
    mapping: {
      '.html': 'ejs', // 所有 .html 都用 ejs 解析
    },
  };

  config.ejs = {};

  config.mysql = {
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 单数据库信息配置
    client: {
    // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'karmiy@123',
      // 数据库名
      database: 'test-egg',
    },
  };

  // session
  config.session = {
    // key: 'KEALM_SESS',
    // httpOnly: false,
    // maxAge: 1000 * 30,
    // renew: true, // 访问页面会重新刷 30s
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
