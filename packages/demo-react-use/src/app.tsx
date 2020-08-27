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
import { useMethods } from 'react-use';

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

interface State {
    count: number;
}

const initialState: State = {
    count: 0,
};
  
const createMethods = (state: State) => {
    return {
        reset() {
            return initialState;
        },
        increment() {
            return { ...state, count: state.count + 1 };
        },
        decrement() {
            return { ...state, count: state.count - 1 };
        },
    };
}

const App: React.FC<{}> = () => {
    const [state, methods] = useMethods(createMethods, initialState);

    return (
        <Router>
            <div className='app'>
                <p>Count: {state.count}</p>
                <button onClick={methods.decrement}>-</button>
                <button onClick={methods.increment}>+</button>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;