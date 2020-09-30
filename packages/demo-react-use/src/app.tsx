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
import { useTimeout } from 'react-use';

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

function TestComponent(props: { ms?: number } = {}) {
    const ms = props.ms || 5000;
    const [isReady, cancel] = useTimeout(ms);
  
    return (
        <div>
            { isReady() ? 'I\'m reloaded after timeout' : `I will be reloaded after ${ ms / 1000 }s` }
            { isReady() === false ? <button onClick={ cancel }>Cancel</button> : '' }
        </div>
    );
}

const App: React.FC<{}> = () => {

    return (
        <Router>
            <div className='app'>
                <TestComponent />
                <TestComponent ms={ 2000 } />
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;