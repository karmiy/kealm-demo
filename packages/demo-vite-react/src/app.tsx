import React from 'react';
import { Router } from '@shared/components';
import { RouterView } from '@components';
import routes, { beforeEach } from '@router';
import './app.scss';

RouterView.use(routes);

// const isDev = process.env.NODE_ENV === 'development';

const App: React.FC = () => {
    return (
        <Router
            routerType='browser'
            routerProps={{
                basename: '/demos',
            }}
            routes={routes}
            beforeEach={beforeEach}
        >
            <RouterView />
        </Router>
    );
};

export default App;
