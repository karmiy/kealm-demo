## useGetSet

创建返回 get set 函数的 useState 

### 结构

```ts
import { Dispatch } from 'react';

type InitialHookState<S> = S | (() => S);

type HookState<S> = S | ((prevState: S) => S);

function useGetSet<S>(
    initialState: InitialHookState<S>
): [() => S, Dispatch<HookState<S>>];
```

### 函数与返回值

- Params:

    - initialState: 初始 state，同 useState

- Return:

    - get: 获取 state 值，**该函数返回的引用地址不变**

    - set: 设置 state 值，同 useState，**该函数返回的引用地址不变**

### 作用

- 创建一个返回 get set 的 useState，并且 **get 方法总能获得最新的值**

### 何时使用

- useState 返回的 state 在使用时不希望作为依赖，但是又想在 useCallback 或 useMemo 中获取最新的 state 值

### 应用场景

- 自定义 hook，希望返回一个 useCallback 的函数，该方法**依赖项为 []**，即引用不变，但是由于函数中使用了状态，在希望可以获取最新状态又不希望让状态作为依赖时，useGetSet 很有用

### 源码细节

[useGetSet 源码地址](https://github.com/streamich/react-use/blob/master/src/useGetSet.ts)

- 以 useRef 为主，useUpdate 为辅实现，useRef 用于保存 state值，useUpdate 负责执行组件 render

- 使用 useMemo 包裹返回的 get set 函数，并且依赖值为 []，保证 get set 引用不变

### 示例

```tsx
function App() {
    const [get, set] = useGetSet(0);
    const onClick = () => {
        setTimeout(() => {
            set(get() + 1)
        }, 1000);
    };

    return (
        <div className='app'>
            <button onClick={onClick}>Clicked: {get()}</button>
        </div>
    )
}
```
