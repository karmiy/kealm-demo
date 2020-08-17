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
import { useKeyPressEvent, useKeyPress } from 'react-use';

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
    const [count, setCount] = useState(0);

    const increment = () => setCount(count => ++count);
    const decrement = () => setCount(count => --count);
    const reset = () => setCount(() => 0);

    useKeyPressEvent(']', increment);
    useKeyPressEvent('[', decrement);
    useKeyPressEvent('r', reset);

    return (
        <Router>
            <div className='app'>
                <p>
                    Try pressing <code>[</code>, <code>]</code>, and <code>r</code> to
                    see the count incremented and decremented.</p>
                <p>Count: {count}</p>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;