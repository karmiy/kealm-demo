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
import { BrowserRouter as Router } from 'react-router-dom';
import './app.scss';
import { renderRoutes } from 'react-router-config';
import routes from '@router';

// -------------------
import { useSet } from 'react-use';

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

    const [set, { add, has, remove, toggle, reset }] = useSet(new Set(['hello']));

    return (
        <Router>
            <div className='app'>
                <button onClick={() => add(String(Date.now()))}>Add</button>
                <button onClick={() => reset()}>Reset</button>
                <button onClick={() => remove('hello')} disabled={!has('hello')}>
                    Remove hello
                </button>
                <button onClick={() => toggle('hello')}>Toggle hello</button>
                <pre>{JSON.stringify(Array.from(set), null, 2)}</pre>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;