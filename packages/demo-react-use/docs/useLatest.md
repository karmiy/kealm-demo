## useLatest

总是获取最新的值，很适合做状态存储

### 结构

```ts
function useLatest<T>(
    value: T;
): { readonly current: T };
```

### 函数与返回值

- Params:

    - value: 需要保存的值

- Return:

    - latest: 即一个 MutableRefObject，通过 .current 获取最新的值

### 作用

- 保存一个值，让使用者始终能拿到最新的值

### 何时使用

- 当不希望将一个值作为依赖，但是又希望在 useMemo, useCallback, useEffect 内部拿到最新的值

- 在定时器里使用某个值，但是不希望因为闭包，导致获取的不是最新的值而是当前闭包下的值

### 应用场景

- 自定义 hook，希望抛出没有任何依赖的 useCallback 函数，而函数中使用了外部 state，没有作为依赖无法获取最新值，即可使用 useLatest 存储状态值

- 定时器里操作某个状态值，但由于闭包，只能获取到当前闭包下的值，即可使用 useLastest 存储状态在定时器里获取

### 源码细节

[useLastest 源码地址](https://github.com/streamich/react-use/blob/master/src/useLastest.ts)

- 利用 useRef 始终同步保存新值

```tsx
const ref = useRef(value);
ref.current = value;
```

### 示例

```tsx
function App() {
    const [count, setCount] = useState(0);
    const latestCount = useLatest(count);

    const handleAlertClick = () => {
        setTimeout(() => {
            console.log(`Latest count value: ${latestCount.current}`);
        }, 3000);
    };

    return (
        <div className='app'>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <button onClick={handleAlertClick}>Show alert</button>
        </div>
    )
}
```
