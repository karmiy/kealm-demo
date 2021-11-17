import { Dispatch, useMemo, useRef, useState } from 'react';
import { HookState, InitialHookState, resolveHookState } from '../../utils/resolve-hook-state';
import { useUpdate } from '../useUpdate';

function useGetSet<S = undefined>(): [() => S | undefined, Dispatch<HookState<S | undefined>>];
function useGetSet<S>(initialState: InitialHookState<S>): [() => S, Dispatch<HookState<S>>];
function useGetSet<S>(initialState?: InitialHookState<S>) {
    const [initState] = useState(() => resolveHookState(initialState));
    const state = useRef(initState);
    const update = useUpdate();

    return useMemo(
        () => [
            // get
            () => state.current as S,
            // set
            (newState: HookState<S>) => {
                state.current = resolveHookState(newState, state.current);
                update();
            },
        ],
        [update],
    );
}

export { useGetSet };
