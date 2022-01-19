/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}


interface Window {
  singleVue: {
    bootstrap: (config: any) => Promise<any>;
    mount: (config: any) => Promise<any>;
    unmount: (config: any) => Promise<any>;
  },
}