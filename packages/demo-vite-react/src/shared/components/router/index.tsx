import React, { useCallback, useMemo, useRef } from 'react';
import { BrowserRouter, BrowserRouterProps, HashRouter, HashRouterProps } from 'react-router-dom';
import { Action, History, Location, LocationListener } from 'history';
import { useDidMount, useUpdate } from '@shared/hooks';
import { useLiveRef } from '@shared/hooks';
import { isEmpty } from '@shared/utils/base';
import { Meta, Route, RouteConfig, RouterType, State, To } from './types';
import { createRouteRegExp, HOOK_STATUS } from './utils';

// const MAGIC_PATH = '/----';

/* WARN: 务必去除 React.StrictMode 严格模式，会导致多重 render 等问题，导致该组件失效 */
const Router: RouterType = props => {
    const {
        routes,
        routerType = 'hash',
        routerProps,
        beforeEach,
        beforeLeaveEach,
        afterEach,
        children,
    } = props;

    /* ---------- store ---------- */
    // history
    const historyRef = useRef<History>();
    // 当前 location
    // const currentLocationRef = useRef<Location>();
    // 当前 route
    const currentRouteRef = useRef<Route>();
    // 是否为重定向
    const isRedirectRef = useRef(false);
    // 是否在 push, replace 等函数执行中校验完毕
    const isHandleCheckedRef = useRef(false);
    // <Router> 传递给 history 的 locationListener
    const locationListenerRef = useRef<LocationListener>();
    // 页面初始进入时的 location
    // const originLocationRef = useRef<Location>();
    // 存储钩子，保证引用
    const hookStoreRef = useLiveRef({
        beforeEach,
        beforeLeaveEach,
        afterEach,
    });
    // 手动刷新
    const forceUpdate = useUpdate();

    // 路径字典
    const pathRecordsRef = useRef(new Map<RegExp, RouteConfig>());

    /* 创建路径字典 */
    useMemo(() => {
        pathRecordsRef.current.clear();
        createRouteRegExp(routes, (pathRegExp, route) => {
            pathRecordsRef.current.set(pathRegExp, route);
        });
    }, [routes]);

    /* ---------- event ---------- */
    /* 获取匹配的路由 */
    const getMatchRoute = useCallback((location: Location | string) => {
        const pathRecords = pathRecordsRef.current;
        const matchPaths = [...pathRecords.keys()].filter(pathRegExp => {
            return pathRegExp.test(typeof location === 'string' ? location : location.pathname);
        });
        const meta = matchPaths.reduce((prev: Meta | null, cur) => {
            const route = pathRecords.get(cur);
            if (!route || !route.meta) {
                return prev;
            }
            return isEmpty(prev) ? { ...route.meta } : { ...prev, ...route.meta };
        }, null);

        // 取最后一项
        const matchPath = matchPaths.pop();
        if (!matchPath) return;

        const matchRoute = pathRecords.get(matchPath);
        if (!matchRoute) return;

        return (meta ? { ...matchRoute, meta } : matchRoute) as RouteConfig;
    }, []);

    /* 创建 next 函数 */
    const createNext = useCallback(
        (resolve: (value?: any) => void, reject: (value?: any) => void) => {
            return (path?: string | false) => {
                const history = historyRef.current;
                if (!history || path === false) return;
                if (path) {
                    isRedirectRef.current = true;
                    // console.warn(path);
                    history.push(path);
                    reject(HOOK_STATUS.redirect);
                    return;
                }
                resolve();
            };
        },
        [],
    );

    /* 创建 Route 对象 */
    const createRoute = useCallback(
        (location: Location | string) => {
            const routeConfig = getMatchRoute(location);
            if (!routeConfig) return;

            return {
                ...routeConfig,
                url: typeof location === 'string' ? location : location.pathname,
            } as Route;
        },
        [getMatchRoute],
    );

    /* 局部守卫 - beforeLeave */
    const beforeLeaveHook = useCallback(
        (toRoute?: Route) => {
            // 重定向，已校验的不走 beforeLeave
            if (isRedirectRef.current || isHandleCheckedRef.current) {
                return;
            }
            const history = historyRef.current;
            if (!history) return;

            const fromRoute = currentRouteRef.current;

            if (!fromRoute) return;
            const { beforeLeave } = fromRoute;
            if (!beforeLeave) return;

            return new Promise<string | undefined>((resolve, reject) => {
                beforeLeave(toRoute ?? null, fromRoute, createNext(resolve, reject));
            });
        },
        [createNext],
    );

    /* 局部守卫 - beforeEnter */
    const beforeEnterHook = useCallback(
        (toRoute?: Route) => {
            // 已校验的不走 beforeLeave
            if (isHandleCheckedRef.current) {
                return;
            }
            const history = historyRef.current;
            if (!history || !toRoute) return;

            const fromRoute = currentRouteRef.current;
            const { beforeEnter } = toRoute;
            if (!beforeEnter) return;

            return new Promise((resolve, reject) => {
                beforeEnter(toRoute, fromRoute ?? null, createNext(resolve, reject));
            });
        },
        [createNext],
    );

    /* 局部守卫 - beforeLeaveEach */
    const beforeLeaveEachHook = useCallback(
        (toRoute?: Route) => {
            // 重定向，已校验的不走 beforeLeave
            if (isRedirectRef.current || isHandleCheckedRef.current) {
                return;
            }
            const history = historyRef.current;
            const { beforeLeaveEach: _beforeLeaveEach } = hookStoreRef.current ?? {};
            if (!history || !_beforeLeaveEach) return;

            const fromRoute = currentRouteRef.current;

            if (!fromRoute) return;

            return new Promise<string | undefined>((resolve, reject) => {
                _beforeLeaveEach(toRoute ?? null, fromRoute, createNext(resolve, reject));
            });
        },
        [createNext, hookStoreRef],
    );

    /* 全局守卫 - beforeEach */
    const beforeEachHook = useCallback(
        (toRoute?: Route) => {
            // 已校验的不走 beforeLeave
            if (isHandleCheckedRef.current) {
                return;
            }
            const history = historyRef.current;
            const { beforeEach: _beforeEach } = hookStoreRef.current ?? {};
            if (!history || !_beforeEach) return;

            const fromRoute = currentRouteRef.current;

            return new Promise((resolve, reject) => {
                _beforeEach(toRoute ?? null, fromRoute ?? null, createNext(resolve, reject));
            });
        },
        [createNext, hookStoreRef],
    );

    /* 全局守卫 - afterEach */
    const afterEachHook = useCallback(
        (toRoute?: Route) => {
            const history = historyRef.current;
            const { afterEach: _afterEach } = hookStoreRef.current ?? {};
            if (!history || !_afterEach) return;

            const fromRoute = currentRouteRef.current;

            _afterEach(toRoute ?? null, fromRoute ?? null);
        },
        [hookStoreRef],
    );

    const hooksStoreRef = useLiveRef(
        {
            beforeLeaveHook,
            beforeEnterHook,
            beforeLeaveEachHook,
            beforeEachHook,
            afterEachHook,
        },
        false,
    );

    /* Magic Code */
    /* const initCheat = useCallback((history: History) => {
        const { location } = history;

        // 记录页面初始 location
        originLocationRef.current = location;
        // 拦截 location，挂载为不可匹配 pathname, 阻止 <Route> 渲染
        const _location = {...location, pathname: MAGIC_PATH};
        history.location = _location;
    }, []); */

    /* 页面初始化时 hook 拦截 */
    const initInterceptorHook = useCallback(async () => {
        try {
            const history = historyRef.current;
            if (!history) return;

            /* const originLocation = originLocationRef.current;
        const locationListener = locationListenerRef.current;
        if(!originLocation || !locationListener) return; */

            const toRoute = createRoute(history.location);

            // 路由守卫 - enter
            await hooksStoreRef.current?.beforeEachHook(toRoute);
            await hooksStoreRef.current?.beforeEnterHook(toRoute);

            // 路由守卫 - after
            await hooksStoreRef.current?.afterEachHook(toRoute);

            // 更新当前路由
            currentRouteRef.current = toRoute;

            // reset history 对象
            /* history.action = 'PUSH';
        history.location = originLocation; */
            // 触发 <Router> setState 渲染
            // locationListener(originLocation, 'PUSH');
            forceUpdate();
        } catch (error) {
            error === HOOK_STATUS.redirect && forceUpdate();
        }
    }, [createRoute, forceUpdate, hooksStoreRef]);

    /* ---------- core ---------- */
    /* 考虑到 react-router 6 可能可以同时存在 2 个 router，将拦截放置组件内(根据测验的 P1 C1 P2 C2 执行顺序，此方案可行) */
    useMemo(() => {
        const RouterWrapper = routerType === 'hash' ? HashRouter : BrowserRouter;
        const render = RouterWrapper.prototype.render;

        RouterWrapper.prototype.render = function () {
            const history = (this as any).history as History;
            const { listen } = history;

            // --- CORE: 初始化拦截 ---
            // initCheat(history);

            // 存储 history
            historyRef.current = history;

            // --- CORE: 拦截 listen ---
            function _listen(this: History, locationListener: LocationListener) {
                // 存储 <Router> 抛给 history 的 listener
                locationListenerRef.current = locationListener;

                // 拦截器 listener
                const listener = async function (location: Location, action: Action) {
                    try {
                        // console.log('location: ', location, 'action: ', action);

                        const toRoute = createRoute(location);
                        // 更新当前 location
                        // currentLocationRef.current = location;

                        // 路由守卫 - leave
                        await hooksStoreRef.current?.beforeLeaveEachHook(toRoute);
                        await hooksStoreRef.current?.beforeLeaveHook(toRoute);

                        // 重定向拦截重置
                        isRedirectRef.current && (isRedirectRef.current = false);

                        // 路由守卫 - enter
                        await hooksStoreRef.current?.beforeEachHook(toRoute);
                        await hooksStoreRef.current?.beforeEnterHook(toRoute);

                        // 路由守卫 - after
                        await hooksStoreRef.current?.afterEachHook(toRoute);

                        // push replace 等已校验重置
                        isHandleCheckedRef.current && (isHandleCheckedRef.current = false);

                        // 更新当前路由
                        currentRouteRef.current = toRoute;

                        locationListener(location, action);
                    } catch (error) {}
                };

                return listen.call(this, listener);
            }

            history.listen = _listen;

            // reset
            RouterWrapper.prototype.render = render;
            // return render.call(this);
            return null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useDidMount(() => {
        const history = historyRef.current;
        if (!history) return;

        const onHandlerCheck = async function (to: To) {
            try {
                // 获取 pathname
                const pathname = typeof to === 'string' ? to : to.pathname;
                if (pathname) {
                    const toRoute = createRoute(pathname);
                    // 路由守卫 - leave
                    await hooksStoreRef.current?.beforeLeaveEachHook(toRoute);
                    await hooksStoreRef.current?.beforeLeaveHook(toRoute);

                    // 路由守卫 - enter
                    await hooksStoreRef.current?.beforeEachHook(toRoute);
                    await hooksStoreRef.current?.beforeEnterHook(toRoute);

                    // 标志手动跳转，listener 处即可跳过校验
                    isHandleCheckedRef.current = true;
                }
            } catch (error) {}
        };
        // --- CORE: 拦截 push ---
        const push = history.push;
        history.push = async function (to: To, state?: State) {
            await onHandlerCheck(to);
            (push as any).call(this, to, state);
        };

        // --- CORE: 拦截 replace ---
        const replace = history.replace;
        history.replace = async function (to: To, state?: State) {
            await onHandlerCheck(to);
            (replace as any).call(this, to, state);
        };
    }, false);

    /* 初始化进入路由校验 */
    useDidMount(() => {
        initInterceptorHook();
    }, false);

    if (routerType === 'hash') {
        return <HashRouter {...(routerProps as HashRouterProps)}>{children}</HashRouter>;
    }
    return <BrowserRouter {...(routerProps as BrowserRouterProps)}>{children}</BrowserRouter>;
};

// export { RouteConfig, Router };
export * from './types';
export default Router;
