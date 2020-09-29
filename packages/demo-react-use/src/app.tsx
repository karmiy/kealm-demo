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
import { useThrottleFn } from 'react-use';

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
    const [left, setLeft] = useState(0);
    const [clientX, setClientX] = useState(0);

    useThrottleFn(
        setLeft,
        16,
        [clientX]
    );

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setClientX(e.clientX);
        }

        document.addEventListener('mousemove', mouseMove);

        return () => document.removeEventListener('mousemove', mouseMove);
    }, []);

    return (
        <Router>
            <div className='app'>
                <div style={{
                    position: 'absolute',
                    width: 100,
                    height: 100,
                    left,
                    backgroundColor: '#1394ff',
                }} />
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;