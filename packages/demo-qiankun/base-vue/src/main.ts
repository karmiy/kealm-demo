import { createApp } from "vue";
import { registerMicroApps, start } from "qiankun";
import App from "./App.vue";
import router from "./router";

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

registerMicroApps(apps);
start();

createApp(App).use(router).mount("#root");
