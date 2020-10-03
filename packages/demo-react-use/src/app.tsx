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
import { useWindowScroll } from 'react-use';

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
    const {x, y} = useWindowScroll();

    return (
        <Router>
            <div className='app' style={{ height: 2000 }}>
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                }}>
                    <div>x: {x}</div>
                    <div>y: {y}</div>
                </div>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;