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
import { useStateList } from 'react-use';

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

const voices = window.speechSynthesis.getVoices();

const stateSet = ['first', 'second', 'third', 'fourth', 'fifth'];

const App: React.FC<{}> = () => {
    const { state, prev, next, setStateAt, setState, currentIndex } = useStateList(stateSet);
    const indexInput = useRef<HTMLInputElement>(null);
    const stateInput = useRef<HTMLInputElement>(null);
    
    return (
        <Router>
            <div className='app'>
                <pre>
                    {state} [index: {currentIndex}]
                </pre>
                <button onClick={() => prev()}>prev</button>
                <br />
                <button onClick={() => next()}>next</button>
                <br />
                <input type="text" ref={indexInput} style={{ width: 120 }} />
                <button onClick={() => setStateAt((indexInput.current!.value as unknown) as number)}>set state by index</button>
                <br />
                <input type="text" ref={stateInput} style={{ width: 120 }} />
                <button onClick={() => setState(stateInput.current!.value)}> set state by value</button>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;