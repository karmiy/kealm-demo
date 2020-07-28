import React, { useState, useCallback, useRef, useEffect, EffectCallback, DependencyList, useMemo } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './app.scss';
import { renderRoutes } from 'react-router-config';
import routes from '@router';

// -------------------
import { useDropArea } from 'react-use';

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
    const [bond, state] = useDropArea({
        onFiles: files => console.log('files', files),
        onUri: uri => console.log('uri', uri),
        onText: text => console.log('text', text),
    });
    
    return (
        <Router>
            <div className='app'>
                <p {...bond}>Drop something here.</p>
                <p>over: {state.over.toString()}</p>
                <a href='https://github.com/streamich/react-use/blob/master/docs/useDrop.md' 
                    draggable 
                    style={{backgroundColor: '#1394ff'}}
                >
                    draggable
                </a>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;