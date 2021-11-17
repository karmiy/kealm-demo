import { RouteConfig } from 'react-router-config';
import { matchPath } from 'react-router-dom';

/* ---------- keyword ---------- */

/* 关键词，用于创建路由 key */
export const KEYWORDS: { [key: string]: number } = {};

export function createKeywords(routes: RouteConfig[]) {
    routes.forEach(route => {
        if (typeof route.path === 'string') {
            const sections = route.path.split('/');
            sections.forEach(section => {
                if (Number.isNaN(+section) && section.indexOf(':') === -1) {
                    KEYWORDS[section] = 1;
                }
            });
        }
        route.routes && createKeywords(route.routes);
    });
}

/* ---------- utils ---------- */

/**
 * @description 判断是否有匹配的路由
 * @param routes
 * @param path
 */
export function getMatchRoute(routes: RouteConfig[], path: string) {
    return routes.find(route => matchPath(path, route));
}
