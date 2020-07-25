import React from 'react';
import { Redirect } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';
import homeRoute from './home';
import productRoute from './product';

const routes: RouteConfig[] = [
    {
        path: "/",
        exact: true,
        render: () => <Redirect to="/home" />,
    },
    homeRoute,
    productRoute,
];

export default routes;