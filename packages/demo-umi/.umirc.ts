import { defineConfig } from 'umi';
import { routes } from './config/routes';

export default defineConfig({
  // publicPath: 'cdn...',
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    name: 'Umi Menus', // or title: 'Umi Menus'
    locale: true,
    siderWidth: 208,
    // logo: 'xxx',
    // navTheme: 'light',
    primaryColor: '#1890ff',
    // layout: 'mix',
    // contentWidth: 'Fluid',
    // fixedHeader: false,
    // fixSiderbar: true,
    // colorWeak: false,
    // pwa: false,
    // iconfontUrl: '',
  },
  // 如果没配置 routes，会是约定式路由
  // 配置 routes 则为手动定制的路由（连 layouts 约定都失效）
  routes,
  fastRefresh: {},
  mfsu: {},
  sass: {},
  // dynamicImport: {},
  dynamicImport: {
    // 懒加载时显示的 loading 组件，相当于 React.lazy 加载路由组件时的 fallback
    // 注：因为加载路由页面发生在 app.ts/getInitialState 之后，这意味着 getInitialState sleep 阶段不会有这个 fallback
    loading: '@/components/loading', 
  },
  // webpack5: { lazyCompilation: {} },
  locale: {
    // default zh-CN
    default: 'zh-CN',
  },
  theme: {
    'root-entry-name': 'variable',
  },
});
