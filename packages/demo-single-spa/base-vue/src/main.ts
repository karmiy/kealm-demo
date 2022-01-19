import { createApp } from "vue";
import { registerApplication, start } from "single-spa";
import App from "./App.vue";
import router from "./router";

function loadScript(src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

registerApplication(
  "myVueApp",
  async () => {
    // 这里先自己实现加载 script
    // single-spa 更推荐使用 system js
    await loadScript("http://localhost:10000/js/chunk-vendors.js");
    await loadScript("http://localhost:10000/js/app.js");

    // return (window as any).singleVue as any;
    return window.singleVue;
  },
  (location) => location.pathname.startsWith("/vue")
);

start();

createApp(App).use(router).mount("#app");
