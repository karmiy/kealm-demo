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
import { useRafLoop } from 'react-use';

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
    const [left, setLeft] = useState(0);
    const directiveRef = useRef(true);
    const [loopStop, loopStart, isActive] = useRafLoop(() => {
        setLeft(value => {
            const nextValue = value + (directiveRef.current ? 1 : -1);
            (nextValue === 500 || nextValue === 0) && (directiveRef.current = !directiveRef.current);
            return nextValue;    
        });
    }, false);

    return (
        <Router>
            <div className='app'>
                <div style={{
                    position: 'relative',
                    width: 100,
                    height: 100,
                    border: '1px solid #1394ff',
                    left,
                }} />
                <button onClick={() => isActive() ? loopStop() : loopStart()}>Toggle</button>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;