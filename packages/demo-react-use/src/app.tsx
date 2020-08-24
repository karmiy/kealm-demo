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
import { useMeasure } from 'react-use';
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
    const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure<HTMLDivElement>();

    return (
        <Router>
            <div ref={ref} className='app'>
                <div>x: {x}</div>	
                <div>y: {y}</div>
                <div>width: {width}</div>
                <div>height: {height}</div>
                <div>top: {top}</div>
                <div>right: {right}</div>
                <div>bottom: {bottom}</div>
                <div>left: {left}</div>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;