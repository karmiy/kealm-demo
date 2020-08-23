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
import { useLongPress } from 'react-use';
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
    const onLongPress = () => {
        console.log('calls callback after long pressing 300ms');
    };
    
    const defaultOptions = {
        isPreventDefault: true,
        delay: 1000,
    };
    const longPressEvent = useLongPress(onLongPress, defaultOptions);

    return (
        <Router>
            <div className='app'>
                <button {...longPressEvent}>useLongPress</button>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;