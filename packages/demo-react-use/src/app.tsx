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
import { useLockBodyScroll, useToggle } from 'react-use';
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
    const [locked, setLocked] = useState(false);
    useLockBodyScroll(locked);

    return (
        <Router>
            <div className='app'>
                <div  style={{height: 2000, backgroundColor: 'skyblue'}}></div>
                <div style={{height: 200, backgroundColor: 'pink', overflow: 'auto'}}>
                    <div style={{height: 400}}>
                        inner scroll
                    </div>
                </div>
                <button onClick={() => setLocked(v => !v)}>
                    {locked ? 'Unlock' : 'Lock'}
                </button>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;