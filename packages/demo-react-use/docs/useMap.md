## useMap

管理对象，对其进行属性修改、移除、赋值、重置操作

> useMap 并不是管理一个 Map，只是个 object，不解为何取此名

### 结构

```ts
interface StableActions<T extends object> {
    set: <K extends keyof T>(key: K, value: T[K]) => void;
    setAll: (newMap: T) => void;
    remove: <K extends keyof T>(key: K) => void;
    reset: () => void;
}
interface Actions<T extends object> extends StableActions<T> {
    get: <K extends keyof T>(key: K) => T[K];
}

function useLongPress<T extends object = any>(
    initialMap: T = {} as T
): [T, Actions<T>];
```

### 函数与返回值

- Params:

    - initialMap: 初始对象

- Return:

    - map: 当前对象

    - utils:

        - set: 为对象某个属性赋值

        - setAll: 为整个对象赋值

        - remove: 移除对象某个属性

        - reset: 重置对象回初始值

        - get: 获取对象某个属性值

### 作用

- 管理对象，操作更为交互式

### 何时使用

- 希望对一个对象进行管理，对其有赋值，获取值等等操作，希望这些操作更交互式

### 应用场景

- 操作对象的任何场景

### 源码细节

[useMap 源码地址](https://github.com/streamich/react-use/blob/master/src/useMap.ts)

### 示例

```tsx
function App() {
    const [map, {set, setAll, remove, reset}] = useMap<{[key: string]: any}>({
        hello: 'there',
    });

    return (
        <div className='app'>
            <button onClick={() => set(String(Date.now()), new Date().toJSON())}>
                Add
            </button>
            <button onClick={() => reset()}>
                Reset
            </button>
            <button onClick={() => setAll({ hello: 'new', data: 'data' })}>
                Set new data
            </button>
            <button onClick={() => remove('hello')} disabled={!map.hello}>
                Remove hello
            </button>
            <pre>{JSON.stringify(map, null, 2)}</pre>
        </div>
    )
}
```
