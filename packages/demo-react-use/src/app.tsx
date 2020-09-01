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
import { HashRouter as Router } from 'react-router-dom';
import './app.scss';
import { renderRoutes } from 'react-router-config';
import routes from '@router';

// -------------------
import { useObservable } from 'react-use';

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

class Subject<T> {
    private listeners: Array<(value: T) => void> = [];

    public subscribe(listener: (value: T) => void) {
        this.listeners.push(listener);

        return {
            unsubscribe: () => {
                const index = this.listeners.indexOf(listener);
                this.listeners[index] = this.listeners[this.listeners.length - 1];
                this.listeners.pop();
            }
        }
    }

    public next(value: T) {
        this.listeners.forEach(listener => listener(value));
    }
}

const subject = new Subject<number>();

const Button: React.FC<{}> = () => {
    const value = useObservable(subject, 0);

    return <button onClick={() => subject.next(value + 1)}>Clicked {value} times</button>
}

const Content: React.FC<{}> = () => {
    const value = useObservable(subject, 0);

    return <div>Value is {value}</div>
}

const App: React.FC<{}> = () => {

    return (
        <Router>
            <div className='app'>
                {/* <button onClick={() => subject.next(value + 1)}>
                    Clicked {value} times
                </button> */}
                <Button />
                <Content />
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;