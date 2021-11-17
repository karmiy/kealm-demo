import pathToRegexp from 'path-to-regexp';
import { RouteConfig } from './types';

/**
 * @description 创建路由 path 正则
 * @param routes
 * @param cb
 */
export function createRouteRegExp(
    routes: RouteConfig[],
    cb: (pathRegExp: RegExp, route: RouteConfig) => void,
) {
    routes.forEach(route => {
        if (route.path) {
            const regExp = pathToRegexp(route.path, [], { end: !!route.exact });
            cb(regExp, route);
            route.routes && createRouteRegExp(route.routes, cb);
        }
    });
}

export enum HOOK_STATUS {
    'redirect',
}
