import { lazy } from 'react';
import { RouteConfig } from '@shared/components/router';

const route: RouteConfig[] = [
    {
        key: 'DemoB',
        path: '/demo-b',
        component: lazy(() => import(/* webpackChunkName:'views-demo-b' */ '@views/demo-b')),
    },
];

export default route;
