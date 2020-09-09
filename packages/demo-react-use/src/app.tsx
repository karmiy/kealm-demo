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
import { useSlider } from 'react-use';

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
    const ref = React.useRef(null);
    const { isSliding, value } = useSlider(ref);
    

    return (
        <Router>
            <div className='app'>
                <div ref={ref} style={{ position: 'relative' }}>
                    <p style={{ textAlign: 'center', color: isSliding ? 'red' : 'green' }}>
                        {Math.round(value * 100)}%
                    </p>
                    {/* <div style={{ position: 'absolute', left: pos }}>🎚</div> */}
                </div>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;