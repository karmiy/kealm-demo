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
import { BrowserRouter as Router } from 'react-router-dom';
import './app.scss';
import { renderRoutes } from 'react-router-config';
import routes from '@router';

// -------------------
import { useShallowCompareEffect, useDeepCompareEffect, useUpdate, useRendersCount } from 'react-use';

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
    const [visible, setVisible] = useState(false);
    const option = { step: 2 };

    useShallowCompareEffect(() => {
        console.log(111);
    }, [option]);

    return (
        <Router>
            <div className='app'>
                <p>useCustomCompareEffect with shallow comparison: {String(visible)}</p>
                <button onClick={() => setVisible(v => !v)}>toggle</button>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;