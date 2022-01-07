import { defineConfig } from 'umi';
import { routes } from './src/route';

export default defineConfig({
  // publicPath: 'cdn...',
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: 'Umi Menus',
    // logo: 'xxx',
  },
  // 如果没配置 routes，会是约定式路由
  // 配置 routes 则为手动定制的路由（连 layouts 约定都失效）
  routes,
  fastRefresh: {},
  mfsu: {},
  sass: {},
  dynamicImport: {},
});
