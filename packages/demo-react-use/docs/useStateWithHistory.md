## useStateWithHistory

管理一个状态的历史堆，并提供前进、回退等功能

### 结构

```ts
type StateSetter<S> = (prevState: S) => S;

type InitialStateSetter<S> = () => S;

type InitialHookState<S> = S | InitialStateSetter<S>;

type ResolvableHookState<S> = S | StateSetter<S> | InitialStateSetter<S>;

interface HistoryState<S> {
    history: S[];
    position: number;
    capacity: number;
    back: (amount?: number) => void;
    forward: (amount?: number) => void;
    go: (position: number) => void;
}

type UseStateHistoryReturn<S> = [S, React.Dispatch<ResolvableHookState<S>>, HistoryState<S>];

function useStateWithHistory<S, I extends S>(
    initialState?: InitialHookState<S>,
    capacity: number = 10,
    initialHistory?: I[]
): UseStateHistoryReturn<S>;
```

### 函数与返回值

- Params:

    - initialState: 初始状态

    - capacity: 容量，历史堆里最多能存储的历史状态数量的最大值

    - initialHistory: 初始历史堆数据

- Return:

    - state: 当前状态

    - setState: 赋值函数（按理应该是同 useState 返回的 set，该 hook 代码似乎有问题，导致该函数不接受 (prevState) => newState 的参数）

    - stateHistory: 历史状态对象

        - history: 当前历史堆数据

        - position: 当前状态在历史堆里的位置

        - capacity: 容量

        - back: 回退 x 格

        - forward: 前进 x 格

        - go: 指定跳到历史堆数据的第几个，可以是负数

### 作用

- 管理一个 state 的历史变化堆，并方便的回到某个时刻

### 何时使用

- 希望存储一个 state 是历史变化，并可能有前进回退操作

### 应用场景

- 判断一个 state 是否曾经处于某个状态值过

- 任何需要记录状态变更的场景

- 任何需要对状态进行回退等操作的场景

### 源码细节

[useStateWithHistory 源码地址](https://github.com/streamich/react-use/blob/master/src/useStateWithHistory.ts)

### 示例

```tsx
function App() {
    const [state, setState, stateHistory] = useStateWithHistory(10);

    return (
        <div className='app'>
            <p>state: {state}</p>
            <p>stateHistory: {stateHistory.history.join(',')}</p>
            <p>position: {stateHistory.position}</p>
            <button onClick={() => setState(state + 1)}>Add</button>
            <button onClick={() => stateHistory.go(2)}>Go index 2</button>
            <button onClick={() => stateHistory.back(1)}>Back index 1</button>
            <button onClick={() => stateHistory.forward(1)}>Forward index 1</button>
        </div>
    )
}
```
