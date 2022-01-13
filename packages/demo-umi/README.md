# umi project

## 开始

```bash
$ npm install
```

```bash
$ npm run start
```

## FAQ

### 如何配置 loading

umi 的 loading 分为几个部分：

- js 加载前：js 还没加载成功，但是 html 已经加载成功的 landing 页面，通常在 src/pages/document.ejs 的 `<div id="root">` 内做初始 loading 节点

- js 加载后：路由懒加载，每次路由切换的时候都希望进入一个加载页面，可以在配置文件的 dynamicImport 配置 loading

```js
dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
}
```

- 业务中 loading：getInitialState 有时由于鉴权，需要一点加载时间，这段期间的白屏可以在 src/app.ts 中 initialStateConfig 配置

```js
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
    loading: <PageLoading />,
};
```

### 如何配置 layout

可配置：

- 配置文件 .umirc 配置 layout: {}

- src/app.ts 里配置 export const layout 

配置参考：

- [pro-layout](https://procomponents.ant.design/components/layout)

- [layout 插件](https://umijs.org/zh-CN/plugins/plugin-layout)

建议先在 [Pro 站点](https://preview.pro.ant.design/dashboard/analysis/?primaryColor=daybreak) 右侧的抽屉完成所需布局风格再拷贝配置

### 如何配置菜单

菜单与 route 配置挂钩，可以在 route 中进行 menu 相关配置来决定当前路由是否渲染在菜单中或有什么表现，[参考配置](https://umijs.org/zh-CN/plugins/plugin-layout#%E6%89%A9%E5%B1%95%E7%9A%84%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE)

```js
// config/routes.ts
export default [
    {
        path: '/overview',
        component: 'overview/index',
        menu: {
            name: 'overview',
            icon: 'testicon',
            flatMenu: false,
            hideInMenu: false,
            hideChildrenInMenu: false,
        },
    },
];
```

### 如何在路由页面嵌套布局 layout

有时可能希望每个路由页面外面多包一层通用 UI，或处理通用逻辑

这时可选方案有：

- 在 src/app.tsx 中的

```tsx
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
    return {
        childrenRender: (children, props) => {
            return (
                <>
                    {children}
                    {/* 可以在这补充通用 UI */}
                </>
            );
        },
    };
};
```

- 在需要的 route 配置 wrapper

```ts
export const routes = [
    {
        path: '/a',
        component: '@/pages/a',
        wrappers: ['@/wrappers/auth'],
    },
];
```

- 将 routes.ts 调整为

```ts
export const routes = [
    {
        path: '/',
        component: '@/layout/index',
        routes: [
            {
                path: '/a',
                component: '@/pages/a',
                wrappers: ['@/wrappers/auth'],
            },
            ...
        ],
    },
];
```