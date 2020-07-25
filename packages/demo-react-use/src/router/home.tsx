import { RouteConfig } from 'react-router-config';
import Loadable from 'react-loadable';
import Loading from '@components/loading';

const route: RouteConfig = {
    key: 'Home',
    path: "/home",
    component: Loadable({
        loader: () => import(/* webpackChunkName:'views-home' */'../views/home'),
        loading: Loading,
    }),
};

export default route;