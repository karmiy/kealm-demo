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

### 如何在 CSS Module 中定义全局样式

```scss
/* example.scss */
.title {
    margin-bottom: 16px;
    font-weight: 600;
}

/* 定义全局样式 */
:global(.text) {
    font-size: 16px;
}

/* 定义多个全局样式 */
:global {
    .footer {
        color: #ccc;
    }
    .slider {
        background: #ebebeb;
    }
}
```

### 如何做动态菜单

可以尝试以下几种方式：

- src/app.tsx 中 patchRoutes 动态添加路由

```ts
export function patchRoutes({ routes }: { routes: UmiNS.Route }) {
    routes?.unshift({
        path: '/login',
        exact: true,
        component: require('@/pages/xxx').default,
    });
}
```

- src/app.tsx 中 layout 配置 menu.request 动态请求并路由


```ts
export const layoutActionRef = createRef<{ reload: () => void }>();

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
    return {
        actionRef: layoutActionRef as any,
        menu: {
            // 每当 initialState?.currentUser?.userId 发生修改时重新执行 request
            params: {
                userId: initialState?.currentUser?.userId,
            },
            // params 对应上面
            // defaultMenuData 即 .umirc.ts 里配置得 routes
            request: async (params, defaultMenuData) => {
                // 动态请求菜单
                const menuData = await fetchMenuData();
                return menuData;
            },
        },
        ...
    };
};

setTimeout(() => {
    // 可手动的控制菜单刷新
    layoutActionRef.current?.reload();
}, 2000);
```

### 如何实现菜单项多处高亮

```ts
export default [
    {
        path: '/product',
        hideInMenu: true,
        name: '产品管理',
    },
    {
        path: '/list/:id',
        hideInMenu: true,
        name: '列表详情',
        parentKeys: ['/product'], // 可以在/list/:id路径的时候，也高亮 /product, parentKeys 中的 key 一般是路径，如果不方便设置为路径的话可以在 菜单配置中增加 key 属性，Layout 会优先使用配置的 Key 属性
    },
];
```

### 怎么定义多环境变量

可以尝试以下几种：

- .umirc 配置文件通过 define 定制

```ts
import { defineConfig } from 'umi';

export default defineConfig({
    define: {
        // 添加这个自定义的环境变量
        "process.env.LW_ENV": process.env.LW_ENV, // * 本地开发环境：dev，测试服：test，正式服：pro
    },
});
```

```ts
// package.json 中 scripts
{
    "scripts": {
        "start": "cross-env LW_ENV=dev umi dev",
    },
}
```

```ts
// 代码中
console.log(process.env.LW_ENV);
```

### 怎么定义多环境的配置文件

[多环境多份配置](https://umijs.org/zh-CN/docs/config#%E5%A4%9A%E7%8E%AF%E5%A2%83%E5%A4%9A%E4%BB%BD%E9%85%8D%E7%BD%AE)