## useStateList

管理一个状态数组列表，控制当前指向，即数组下标 next, prev, set 更新

### 结构

```ts
interface UseStateListReturn<T> {
    state: T;
    currentIndex: number;
    setStateAt: (newIndex: number) => void;
    setState: (state: T) => void;
    next: () => void;
    prev: () => void;
}

function useStateList<T>(
    stateSet: T[] = []
): UseStateListReturn<T>;
```

### 函数与返回值

- Params:

    - stateSet: 状态列表

- Return:

    - state: 当前选中的状态

    - currentIndex: 当前数组下标

    - setStateAt: 更新当前下标

    - setState: 指定当前选中项

    - next: 指向下一项，已是最后项则指向第一项

    - prev: 指向前一项，已是第一项则指向最后一项

### 作用

- 管理数组列表，控制当前下标指向

### 何时使用

- 希望操作一个数组列表，管理并控制当前下标指向

### 应用场景

- 开发 tab 选项卡组件，管理当前 tab 下标与点击时下标切换

### 源码细节

[useStateList 源码地址](https://github.com/streamich/react-use/blob/master/src/useStateList.ts)

- 对于 next, prev 方法考虑了超出的临界问题

- 对于 set 方法考虑到了不存在与负数问题

### 示例

```tsx
const stateSet = ['first', 'second', 'third', 'fourth', 'fifth'];

function App() {
    const { state, prev, next, setStateAt, setState, currentIndex } = useStateList(stateSet);
    const indexInput = useRef<HTMLInputElement>(null);
    const stateInput = useRef<HTMLInputElement>(null);

    return (
        <div className='app'>
            <pre>
                {state} [index: {currentIndex}]
            </pre>
            <button onClick={() => prev()}>prev</button>
            <br />
            <button onClick={() => next()}>next</button>
            <br />
            <input type="text" ref={indexInput} style={{ width: 120 }} />
            <button onClick={() => setStateAt((indexInput.current!.value as unknown) as number)}>set state by index</button>
            <br />
            <input type="text" ref={stateInput} style={{ width: 120 }} />
            <button onClick={() => setState(stateInput.current!.value)}> set state by value</button>
        </div>
    )
}
```
