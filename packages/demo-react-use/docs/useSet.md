## useSet

管理 ES6 Set 集合，并更交互式的操作它

### 结构

```ts
interface StableActions<K> {
    add: (key: K) => void; // 添加
    remove: (key: K) => void; // 删除
    toggle: (key: K) => void; // 切换
    reset: () => void; // 重置回 initialSet
}

interface Actions<K> extends StableActions<K> {
    has: (key: K) => boolean; // 是否存在
}

function useSet<K>(
    initialSet = new Set<K>()
): [Set<K>, Actions<K>];
```

### 函数与返回值

- Params:

    - initialSet: 初始 Set 实例

- Return:

    - methods: 一系列工具方法

### 作用

- 管理 Set 集合，并提供一系列交互式的便捷方法

### 何时使用

- 希望管理 Set 集合，并方便的去操作它

### 应用场景

- 与 Set 有关的任何场景

### 源码细节

[useSet 源码地址](https://github.com/streamich/react-use/blob/master/src/useSet.ts)

### 示例

```tsx
function App() {
    const [set, { add, has, remove, toggle, reset }] = useSet(new Set(['hello']));

    return (
        <div className='app'>
            <button onClick={() => add(String(Date.now()))}>Add</button>
            <button onClick={() => reset()}>Reset</button>
            <button onClick={() => remove('hello')} disabled={!has('hello')}>
                Remove hello
            </button>
            <button onClick={() => toggle('hello')}>Toggle hello</button>
            <pre>{JSON.stringify(Array.from(set), null, 2)}</pre>
        </div>
    )
}
```
