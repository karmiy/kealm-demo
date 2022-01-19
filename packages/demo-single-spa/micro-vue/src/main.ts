import Vue, { createApp, DefineComponent, h } from "vue";
import singleSpaVue, { SingleSpaVueLifecycles } from "single-spa-vue";
import App from "./App.vue";
import router from "./router";

// createApp(App).use(router).mount("#app");

let vueLifeCycle: SingleSpaVueLifecycles | null = null;

// 若作为子应用
if (window.singleSpaNavigate) {
  // 更改请求路由文件的 publicPath，不然会那父应用的 8080 地址
  __webpack_public_path__ = "http://localhost:10000/";

  vueLifeCycle = singleSpaVue({
    createApp: (options) => {
      return createApp({
        ...options,
      }).use(router);
    },
    //   Vue,
    appOptions: {
      el: "#vue",
      render() {
        return h(App);
      },
    },
  });
} else {
  createApp(App).use(router).mount("#app");
}

export const { bootstrap, mount, unmount } = vueLifeCycle ?? {};
