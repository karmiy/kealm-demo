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
import { useScroll } from 'react-use';

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

    const scrollRef = React.useRef(null);
    const {x, y} = useScroll(scrollRef);

    return (
        <Router>
            <div className='app'>
                <div>x: {x}</div>
                <div>y: {y}</div>
                <div ref={scrollRef} style={{
                    height: 200,
                    border: '1px solid #1394ff',
                    overflow: 'auto',
                }}>
                    <div style={{height: 1000}} />
                </div>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;