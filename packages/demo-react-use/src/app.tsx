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
import { useUnmountPromise } from 'react-use';

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

const Child = () => {
    const wrapper = useUnmountPromise();

    const requestUser = async () => {
        const users = await wrapper(getUsers('man'));
        console.log(users);
    };

    useEffect(() => {
        requestUser();
    }, []);

    return <div>child</div>;
}

const App: React.FC<{}> = () => {
    const [show, setShow] = useState(true);

    return (
        <Router>
            <div className='app'>
                {show && <Child />}
                <button onClick={() => setShow(v => !v)}>Toggle</button>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;