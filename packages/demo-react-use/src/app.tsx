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
import { useKeyPress } from 'react-use';

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

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const App: React.FC<{}> = () => {
    const states = [];
    for (const key of keys) states.push(useKeyPress(key)[0]);

    return (
        <Router>
            <div className='app'>
                Try pressing numbers
                <br />
                {states.reduce((s, pressed, index) => s + (pressed ? (s ? ' + ' : '') + keys[index] : ''), '')}
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;