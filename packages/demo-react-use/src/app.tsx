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
    SetStateAction,
} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './app.scss';
import { renderRoutes } from 'react-router-config';
import routes from '@router';

// -------------------
import { useStateValidator } from 'react-use';

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

const DemoStateValidator = (s: string): [boolean] => [s === '' ? false :  +s % 2 === 0];

const App: React.FC<{}> = () => {
    const [state, setState] = React.useState<string>('0');
    const [[isValid]] = useStateValidator(state, DemoStateValidator, [false]);
    
    return (
        <Router>
            <div className='app'>
                <div>Below field is valid only if number is even</div>
                <input
                    type="number"
                    min="0"
                    max="10"
                    value={state}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                        setState(ev.target.value);
                    }}
                />
                {isValid !== null && <span>{isValid ? 'Valid!' : 'Invalid'}</span>}
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;