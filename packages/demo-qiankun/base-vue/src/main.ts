import { createApp } from "vue";
import { registerMicroApps, start, runAfterFirstMounted, initGlobalState } from "qiankun";
import App from "./App.vue";
import router from "./router";

// 默认情况下，加载了第一个微应用后，也会去预加载其他微应用，即使还没访问
const apps = [
  {
    name: "vueApp",
    entry: "//localhost:10000", // 默认会加载这个 html，解析里面的 js，动态执行，子应用需支持跨域
    container: "#vue",
    activeRule: "/vue",
    props: {
      appName: "vueApp",
    },
  },
  {
    name: "reactApp",
    entry: "//localhost:20000",
    container: "#react",
    activeRule: "/react",
  },
];

registerMicroApps(apps, {
  // 每个子应用只执行一次（如 /vue => /react => /vue 会分别在加载 vue/react 子应用时触发一次，后面的 /vue 不会触发）
  /* beforeLoad: async (app) => {
    console.log('主应用 beforeLoad', app);
  },
  // 每次子应用挂载都会触发
  beforeMount: async (app) => {
    console.log('主应用 beforeMount', app);
  },
  afterMount: async (app) => {
    console.log('主应用 afterMount', app);
  },
  // 每次子应用卸载都会触发
  beforeUnmount: async (app) => {
    console.log('主应用 beforeUnmount', app);
  },
  afterUnmount: async (app) => {
    console.log('主应用 afterUnmount', app);
  }, */
});


// 全局状态
const actions = initGlobalState({
  theme: 'light',
});

actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log('base onGlobalStateChange', state, prev);
});
// actions.setGlobalState(state);
// actions.offGlobalStateChange();

start();

// 第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本。
/* runAfterFirstMounted(() => {
  console.log('第一次微应用 mounted')
}); */


createApp(App).use(router).mount("#root");
