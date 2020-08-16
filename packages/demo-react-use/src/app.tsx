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
import { useKey } from 'react-use';

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

const defaultMapPropsToArgs = <P extends object>(props: P) => [props];


/* const createRenderProp = <S, H extends (...args: any[]) => S, P extends Props<S>>(hook: H, mapPropsToArgs: (props: P) => Parameters<H> = (defaultMapPropsToArgs as any)) => {
    const RenderProp = (props: P) => {
        const state = hook(...mapPropsToArgs(props));
        const { children, render = children } = props;
        return render ? render(state) || null : null;
    };

    return RenderProp;
}; */

const createRenderProp = <H extends (...args: any[]) => any, S extends ReturnType<H>, P extends object>(hook: H, mapPropsToArgs: (props: P) => any = defaultMapPropsToArgs) => {
    type Render = (state: S) => React.ReactElement;

    type Props = {
        children?: Render;
        render?: Render;
    } & P;
    
    const RenderProp: React.FC<Props> = (props: Props) => {
        const state = (hook(...mapPropsToArgs(props)) as S);
        const { children, render = children } = props;
        return render ? (render(state) || null) : null;
    };

    return RenderProp;
}

function useTest(id: number, name: string) {
    return {
        id: 'ID: ' + id,
        name: 'NAME: ' + name,
    }
}

interface ITestProps {
    id: number;
    name: string;
}
const Test = createRenderProp(useTest, ({ id, name }: ITestProps) => ([id, name]));

const App: React.FC<{}> = () => {

    return (
        <Router>
            <div className='app'>
                {/* Press arrow up: {count} */}
                <Test id={1} name={'karmiy'} render={state => {
                    return (
                        <div>
                            <p>{state.id}</p>
                            <p>{state.name}</p>
                        </div>
                    )
                }} />
                <Test id={1} name={'karloy'}>
                    {state => {
                        return (
                            <div>
                                <p>{state.id}</p>
                                <p>{state.name}</p>
                            </div>
                        )
                    }}
                </Test>
            </div>
            {/* {renderRoutes(routes)} */}
        </Router>
    )
};

export default App;