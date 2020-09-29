## useThrottle

管理一个状态值，对该状态值的更新操作进行节流

### 结构

```ts
function useThrottle<T>(
    value: T,
    ms: number = 200
): T;
```

### 函数与返回值

- Params:

    - value: 需要节流管理的状态

    - ms: 节流的毫秒数

- Return:

    - throttledValue: 当前状态

### 作用

- 管理一个状态，对该状态的赋值操作进行节流

### 何时使用

- 希望对一个状态值更新进行节流控制

### 应用场景

- 监听页面滚动，对记录当前 scrollTop 的操作进行节流

### 源码细节

[useThrottle 源码地址](https://github.com/streamich/react-use/blob/master/src/useThrottle.ts)

### 示例

```tsx
function App() {
    const [value, setValue] = useState(0);
    const throttledValue = useThrottle(value, 500);

    return (
        <div className='app'>
            {throttledValue}
            <button onClick={() => setValue(v => v + 1)}>Add</button>
        </div>
    )
}
```
