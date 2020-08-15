## useInterval

将 setInterval 与 hook 结合

### 结构

```ts
function useInterval(
    callback: Function,
    delay?: number | null
): void;
```

### 函数与返回值

- Params:

    - callback: setInterval 的回调函数

    - delay: 定时器间隔，默认 0，传 null 可以关闭 setInterval

### 作用

- 轮询，利用 setInterval 每隔一段时间执行一些操作

### 何时使用

- 需要轮询进行某些操作

### 应用场景

- 页面中的实现倒计时，利用该 hook 每秒更新剩余计时数

### 源码细节

[useInterval 源码地址](https://github.com/streamich/react-use/blob/master/src/useInterval.ts)

- 创建、清除定时器的 useEffect 依赖只与 delay 有关，对于回调，实时存储在 useRef 中，保证定时器执行的回调都是最新的

```tsx
const savedCallback = useRef<Function>(() => {});

useEffect(() => {
    savedCallback.current = callback;
});

// 个人觉得可以给 useEffect 加 callback 的依赖
```

### 示例

```tsx
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
            <div>
                delay: <input value={delay} onChange={event => setDelay(Number(event.target.value))} />
            </div>
            <h1>count: {count}</h1>
            <div>
                <button onClick={() => setIsRunning(v => !v)}>{isRunning ? 'stop' : 'start'}</button>
            </div>
        </div>
    )
}
```
