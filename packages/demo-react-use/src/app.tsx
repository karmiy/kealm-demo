import React, { 
    useState, 
    useCallback, 
    useRef, 
    useEffect, 
    useReducer,
    Reducer,
    EffectCallback, 
    DependencyList, 
    useMemo, 
    forwardRef,
    Dispatch,
    SetStateAction,
} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './app.scss';
import { renderRoutes } from 'react-router-config';
import routes from '@router';

// -------------------
import { useToggle } from 'react-use';

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
    const [on, toggle] = useToggle(true);

    return (
        <Router>
            <div className='app'>
                <div>{on ? 'ON' : 'OFF'}</div>
                <button onClick={toggle}>Toggle</button>
                <button onClick={() => toggle(true)}>set ON</button>
                <button onClick={() => toggle(false)}>set OFF</button>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;