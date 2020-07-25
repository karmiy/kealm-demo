/* 全局声明类型 */

// redux devTools
interface Window {
    __REDUX_DEVTOOLS_EXTENSION__(): any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__(option: object): any;
}

// HMR
interface NodeModule {
    hot: {
        accept(path: string, cb: Function): void;
    };
}