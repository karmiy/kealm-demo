import { lazy } from 'react';
import { RouteConfig } from '@shared/components/router';

const route: RouteConfig[] = [
    {
        key: 'DemoA',
        path: '/demo-a',
        component: lazy(() => import(/* webpackChunkName:'views-demo-a' */ '@views/demo-a')),
        meta: {
            isAuth: true,
        },
        /* beforeEnter(to, from, next) {
            setTimeout(() => {
                next('/demo-b');
                // next();
            }, 1000);
            // next();
        }, */
    },
];

export default route;
