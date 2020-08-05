## 常用

- [useAsyncFn](./docs/useAsyncFn.md)

- [useAsync](./docs/useAsync.md)

- [useAsyncRetry](./docs/useAsyncRetry.md)

- [useClickAway](./docs/useClickAway.md)

- [useCounter](./docs/useCounter.md)

- [useEnsuredForwardedRef](./docs/useEnsuredForwardedRef.md)

- [useEvent](./docs/useEvent.md)（需改造）

## 分类

- Effect

    - [useAsyncFn](./docs/useAsyncFn.md) 异步函数

    - [useAsync](./docs/useAsync.md) 异步行为

    - [useAsyncRetry](./docs/useAsyncRetry.md) 可执行异步行为

    - [useBeforeUnload](./docs/useBeforeUnload.md) 离开页面前提示

    - [useCookie](./docs/useCookie.md) 管理 cookie

    - [useCopyToClipboard](./docs/useCopyToClipboard.md) 复制文本到剪切板

    - [useDebounce](./docs/useDebounce.md) 执行防抖

    - [useError](./docs/useError.md) 派发错误

- Lifecycles

    - [useCustomCompareEffect](./docs/useCustomCompareEffect.md) 可控比较器的 useEffect

    - [useDeepCompareEffect](./docs/useDeepCompareEffect.md) 深比较的 useCustomCompareEffect

    - [useEffectOnce](./docs/useEffectOnce.md) 只执行一次的 useEffect

    - [useEvent](./docs/useEvent.md) 事件挂载

- State

    - [useCounter](./docs/useCounter.md) 数值管理

    - [useDefault](./docs/useDefault.md) 带有默认值的 useState

- Miscellaneous

    - [useEnsuredForwardedRef](./docs/useEnsuredForwardedRef.md) 确保使用 forwardRef 时子组件可以拿到 ref

- Sensors

    - [useBattery](./docs/useBattery.md) 电池

- UI

    - [useAudio](./docs/useAudio.md) 音频

    - [useClickAway](./docs/useClickAway.md) 点击元素外围

    - [useCss](./docs/useCss.md) 动态使用 CSS

    - [useDrop](./docs/useDrop.md) 全局拖拽、粘贴事件响应

    - [useDropArea](./docs/useDropArea.md) 特定元素拖拽、粘贴事件响应

## 心得

- 尽可能的灵活 - useAudio

- 不做无用渲染，区分状态应该存储在 useState 还是 useRef - useMountedState

- 合理结合优秀的第三方库 - useCookie, useCopyToClipboard

- hook 初始值定义为 InitialHookState 类型 - useCounter

- set 方法相关的参数定义为 HookState 类型 - useCounter

- 当需要返回一个功能对象时，利用 useMemo 对该对象进行缓存，防止用户使用该对象作为 dep 时出现多余无用 render - useCounter

- 巧用高阶函数，将不容易变化的数据作为第一阶的参数，返回一个函数，利用 useMemo 缓存该函数。再将容易变化的数据作为返回函数的参数 - useDrop

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
export type StateSetter<S> = (prevState: S) => S;
export type InitialStateSetter<S> = () => S;

export type InitialHookState<S> = S | InitialStateSetter<S>;
export type HookState<S> = S | StateSetter<S>;
export type ResolvableHookState<S> = S | StateSetter<S> | InitialStateSetter<S>;

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