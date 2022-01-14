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

declare namespace ApiNS {
    interface User {
        name: string;
        avatar: string;
        userId: string;
        email: string;
        age: number;
        signature: string;
        title: string;
        group: string;
        tags: Array<{
            key: string;
            label: string;
        }>;
        access: string;
        address: string;
        phone: string;
        introduction?: string;
    }

    interface LoginParams {
        username?: string;
        password?: string;
        autoLogin?: boolean;
        type?: string;
    }

    interface LoginResult {
        status?: string;
        type?: string;
        currentAuthority?: string;
        message?: string;
    }
}
