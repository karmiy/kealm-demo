## useSessionStorage

管理 sessionStorage

### 结构

```ts
function useSessionStorage<T>(
    key: string, 
    initialValue?: T, 
    raw?: boolean
): [T, (value: T) => void];
```

### 函数与返回值

- Params:

    - key: 存储到 sessionStorage 的键

    - initialValue: 存储到 sessionStorage 的初始值，注意如果原本该 key 下已有缓存，则这个初始值无效

    - raw: 如果为 false，hook 将使用 JON.stringify 或 parse 来做序列化与反序列化

- Return:

    - value: 当前缓存值

    - setValue: 设置新缓存值

### 作用

- 管理 sessionStorage，且不需要关注序列化问题

### 何时使用

- 希望方便的管理与操作 sessionStorage

### 应用场景

- 与 sessionStorage 有关的任何场景

### 源码细节

[useSessionStorage 源码地址](https://github.com/streamich/react-use/blob/master/src/useSessionStorage.ts)

- 利用 try catch 包裹初始化赋值，确保异常状况，考虑周全

### 示例

```tsx
function App() {
    const [value, setValue] = useSessionStorage('my-key', 'foo');

    return (
        <div className='app'>
            <div>Value: {value}</div>
            <button onClick={() => setValue('bar')}>bar</button>
            <button onClick={() => setValue('baz')}>baz</button>
        </div>
    )
}
```
