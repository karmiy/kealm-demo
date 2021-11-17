import { useEffect, useLayoutEffect } from 'react';

export function useDidMount(fn: () => any, async = true) {
    (async ? useEffect : useLayoutEffect)(() => {
        fn?.();
    }, []);
}
