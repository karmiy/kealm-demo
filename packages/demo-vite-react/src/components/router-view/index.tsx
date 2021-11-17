import React, { ReactNode, Suspense, useContext, useMemo } from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { useLocation } from 'react-router-dom';
import { RouterViewType } from './types';
import { createKeywords, getMatchRoute } from './utils';

/* ---------- context ---------- */
const ROUTER_EMPTY: RouteConfig[] = [];
let RouteContext = React.createContext<RouteConfig[]>(ROUTER_EMPTY);

/* ---------- views 页面容器组件 ---------- */
const RouterView: RouterViewType = props => {
    const { routes: _routes, extraProps } = props;

    // 优先级: 手动传递 > 全局配置
    const contextRoutes = useContext(RouteContext);
    const routes = useMemo(() => _routes ?? contextRoutes ?? [], [_routes, contextRoutes]);
    const location = useLocation();
    const pathname = location.pathname;

    // 路由匹配项
    const match = getMatchRoute(routes, pathname);

    // 构造 keyword
    useMemo(() => {
        createKeywords(routes);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ---------- render ---------- */
    const renderViewWrap = useMemo(() => {
        return (
            <Suspense fallback={null}>{renderRoutes(routes, extraProps, { location })}</Suspense>
        );
    }, [extraProps, location, routes]);

    /* 保持外层辅助 div 不更新 */
    const renderView = useMemo(
        () => (viewWrap: ReactNode) =>
            (
                <RouteContext.Provider value={match?.routes ?? ROUTER_EMPTY}>
                    {viewWrap}
                </RouteContext.Provider>
            ),
        [match],
    );

    if (!routes.length) return null;

    return renderView(renderViewWrap);
};

RouterView.use = function (config) {
    RouteContext = React.createContext(config);
};

export default RouterView;
