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

- [useList](./docs/useList.md)

- [useMount](./docs/useMount.md)

- [useMountedState](./docs/useMountedState.md)

- [useScroll](./docs/useScroll.md)

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

- [useKey](./docs/useKey.md)

- [useKeyPress](./docs/useKeyPress.md)

- [useKeyPressEvent](./docs/useKeyPressEvent.md)

- [useKeyboardJs](./docs/useKeyboardJs.md)

- [useLatest](./docs/useLatest.md)

- [useLocalStorage](./docs/useLocalStorage.md)

- [useLongPress](./docs/useLongPress.md)

- [useMediatedState](./docs/useMediatedState.md)

- [useMethods](./docs/useMethods.md)

- [useMouse](./docs/useMouse.md)

- [useMouseHovered](./docs/useMouseHovered.md)

- [usePrevious](./docs/usePrevious.md)

- [usePreviousDistinct](./docs/usePreviousDistinct.md)

- [usePromise](./docs/usePromise.md)（名称可以取的更通俗易懂点）

- [useRafLoop](./docs/useRafLoop.md)（可调接收参数）

- [useRafState](./docs/useRafState.md)

## 分类

- Animations

    - [useHarmonicIntervalFn](./docs/useHarmonicIntervalFn.md) 同谐波的 setInterval

    - [useInterval](./docs/useInterval.md) setInterval 定时器轮询

    - [useRaf](./docs/useRaf.md) 一定时间内不断调用 raf 触发组件 render

- Side-effects

    - [useAsyncFn](./docs/useAsyncFn.md) 异步函数

    - [useAsync](./docs/useAsync.md) 异步行为

    - [useAsyncRetry](./docs/useAsyncRetry.md) 可执行异步行为

    - [useBeforeUnload](./docs/useBeforeUnload.md) 离开页面前提示

    - [useCookie](./docs/useCookie.md) 管理 cookie

    - [useCopyToClipboard](./docs/useCopyToClipboard.md) 复制文本到剪切板

    - [useDebounce](./docs/useDebounce.md) 执行防抖

    - [useError](./docs/useError.md) 派发错误

    - [useFavicon](./docs/useFavicon.md) 挂载 favicon

    - [useLocalStorage](./docs/useLocalStorage.md) 管理 localStorage

    - [useLockBodyScroll](./docs/useLockBodyScroll.md) 阻止 body 滚动

    - [usePermission](./docs/usePermission.md) 查询 APIs 权限状态

    - [useRafLoop](./docs/useRafLoop.md) 循环以 raf 调用回调

- Lifecycles

    - [useCustomCompareEffect](./docs/useCustomCompareEffect.md) 可控比较器的 useEffect

    - [useDeepCompareEffect](./docs/useDeepCompareEffect.md) 深比较的 useCustomCompareEffect

    - [useEffectOnce](./docs/useEffectOnce.md) 只执行一次的 useEffect

    - [useEvent](./docs/useEvent.md) 事件挂载

    - [useIsomorphicLayoutEffect](./docs/useIsomorphicLayoutEffect.md) 安全使用 useLayoutEffect

    - [useLifecycles](./docs/useLifecycles.md) 组件初始与销毁生命周期钩子

    - [useLogger](./docs/useLogger.md) 在组件生命周期打印日志
    
    - [useMount](./docs/useMount.md) 在组件初始挂载时执行

    - [useMountedState](./docs/useMountedState.md) 以函数调用的方式获取组件是否挂载完成

    - [usePromise](./docs/usePromise.md) 包装 promise 对象，防止组件卸载后状态更新导致的错误

- State

    - [useCounter](./docs/useCounter.md) 数值管理

    - [useDefault](./docs/useDefault.md) 带有默认值的 useState

    - [useFirstMountState](./docs/useFirstMountState.md) 组件是否为初始挂载 render

    - [useGetSet](./docs/useGetSet.md) 返回 get set 的 useState

    - [useGetSetState](./docs/useGetSetState.md) useGetSet + Class Component 的 setState

    - [useLatest](./docs/useLatest.md) 始终可获取最新状态

    - [useList](./docs/useList.md) 管理并更交互式的操作数组

    - [useMap](./docs/useMap.md) 管理并更交互式的操作对象

    - [useMediatedState](./docs/useMediatedState.md) 赋值时走中间层的 useState

    - [useMethods](./docs/useMethods.md) 策略模式版的 useReducer

    - [useMultiStateValidator](./docs/useMethods.md) 策略模式版的 useReducer

    - [useObservable](./docs/useObservable.md) 跟踪可观察者最新值

    - [usePrevious](./docs/usePrevious.md) 获取前一次 render 时的状态

    - [usePreviousDistinct](./docs/usePreviousDistinct.md) 获取前一次旧状态

    - [useQueue](./docs/useQueue.md) 管理 FIFO 队列

    - [useRafState](./docs/useRafState.md) 以 raf 防抖的  useState

    - [useRendersCount](./docs/useRendersCount.md) 获取组件 render 次数

- Miscellaneous

    - [useEnsuredForwardedRef](./docs/useEnsuredForwardedRef.md) 多状态校验

