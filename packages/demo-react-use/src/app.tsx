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
import { useStateWithHistory } from 'react-use';

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
    const [state, setState, stateHistory] = useStateWithHistory(10);

    return (
        <Router>
            <div className='app'>
                <p>state: {state}</p>
                <p>stateHistory: {stateHistory.history.join(',')}</p>
                <p>position: {stateHistory.position}</p>
                <button onClick={() => setState(state + 1)}>Add</button>
                <button onClick={() => stateHistory.go(2)}>Go index 2</button>
                <button onClick={() => stateHistory.back(1)}>Back index 1</button>
                <button onClick={() => stateHistory.forward(1)}>Forward index 1</button>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;