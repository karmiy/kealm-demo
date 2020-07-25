import React, { useState, useCallback, useRef } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './app.scss';
import { renderRoutes } from 'react-router-config';
import routes from '@router';

// -------------------
import { useCss } from 'react-use';

type ISex = 'man' | 'woman';

interface IUser {
    id: number;
    name: string;
    sex: 'man' | 'woman';
}

function getUsers(sex: ISex) {
    return new Promise<Array<IUser>>((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'k1', sex },
                { id: 2, name: 'k2', sex },
            ])
        }, 2000);
    });
}

const App: React.FC<{}> = () => {
    const className = useCss({
        color: 'red',
        border: '1px solid red',
        '&:hover': {
            color: 'blue',
        },
        '.global_class': {
            color: 'green',
        },
    });
    return (
        <Router>
            <div className='app'>
                Hover me!
                <div className='global_class'>
                    Over!
                </div>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;