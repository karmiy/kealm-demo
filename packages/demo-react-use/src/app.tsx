import React, { useState, useCallback, useRef, useEffect, EffectCallback, DependencyList } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './app.scss';
import { renderRoutes } from 'react-router-config';
import routes from '@router';

// -------------------
import { useDebounce, useThrottleFn } from 'react-use';

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
    const [state, setState] = React.useState('Typing stopped');
    const [val, setVal] = React.useState('');

    const [isReady, cancel] = useDebounce(
        () => {
            setState('Typing stopped');
            // 发起请求
            console.log('start request');
        },
        2000,
        [val]
    );
    
    return (
        <Router>
            <div className='app'>
                <input
                    type="text"
                    value={val}
                    placeholder="Debounced input"
                    onChange={({ currentTarget }) => {
                        setState('Waiting for typing to stop...');
                        setVal(currentTarget.value);
                    }}
                />
                <div>{state}</div>
                <div>isReady: {String(isReady())}</div>
                <button onClick={cancel}>Cancel debounce</button>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;