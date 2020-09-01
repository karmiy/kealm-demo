## usePrevious

获取前一次 render 时的状态

### 结构

```ts
function usePrevious<T>(
    state: T
): T | undefined;
```

### 函数与返回值

- Params:

    - state: 需要被管理的状态

- Return:

    - prevState: 前一次 render 时的状态

### 作用

- 管理一个状态，使得每次可以保留并获得其在前一次 render 时的状态

### 何时使用

- 希望获取一个数据在前一次 render 时的状态

### 应用场景

- 开发动画组件，根据当前 state 和 prevState 判断动画接下来的走向执行相关操作

### 源码细节

[usePrevious 源码地址](https://github.com/streamich/react-use/blob/master/src/usePrevious.ts)

- 利用 useRef 保存前一次状态，在 useEffect 中更新，且 useEffect 的依赖为 undefined 而不是 \[state]，确保拿到的是前一次 render 的状态，而不仅仅是该状态的一次变更

```tsx
useEffect(() => {
    ref.current = state
});
```

### 示例

```tsx
function App() {
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);

    return (
        <div className='app'>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
            <p>
                Now: {count}, before: {prevCount}
            </p>
        </div>
    )
}
```
