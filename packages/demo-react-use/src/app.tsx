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
import { useThrottle } from 'react-use';

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
    const [value, setValue] = useState(0);
    const throttledValue = useThrottle(value, 500);

    return (
        <Router>
            <div className='app'>
                {throttledValue}
                <button onClick={() => setValue(v => v + 1)}>Add</button>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;