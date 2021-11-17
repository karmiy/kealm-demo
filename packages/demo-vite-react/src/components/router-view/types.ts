import React from 'react';
import { RouteConfig } from 'react-router-config';

export interface RouterViewProps {
    routes?: RouteConfig[];
    extraProps?: {
        // 传递给子组件的 props
        [prop: string]: any;
    };
}

export interface RouterViewType extends React.FC<RouterViewProps> {
    use(routerConfig: RouteConfig[]): void;
}
