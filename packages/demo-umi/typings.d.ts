declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.png';
declare module '*.svg' {
    export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
    const url: string;
    export default url;
}

// umi 缺省类型
declare namespace UmiNS {
    export interface Route {
        path?: string;
        component?: string | (() => any);
        wrappers?: string[];
        redirect?: string;
        exact?: boolean;
        routes?: any[];
        [k: string]: any;
    }

    export interface MatchedRoute {
        route: Route;
        match: {
            isExact?: boolean;
            params?: Record<string, any>;
            path?: string;
            url?: string;
        };
    }

    export interface RouteChangeParams {
        location: Location;
        routes: Route[];
        matchedRoutes: MatchedRoute[];
        action: string;
    }
}

interface InitialState {
    userId: number;
    userName: string;
    role: string;
}
