import React, { useState, useCallback, useRef, useEffect, EffectCallback, DependencyList, useMemo } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './app.scss';
import { renderRoutes } from 'react-router-config';
import routes from '@router';

// -------------------
import { useDeepCompareEffect } from 'react-use';

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
    const [visible, setVisible] = useState(false);
    const option = useMemo(() => ({ visible }), [visible]);

    useDeepCompareEffect(() => {
        // 当 visible 为 true 时触发
        console.log(111);
    }, [option]);
    
    return (
        <Router>
            <div className='app'>
                <p>useCustomCompareEffect with deep comparison: {String(visible)}</p>
                <button onClick={() => setVisible(v => !v)}>toggle</button>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;