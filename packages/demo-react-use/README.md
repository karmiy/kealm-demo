## 常用

- [useAsyncFn](./docs/useAsyncFn.md)

- [useAsync](./docs/useAsync.md)

- [useAsyncRetry](./docs/useAsyncRetry.md)

- [useClickAway](./docs/useClickAway.md)

- [useCounter](./docs/useCounter.md)

- [useEffectOnce](./docs/useEffectOnce.md)

- [useEnsuredForwardedRef](./docs/useEnsuredForwardedRef.md)

- [useEvent](./docs/useEvent.md)（需改造）

- [useFirstMountState](./docs/useFirstMountState.md)

- [useGetSet](./docs/useGetSet.md)

- [useGetSetState](./docs/useGetSetState.md)

## 实用

- [useAudio](./docs/useAudio.md)

- [useCookie](./docs/useCookie.md)

- [useCopyToClipboard](./docs/useCopyToClipboard.md)

- [useDebounce](./docs/useDebounce.md)

- [useHarmonicIntervalFn](./docs/useHarmonicIntervalFn.md)

- [useHover](./docs/useHover.md)

- [useHoverDirty](./docs/useHoverDirty.md)

- [useIdle](./docs/useIdle.md)

- [useInterval](./docs/useInterval.md)

## 分类

- Animations

    - [useHarmonicIntervalFn](./docs/useHarmonicIntervalFn.md) 同谐波的 setInterval

    - [useInterval](./docs/useInterval.md) setInterval 定时器轮询

- Effect

    - [useAsyncFn](./docs/useAsyncFn.md) 异步函数

    - [useAsync](./docs/useAsync.md) 异步行为

    - [useAsyncRetry](./docs/useAsyncRetry.md) 可执行异步行为

    - [useBeforeUnload](./docs/useBeforeUnload.md) 离开页面前提示

    - [useCookie](./docs/useCookie.md) 管理 cookie

    - [useCopyToClipboard](./docs/useCopyToClipboard.md) 复制文本到剪切板

    - [useDebounce](./docs/useDebounce.md) 执行防抖

    - [useError](./docs/useError.md) 派发错误

    - [useFavicon](./docs/useFavicon.md) 挂载 favicon

- Lifecycles

    - [useCustomCompareEffect](./docs/useCustomCompareEffect.md) 可控比较器的 useEffect

    - [useDeepCompareEffect](./docs/useDeepCompareEffect.md) 深比较的 useCustomCompareEffect

    - [useEffectOnce](./docs/useEffectOnce.md) 只执行一次的 useEffect

    - [useEvent](./docs/useEvent.md) 事件挂载

    - [useIsomorphicLayoutEffect](./docs/useIsomorphicLayoutEffect.md) 安全使用 useLayoutEffect

- State

    - [useCounter](./docs/useCounter.md) 数值管理

    - [useDefault](./docs/useDefault.md) 带有默认值的 useState

    - [useFirstMountState](./docs/useFirstMountState.md) 组件是否为初始挂载 render

    - [useGetSet](./docs/useGetSet.md) 返回 get set 的 useState

    - [useGetSetState](./docs/useGetSetState.md) useGetSet + Class Component 的 setState

- Miscellaneous

    - [useEnsuredForwardedRef](./docs/useEnsuredForwardedRef.md) 确保使用 forwardRef 时子组件可以拿到 ref

- Sensors

    - [useBattery](./docs/useBattery.md) 电池

    - [useGeolocation](./docs/useGeolocation.md) 地理位置

    - [useHash](./docs/useHash.md) 管理 hash

    - [useHover](./docs/useHover.md) 管理 ReactElement 的 hover 状态

    - [useHoverDirty](./docs/useHoverDirty.md) 管理 DOM 节点的 hover 状态

    - [useIdle](./docs/useIdle.md) 监听用户空闲状态

    - [useIntersection](./docs/useIntersection.md) 观察元素是否可见

- UI

    - [useAudio](./docs/useAudio.md) 音频

    - [useClickAway](./docs/useClickAway.md) 点击元素外围

    - [useCss](./docs/useCss.md) 动态使用 CSS

    - [useDrop](./docs/useDrop.md) 全局拖拽、粘贴事件响应

    - [useDropArea](./docs/useDropArea.md) 特定元素拖拽、粘贴事件响应

    - [useFullscreen](./docs/useFullscreen.md) 使用全屏

## 心得

- 尽可能的灵活 - useAudio

- 不做无用渲染，区分状态应该存储在 useState 还是 useRef - useMountedState

- 对于一些对象参数，如函数，在不希望作为依赖但需要获取最新的引用时，除了保存引用，也可以让使用者传递一个 deps 帮助实时更新 - useKey

- 合理结合优秀的第三方库 - useCookie, useCopyToClipboard, useHarmonicIntervalFn, useIdle

- hook 初始值定义为 InitialHookState 类型 - useCounter

- set 方法相关的参数定义为 HookState 类型 - useCounter

- 当需要返回一个功能对象时，利用 useMemo 对该对象进行缓存，防止用户使用该对象作为 dep 时出现多余无用 render - useCounter

- 巧用高阶函数，将不容易变化的数据作为第一阶的参数，返回一个函数，利用 useMemo 缓存该函数。再将容易变化的数据作为返回函数的参数 - useDrop

- 与其作为钩子函数被使用，更灵活的是返回一个状态，这样的做法可以让状态更灵活的被使用。如开发一个 useDidMount 作为生命周期，更灵活的是开发一个 useIsFirstMount 返回是否为第一次 render，这样除了可以让使用者根据返回值自定义 useEffect 实现 useDidMount，该变量还可以让使用者在更多场景判断是否为第一次挂载 - useFirstMountState, useMountedState

## Utils 工具

- FnReturningPromise: 返回 Promise 的函数
```ts
export type FnReturningPromise = (...args: any[]) => Promise<any>;
```

- PromiseType: 获取 Promise 返回值类型
```ts
export type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never;
```

- resolveHookState: 处理 hook 状态，将 S, () => S, (prevState: S) => S 的数据进行执行返回 S
```ts
// (prevState: S) => S
export type StateSetter<S> = (prevState: S) => S;
// () => S
export type InitialStateSetter<S> = () => S;

// S | () => S
export type InitialHookState<S> = S | InitialStateSetter<S>;
// S | (prevState: S) => S
export type HookState<S> = S | StateSetter<S>;
// S | (prevState: S) => S | () => S
export type ResolvableHookState<S> = S | StateSetter<S> | InitialStateSetter<S>;

// 将 S | (prevState: S) => S | () => S 转新的 S
export function resolveHookState<S, C extends S>(newState: InitialStateSetter<S>): S;
export function resolveHookState<S, C extends S>(newState: StateSetter<S>, currentState: C): S;
export function resolveHookState<S, C extends S>(newState: ResolvableHookState<S>, currentState?: C): S;
export function resolveHookState<S, C extends S>(newState: ResolvableHookState<S>, currentState?: C): S {
    if (typeof newState === 'function') {
        return (newState as Function)(currentState);
    }

    return newState;
}
```

- isPrimitive: 判断是否基础数据类型

```ts
const isPrimitive = (val: any) => val !== Object(val);
```

- EffectCallback: React.EffectCallback 标注 effect 类型

```ts
type EffectCallback = () => (void | (() => void | undefined));
```

- DependencyList: React.DependencyList 标准 deps 类型

```ts
type DependencyList = ReadonlyArray<any>;
```