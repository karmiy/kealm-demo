## useGetSetState

创建一个接收对象的 [useGetSet](./useGetSet.md)，并且 set 的合并规则如同 **Class Component 的 setState**

### 结构

```ts
import { Dispatch } from 'react';

type InitialHookState<S> = S | (() => S);

type HookState<S> = S | ((prevState: S) => S);

function useGetSetState<T extends object>(
    initialState: T = {} as T
): [() => T, (patch: Partial<T>) => void];
```

### 函数与返回值

- Params:

    - initialState: 初始 state，即类组件 Class Component 的 state，是一个对象

- Return:

    - get: 获取 state 状态，**该函数返回的引用地址不变**

    - set: 设置 state 状态，合并规则同类组件 Class Component 的 setState，**该函数返回的引用地址不变**

### 作用

- 批量管理一些状态，如同类组件 Class Component 的 state 将状态集合在一起，并且 **get 方法总能获得最新的状态**

### 何时使用

- 希望像类组件 Class Component 中的 state 一样，将一些状态全部管理在一起

- 一些相互关联的状态，更适合统一管理

### 应用场景

- 开发一个动画组件，将一系列动画参数（translateX, translateY, transitionDuration, transitionTimingFunction）存放在一个 state 中统一管理，统一给动画元素赋值

### 源码细节

[useGetSetState 源码地址](https://github.com/streamich/react-use/blob/master/src/useGetSetState.ts)

- 以 useRef 为主，useUpdate 为辅实现，useRef 用于保存 state值，useUpdate 负责执行组件 render

- 使用 useMemo 包裹返回的 get set 函数，并且依赖值为 []，保证 get set 引用不变

### 示例

```tsx
function App() {
    const [get, setState] = useGetSetState({
        id: 1,
        code: 10,
        count: 100,
    });

    const onClick = () => {
        setTimeout(() => {
            setState({
                id: get().id + 1,
                code: get().code + 10,
            });
        }, 1000);
    };

    return (
        <div className='app'>
            <p>State: {JSON.stringify(get())}</p>
            <button onClick={onClick}>Clicked</button>
        </div>
    )
}
```
