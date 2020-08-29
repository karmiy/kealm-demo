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
import { useMouseHovered } from 'react-use';

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
    const ref = useRef(null);

    const { docX, docY, posX, posY, elX, elY, elW, elH } = useMouseHovered(ref, {
        bound: true,
        whenHovered: true,
    });

    return (
        <Router>
            <div className='app'>
                <div>Mouse position in document - x:{docX} y:{docY}</div>
                <div>Mouse position in element - x:{elX} y:{elY}</div>
                <div>Element position- x:{posX} y:{posY}</div>
                <div>Element dimensions - {elW}x{elH}</div>
                <div ref={ref} style={{
                    width: 100,
                    height: 100,
                    border: '1px solid skyblue',
                }}></div>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;