## useHash

获取并操作页面 hash 值

### 结构

```ts
function useHash(): [string, (newHash: string) => void];
```

### 函数与返回值

- Return:

    - hash: hash 值

    - setHash: 设置 hash 值

### 作用

- 管理页面 url 的 hash 值

### 何时使用

- 希望管理 hash 变化

### 应用场景

- 封装 Hash Router 组件

### 源码细节

[useHash 源码地址](https://github.com/streamich/react-use/blob/master/src/useHash.ts)

### 示例

```tsx
function App() {
    const [hash, setHash] = useHash();

    return (
        <div className='app'>
            <div>window.location.href:</div>
            <div>
                <pre>{window.location.href}</pre>
            </div>
            <div>Edit hash: </div>
            <div>
                <input style={{ width: '100%' }} value={hash} onChange={e => setHash(e.target.value)} />
            </div>
        </div>
    )
}
```
