import { RouteConfig as RouteConf } from 'react-router-config';
import { BrowserRouterProps, HashRouterProps } from 'react-router-dom';

// 配置 Route + 实际 url
export interface Route extends RouteConfig {
    url: string;
}

export type RouteNav = Route | null;

export type Next = (path?: string | false) => void;

export interface BeforeRouterHook {
    (to: RouteNav, from: RouteNav, next: Next): void;
}

export interface AfterRouterHook {
    (to: RouteNav, from: RouteNav): void;
}

export interface Meta {
    [key: string]: any;
}

export interface RouteConfig extends RouteConf {
    // 可能有手动 URL 输入不匹配路由的场景，这时无匹配者返回 null
    beforeEnter?: BeforeRouterHook;
    beforeLeave?: BeforeRouterHook;
    routes?: RouteConfig[];
    meta?: Meta;
}

type RouterRecord<T extends 'hash' | 'browser'> = T extends 'hash'
    ? HashRouterProps
    : BrowserRouterProps;

export interface RouterProps<T extends 'hash' | 'browser'> {
    routes: RouteConfig[];
    routerType?: T;
    routerProps?: RouterRecord<T>;
    beforeEach?: BeforeRouterHook;
    beforeLeaveEach?: BeforeRouterHook;
    afterEach?: AfterRouterHook;
}

export type RouterType = <T extends 'hash' | 'browser'>(
    props: React.PropsWithChildren<RouterProps<T>>,
) => React.ReactElement<any, any> | null;

/* ---------- history ---------- */
import { Hash, Pathname, Search } from 'history';

export interface PartialPath {
    pathname?: Pathname;
    search?: Search;
    hash?: Hash;
}

export type To = string | PartialPath;

export type State = object | null;
