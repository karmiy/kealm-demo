import React, { useState, useCallback, useRef, useEffect, EffectCallback, DependencyList, useMemo, forwardRef } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './app.scss';
import { renderRoutes } from 'react-router-config';
import routes from '@router';

// -------------------
import { useFullscreen, useToggle } from 'react-use';

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
    const ref = useRef(null)
    const [show, toggle] = useToggle(false);
    const isFullscreen = useFullscreen(ref, show, {onClose: () => toggle(false)});

    return (
        <Router>
            <div ref={ref} className='app'>
                <div>{isFullscreen ? 'Fullscreen' : 'Not fullscreen'}</div>
                <button onClick={() => toggle()}>Toggle</button>
                {/* <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay /> */}
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;