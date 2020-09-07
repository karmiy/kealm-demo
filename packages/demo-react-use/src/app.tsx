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
} from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './app.scss';
import { renderRoutes } from 'react-router-config';
import routes from '@router';

// -------------------
import { useRafState } from 'react-use';

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

const DemoStateValidator = (s: number[]) => [s.every((num: number) => !(num % 2))] as [boolean];

const App: React.FC<{}> = () => {
    const [state, setState] = useRafState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const onResize = () => {
            setState({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
      
        window.addEventListener('resize', onResize);
      
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <Router>
            <div className='app'>
                <pre>{JSON.stringify(state, null, 2)}</pre>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;