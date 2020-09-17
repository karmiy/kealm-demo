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
import { useSpeech } from 'react-use';

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

const App: React.FC<{}> = () => {
    const state = useSpeech('Hello world!', { rate: 0.8, pitch: 0.5, voice: voices[0] });
    
    return (
        <Router>
            <div className='app'>
                <pre>
                    {JSON.stringify(state, null, 2)}
                </pre> 
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;