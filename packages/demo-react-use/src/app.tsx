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
import { useScratch } from 'react-use';

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

    const [ref, state] = useScratch();

    const blockStyle: React.CSSProperties = {
        position: 'relative',
        width: 400,
        height: 400,
        border: '1px solid tomato',
    };

    const preStyle: React.CSSProperties = {
        pointerEvents: 'none',
        userSelect: 'none',
    };

    let { x = 0, y = 0, dx = 0, dy = 0 } = state;
    if (dx < 0) [x, dx] = [x + dx, -dx];
    if (dy < 0) [y, dy] = [y + dy, -dy];

    const rectangleStyle: React.CSSProperties = {
        position: 'absolute',
        left: x,
        top: y,
        width: dx,
        height: dy,
        border: '1px solid tomato',
        pointerEvents: 'none',
        userSelect: 'none',
    };

    return (
        <Router>
            <div className='app'>
                <div ref={ref} style={blockStyle}>
                    <pre style={preStyle}>{JSON.stringify(state, null, 4)}</pre>
                    {state.isScratching && <div style={rectangleStyle} />}
                </div>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;