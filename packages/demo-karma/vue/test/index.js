const { join } = require('path');
const { Server } = require('karma');
// 判断是不是single-run
const singleRun = process.argv.includes('single-run') ? true : false;
// 截取components
const components = singleRun ? process.argv.slice(3) : process.argv.slice(2);

const config = {
  configFile: join(__dirname, 'karma.conf.js'),
  components: components.length ? components : 'all',
  singleRun
};
server = new Server(config);
server.start();
