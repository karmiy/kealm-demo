import { RouteConfig } from 'react-router-config';
import Loadable from 'react-loadable';
import Loading from '@components/loading';

const route: RouteConfig = {
    key: 'Product',
    path: '/product/:id',
    component: Loadable({
        loader: () => import(/* webpackChunkName:'views-product' */'../views/product'),
        loading: Loading,
    }),
};

export default route;