- Sensors

    - [useBattery](./docs/useBattery.md) 电池

    - [useGeolocation](./docs/useGeolocation.md) 地理位置

    - [useHash](./docs/useHash.md) 管理 hash

    - [useHover](./docs/useHover.md) 管理 ReactElement 的 hover 状态

    - [useHoverDirty](./docs/useHoverDirty.md) 管理 DOM 节点的 hover 状态

    - [useIdle](./docs/useIdle.md) 监听用户空闲状态

    - [useIntersection](./docs/useIntersection.md) 观察元素是否可见

    - [useKey](./docs/useKey.md) 响应用户键盘事件

    - [useKeyPress](./docs/useKeyPress.md) 根据键盘按下抬起返回状态值

    - [useKeyPressEvent](./docs/useKeyPressEvent.md) 根据键盘按下抬起执行回调

    - [useKeyboardJs](./docs/useKeyboardJs.md) 响应键盘组合键

    - [useLocation](./docs/useLocation.md) 获取 location 相关信息

    - [useLongPress](./docs/useLongPress.md) 监听元素长按

    - [useMeasure](./docs/useMeasure.md) 跟踪元素尺寸

    - [useMedia](./docs/useMedia.md) 跟踪 CSS media query

    - [useMediaDevices](./docs/useMediaDevices.md) 跟踪可用的媒体输入和输出设备的列表

    - [useMotion](./docs/useMotion.md) H5 设备运动监听

    - [useMouse](./docs/useMouse.md) 监听鼠标的位置与元素尺寸

    - [useMouseHovered](./docs/useMouseHovered.md) 监听鼠标的位置与元素尺寸

    - [useNetwork](./docs/useNetwork.md) 监听网络状态

    - [useOrientation](./docs/useOrientation.md) 监听设备的纵横方向

    - [usePageLeave](./docs/usePageLeave.md) 响应离开当前页

    - [useScratch](./docs/useScratch.md) 跟踪鼠标/触屏的 scratch 状态

    - [useScroll](./docs/useScroll.md) 监听滚动元素的当前滚动信息

- UI

    - [useAudio](./docs/useAudio.md) 音频

    - [useClickAway](./docs/useClickAway.md) 点击元素外围

    - [useCss](./docs/useCss.md) 动态使用 CSS

    - [useDrop](./docs/useDrop.md) 全局拖拽、粘贴事件响应

    - [useDropArea](./docs/useDropArea.md) 特定元素拖拽、粘贴事件响应

    - [useFullscreen](./docs/useFullscreen.md) 使用全屏

## 心得

- 不能使用 useRef 返回的 ref 作为依赖，因为它的引用始终不变，应使用 ref.current

- 尽可能的灵活 - useAudio

- 不做无用渲染，区分状态应该存储在 useState 还是 useRef - useMountedState

- 对于一些对象参数，如函数，在不希望作为依赖但需要获取最新的引用时，除了保存引用，也可以让使用者传递一个 deps 帮助实时更新 - useKey

- 合理结合优秀的第三方库 - useCookie, useCopyToClipboard, useHarmonicIntervalFn, useIdle

- hook 初始值定义为 InitialHookState 类型 - useCounter

- set 方法相关的参数定义为 HookState 类型 - useCounter

- set 方法除了可以定义为上述 (s: HooState) => void，也可以定义为 Dispatch<SetStateAction\<S>> - useStateValidator

- 当需要返回一个功能对象时，利用 useMemo 对该对象进行缓存，防止用户使用该对象作为 dep 时出现多余无用 render - useCounter

- 巧用高阶函数，将不容易变化的数据作为第一阶的参数，返回一个函数，利用 useMemo 缓存该函数。再将容易变化的数据作为返回函数的参数 - useDrop

- 与其作为钩子函数被使用，更灵活的是返回一个状态，这样的做法可以让状态更灵活的被使用。如开发一个 useDidMount 作为生命周期，更灵活的是开发一个 useIsFirstMount 返回是否为第一次 render，这样除了可以让使用者根据返回值自定义 useEffect 实现 useDidMount，该变量还可以让使用者在更多场景判断是否为第一次挂载 - useFirstMountState, useMountedState

- 对于同一个数据结构，通用的一系列方法可以封装起来，让操作更为便捷又形象 - useList

- 对于操作 DOM 的 hook，除了可以接收 DOM, ref 等参数，也可以向外抛出 useState<HTMLElement | null> 的 setState 作为 ref，让使用者随时可手动挂载在 DOM 的 ref 上，好处在于对于一开始不方便获取 DOM 或 ref 的场景也很适用，不担心获取到空的 element，在挂载 setState 后 hook 内部自动 render，只需在 useEffect 以 state 为依赖挂载事件或操作即可 - useMeasure

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

- createRenderProp: 将 hook 转为 React 组件

```ts
const defaultMapPropsToArgs = <P extends object>(props: P) => [props];

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
```

```tsx
// e.g.
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

// Test 组件
const Test = createRenderProp(useTest, ({ id, name }: ITestProps) => ([id, name]));

function App() {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [isRunning, setIsRunning] = useState(true);

    useInterval(
        () => {
            setCount(count + 1);
        },
        isRunning ? delay : null
    );

    return (
        <div className='app'>
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
    )
}
```

- 利用 [react-universal-interface](https://www.npmjs.com/package/react-universal-interface) 快速创建 render props, FC, Component Prop 的组件

可以参考 [useScratch](https://github.com/streamich/react-use/blob/master/src/useScratch.ts) 的使用方式