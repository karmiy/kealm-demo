import React, { useState, useCallback, useRef, useEffect, EffectCallback, DependencyList, useMemo, forwardRef } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './app.scss';
import { renderRoutes } from 'react-router-config';
import routes from '@router';

// -------------------
import { useEnsuredForwardedRef, ensuredForwardRef } from 'react-use';

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

const Child = forwardRef<HTMLDivElement, IChildProps>((props, ref) => {
    // Here `ref` is undefined
    const ensuredForwardRef = useEnsuredForwardedRef(ref as React.MutableRefObject<HTMLDivElement>);
    // ensuredForwardRef will always be a valid reference.
  
    useEffect(() => {
        console.log(ensuredForwardRef.current);
    }, [])
  
    return (
        <div ref={ensuredForwardRef} />
    );
});

const App: React.FC<{}> = () => {

    const ref = useRef(null);
    
    useEffect(() => {
        // console.log(ensuredForwardRef.current?.getBoundingClientRect())
        console.log(ref.current);
    }, [])

    return (
        <Router>
            <div className='app'>
                {/* 123 */}
                <Child />
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;