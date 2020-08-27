## useMethods

简化版的 useReducer

### 结构

```ts
type CreateMethods<M, T> = (
    state: T
) => {
  [P in keyof M]: (payload?: any) => T;
};

type WrappedMethods<M> = {
    [P in keyof M]: (...payload: any) => void;
};

function useMethods<M, T>(
    createMethods: CreateMethods<M, T>,
    initialState: T
): [T, WrappedMethods<M>];
```

### 函数与返回值

- Params:

    - createMethods: 构造方法，用于操作 state，该 hook 将 useReducer 的 action type 作为 methods 的 key

    - initialState: 初始状态

- Return:

    - state: 状态

    - methods: 方法对象，于 createMethods 返回值对应

### 作用

- 简化 useReducer 的 dispatch 派发，将 dispatch(action.type) 简化为 action.type() 的调用

- 简化 useReducer 的 reducer，将长判断 switch 简化为策略模式

### 何时使用

- 希望对 state 的更新操作更为形象化，而不仅仅是 setState 赋值，赋值逻辑以函数的形式被包装

### 应用场景

- 管理一个数字，将 add, subtract 等方法封装起来，抛弃如 setCount(v => v + 1) 的操作

### 源码细节

[useMethods 源码地址](https://github.com/streamich/react-use/blob/master/src/useMethods.ts)

### 示例

```tsx
interface State {
    count: number;
}

const initialState: State = {
    count: 0,
};
  
const createMethods = (state: State) => {
    return {
        reset() {
            return initialState;
        },
        increment() {
            return { ...state, count: state.count + 1 };
        },
        decrement() {
            return { ...state, count: state.count - 1 };
        },
    };
}

function App() {
    const [state, methods] = useMethods(createMethods, initialState);

    return (
        <div className='app'>
            <p>Count: {state.count}</p>
            <button onClick={methods.decrement}>-</button>
            <button onClick={methods.increment}>+</button>
        </div>
    )
}
```
