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
import { useGetSetState } from 'react-use';

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
    const [get, setState] = useGetSetState({
        id: 1,
        code: 10,
        count: 100,
    });

    const onClick = () => {
        setTimeout(() => {
            setState({
                id: get().id + 1,
                code: get().code + 10,
            });
        }, 1000);
    };

    return (
        <Router>
            <div className='app'>
                <p>State: {JSON.stringify(get())}</p>
                <button onClick={onClick}>Clicked</button>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;