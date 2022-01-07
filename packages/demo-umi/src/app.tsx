import React from 'react';
import { History, history, IRouteComponentProps, Location, Plugin } from 'umi';
// import { IConfigFromPlugins } from '@@/core/pluginConfig';
import { sleep } from '@/utils/base';

// console.log('entry app');

/**
 * 执行顺序：render => patchRoutes => onRouteChange
 */

/* -------------------- BLOCK: render 可控 -------------------- */
export async function render(oldRender: Function) {
    console.log('render');

    // 场景：做鉴权
    // await sleep();
    // Math.random() > 0.5 && history.push('/login');
    oldRender();
}

/* -------------------- BLOCK: 路由动态控制 -------------------- */
export function patchRoutes({ routes }: { routes: UmiNS.Route }) {
    // 场景：路由是接口返回，在 render 中请求中此处动态添加路由（动态添加的路由不会在默认的 layout 里，即是全屏的而不是作为菜单展示内容）
    // 注：约定式路由就不能这样操作了
    /* routes?.unshift({
        path: '/login',
        exact: true,
        component: require('@/pages/login').default,
    }); */
    console.log('routes', routes);
}

/* -------------------- BLOCK: 路由变化监听 -------------------- */
// 初始也会执行
export function onRouteChange({
    location,
    routes,
    matchedRoutes,
    action,
}: UmiNS.RouteChangeParams) {
    console.log(location, routes, matchedRoutes, action);
}

/* -------------------- BLOCK: 根节点渲染 -------------------- */
const DEFAULT_THEME = { textColor: '#323232' };
const ThemeContext = React.createContext(DEFAULT_THEME);

// 场景：修改交给 react-dom 渲染时的根组件
// 比如用于在外面包一个 Provider
export function rootContainer(
    container: React.ComponentType,
    args: { history: History; plugin: Plugin; routes: UmiNS.Route[] },
) {
    // console.log(container, args);
    const Provider = ({ children, routes }: IRouteComponentProps) => {
        // 需要往下再传 routes，不然如 access 权限在 route 那配的下不去
        const _children = React.cloneElement(children, {
            ...children.props,
            routes,
        });

        return <ThemeContext.Provider value={DEFAULT_THEME}>{_children}</ThemeContext.Provider>;
    };
    return React.createElement(Provider, null, container);
}

/* export const rootContainer2 = (
    container: React.ReactNode,
    ) => {
    const Provider = ({ children, routes }: any) => {
        const newChildren = React.cloneElement(children, {
        ...children.props,
        routes,
        });
        
        return <ApolloProvider client={apolloClient}>{newChildren}</ApolloProvider>;
    };
    
    return React.createElement(Provider, null, container);
}; */

/* -------------------- BLOCK: @umijs/plugin-initial-state -------------------- */
export async function getInitialState() {
    // console.log('getInitialState');
    // 会阻塞页面渲染
    await sleep();
    return {
        userId: 1,
        userName: 'karmiy',
        role: 'admin',
    };
}
