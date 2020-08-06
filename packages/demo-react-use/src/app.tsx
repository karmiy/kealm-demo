import React, { useState, useCallback, useRef, useEffect, EffectCallback, DependencyList, useMemo, forwardRef } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './app.scss';
import { renderRoutes } from 'react-router-config';
import routes from '@router';

// -------------------
import { useFirstMountState, useUpdate } from 'react-use';

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
    const isFirstMount = useFirstMountState();
    const update = useUpdate();

    return (
        <Router>
            <div className='app'>
                <span>This component is just mounted: {isFirstMount ? 'YES' : 'NO'}</span>
                <br />
                <button onClick={update}>re-render</button>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;