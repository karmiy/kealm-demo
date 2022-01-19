import { createApp, App as AppType } from "vue";
import App from "./App.vue";
import router from "./router";

// createApp(App).use(router).mount("#app");

let app: AppType | null = null;

function render(props?: Props) {
  app = createApp(App).use(router);
  app.mount("#app");
}

// 非微前端，独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render();
} else {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

function destroy() {
  app?.unmount();
}

type Props = Record<string, any>;

export async function bootstrap(props?: Props): Promise<void> {
  console.log("micro vue bootstrap", props);
}
export async function mount(props?: Props): Promise<void> {
  render(props);

  // 第二个参数 true 即立即执行
  props?.onGlobalStateChange((state: Record<string, any>, prev: Record<string, any>) => {
    // console.log('micro vue onGlobalStateChange', state, prev);
  }, true);

  /* props?.setGlobalState({
    theme: 'dark',
  }); */
}
export async function unmount(props?: Props): Promise<void> {
  destroy();
}
