## useThrottleFn

管理一个状态值，对该状态值的更新操作进行节流

### 结构

```ts
function useThrottleFn<T, U extends any[]>(
    fn: (...args: U) => T,
    ms: number = 200,
    args: U
): T | null;
```

### 函数与返回值

- Params:

    - fn: 节流函数

    - ms: 节流的毫秒数

    - args: 节流函数的参数，也是依赖，变化时执行节流函数

- Return:

    - state: 当前状态，节流函数返回的值

### 作用

- 在状态变化时执行函数，并对该函数进行节流

### 何时使用

- 希望在状态变化时，执行某些操作，但是又希望对操作进行节流

### 应用场景

- 监听鼠标滑动，节流更新当前鼠标坐标值

### 源码细节

[useThrottleFn 源码地址](https://github.com/streamich/react-use/blob/master/src/useThrottleFn.ts)

### 更多看法

个人认为该 hook 更偏向于 effect 响应形式

- 简单方便，根据依赖值变化响应函数的执行

- 但是灵活性不高，更好的做法可能是返回一个引用不变的函数 throttleFn，由用户在需要的场景在手动执行 throttleFn()，这样在场景适用将更为广泛

- 缺少可配置项，如第一次执行是否立即响应

- 该 hook 与防抖 hook 名称不匹配，根据效果，对应的是 useDebounce，正确的做法应该是将 useDebounce 改为 useDebounceFn

### 示例

```tsx
function App() {
    const [left, setLeft] = useState(0);
    const [clientX, setClientX] = useState(0);

    useThrottleFn(
        setLeft,
        16,
        [clientX]
    );

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setClientX(e.clientX);
        }

        document.addEventListener('mousemove', mouseMove);

        return () => document.removeEventListener('mousemove', mouseMove);
    }, []);

    return (
        <div className='app'>
            <div style={{
                position: 'absolute',
                width: 100,
                height: 100,
                left,
                backgroundColor: '#1394ff',
            }} />
        </div>
    )
}
```
