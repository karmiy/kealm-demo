import React, { 
    useState, 
    useCallback, 
    useRef, 
    useEffect, 
    EffectCallback, 
    DependencyList, 
    useMemo, 
    forwardRef,
    Dispatch,
} from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './app.scss';
import { renderRoutes } from 'react-router-config';
import routes from '@router';

// -------------------
import { useMediaDevices } from 'react-use';

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
    const state = useMediaDevices();

    return (
        <Router>
            <div className='app'>
                <pre>
                    {JSON.stringify(state, null, 2)}
                </pre>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;