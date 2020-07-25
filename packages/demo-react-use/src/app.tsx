import React, { useState, useCallback, useRef } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './app.scss';
import { renderRoutes } from 'react-router-config';
import routes from '@router';

// -------------------
import { useCounter } from 'react-use';

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
    const [min, { inc: incMin, dec: decMin }] = useCounter(1);
    const [max, { inc: incMax, dec: decMax }] = useCounter(10);
    const [value, { inc, dec, set, reset }] = useCounter(5, max, min);

    // console.log('render');
    return (
        <Router>
            <div className='app'>
                <div>
                    current: { value } [min: { min }; max: { max }]
                </div>

                <br />
                Current value: <button onClick={ () => inc() }>Increment</button>
                <button onClick={ () => dec() }>Decrement</button>
                <button onClick={ () => inc(5) }>Increment (+5)</button>
                <button onClick={ () => dec(5) }>Decrement (-5)</button>
                <button onClick={ () => set(100) }>Set 100</button>
                <button onClick={ () => reset() }>Reset</button>
                <button onClick={ () => reset(25) }>Reset (25)</button>

                <br />
                <br />
                Min value:
                <button onClick={ () => incMin() }>Increment</button>
                <button onClick={ () => decMin() }>Decrement</button>

                <br />
                <br />
                Max value:
                <button onClick={ () => incMax() }>Increment</button>
                <button onClick={ () => decMax() }>Decrement</button>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;