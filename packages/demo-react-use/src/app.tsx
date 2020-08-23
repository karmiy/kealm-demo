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
import { useMap } from 'react-use';
import useKeyboardJs from 'react-use/lib/useKeyboardJs';

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
    const [map, {set, setAll, remove, reset}] = useMap<{[key: string]: any}>({
        hello: 'there',
    });

    return (
        <Router>
            <div className='app'>
                <button onClick={() => set(String(Date.now()), new Date().toJSON())}>
                    Add
                </button>
                <button onClick={() => reset()}>
                    Reset
                </button>
                <button onClick={() => setAll({ hello: 'new', data: 'data' })}>
                    Set new data
                </button>
                <button onClick={() => remove('hello')} disabled={!map.hello}>
                    Remove hello
                </button>
                <pre>{JSON.stringify(map, null, 2)}</pre>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;