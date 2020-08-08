import React, { useState, useCallback, useRef, useEffect, EffectCallback, DependencyList, useMemo, forwardRef } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './app.scss';
import { renderRoutes } from 'react-router-config';
import routes from '@router';

// -------------------
import { useGetSet } from 'react-use';

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

interface IChildProps {
    id?: number;
}

const App: React.FC<{}> = () => {
    const [get, set] = useGetSet(0);
    const onClick = () => {
        setTimeout(() => {
            set(get() + 1)
        }, 1000);
    };

    return (
        <Router>
            <div className='app'>
                <button onClick={onClick}>Clicked: {get()}</button>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;