## useQueue

管理 FIFO 先进先出队列

### 结构

```ts
interface QueueMethods<T> {
    add: (item: T) => void;
    remove: () => T;
    first: T;
    last: T;
    size: number;
}

function useQueue<T>(
    initialValue: T[] = []
): QueueMethods<T>;
```

### 函数与返回值

- Params:

    - initialValue: 初始队列

- Return:

    - methods: 队列及一系列操作方法

### 作用

- 管理一个 FIFO 队列

### 何时使用

- 希望以 FIFO 的形式管理一个数组

### 应用场景

- 开发 keep-alive 组件，将虚拟 DOM 缓存在队列中，并提供最大存储量的配置项，当缓存数超额时遵循 FIFO 移除旧缓存

### 源码细节

[useQueue 源码地址](https://github.com/streamich/react-use/blob/master/src/useQueue.ts)

### 示例

```tsx
function App() {
    const { add, remove, first, last, size } = useQueue<number>();

    return (
        <div className='app'>
            <ul>
                <li>first: {first}</li>
                <li>last: {last}</li>
                <li>size: {size}</li>
            </ul>
            <button onClick={() => add((last || 0) + 1)}>Add</button>
            <button onClick={() => remove()}>Remove</button>
        </div>
    )
}
```
