## useList

更交互式的管理数组

通常使用 useState 存储一个数据，只能在 set 时手动根据需求进行操作（push 等），而直接调用 arr.push 等方法并不能触发组件 render 更新

useList 则是在管理数组的同时，提供给我们 push, updateAt 等一系列方法，让我们在操作这个数组时更方便

### 结构

```ts
interface ListActions<T> {
    /**
     * @description 赋新值
     */
    set: (newList: ResolvableHookState<T[]>) => void;
    /**
     * @description push 新的项
     */
    push: (...items: T[]) => void;

    /**
     * @description 更新指定位置的项
     */
    updateAt: (index: number, item: T) => void;
    /**
     * @description 插入项到指定位置，如果位置超过数组长度，则给指定位置赋值
     */
    insertAt: (index: number, item: T) => void;

    /**
     * @description 遍历全部项，对 predicate 返回 true 做更新
     */
    update: (predicate: (a: T, b: T) => boolean, newItem: T) => void;
    /**
     * @description 遍历全部项，直到 predicate 返回 true 的第一项，对其进行更新
     */
    updateFirst: (predicate: (a: T, b: T) => boolean, newItem: T) => void;
    /**
     * @description 和 updateFirst 类似，遍历全部项，直到 predicate 返回 true 的第一项，如果有该项，则更新，否则插入到数组最后
     */
    upsert: (predicate: (a: T, b: T) => boolean, newItem: T) => void;

    /**
     * @description 排序
     */
    sort: (compareFn?: (a: T, b: T) => number) => void;
    /**
     * @description 过滤
     */
    filter: (callbackFn: (value: T, index?: number, array?: T[]) => boolean, thisArg?: any) => void;

    /**
     * @description 移除指定位置的项
     */
    removeAt: (index: number) => void;

    /**
     * @description 清空数组
     */
    clear: () => void;
    /**
     * @description 重置为初始值
     */
    reset: () => void;
}

type InitialHookState<S> = S | (() => S);

function useList<T>(
    initialList: InitialHookState<T[]> = [];
): [T[], ListActions<T>];
```

### 函数与返回值

- Params:

    - initialList: 初始数组

- Return:

    - list: 数组列表

    - action: 对象，拥有一系列操作数组的方法

### 作用

- 管理一个数组，并让使用者可以像调用数组方法那样操作更新

### 何时使用

- 希望用 useState 存储管理一个数组，但是希望更交互式的操作它，而不是单单 set 手动操作

### 应用场景

- 使用数组并需要对它进行添加删除等操作的任何场景

### 源码细节

[useList 源码地址](https://github.com/streamich/react-use/blob/master/src/useList.ts)

- 利用 useRef 保存数组，useUpdate 驱动组件更新，保证返回的 action 是**无依赖的**

```tsx
const list = useRef(resolveHookState(initialList));
const update = useUpdate();

const actions = useMemo<ListActions<T>>(() => {
    // ...
}, []);
```

### 示例

```tsx
function App() {
    const [list, { set, push, updateAt, insertAt, update, updateFirst, upsert, sort, filter, removeAt, clear, reset }] = useList([1, 2, 3, 4, 5]);

    return (
        <div className='app'>
            <button onClick={() => set([1, 2, 3])}>Set to [1, 2, 3]</button>
            <button onClick={() => push(Date.now())}>Push timestamp</button>
            <button onClick={() => updateAt(1, Date.now())}>Update value at index 1</button>
            <button onClick={() => remove(1)}>Remove element at index 1</button>
            <button onClick={() => filter(item => item % 2 === 0)}>Filter even values</button>
            <button onClick={() => sort((a, b) => a - b)}>Sort ascending</button>
            <button onClick={() => sort((a, b) => b - a)}>Sort descending</button>
            <button onClick={clear}>Clear</button>
            <button onClick={reset}>Reset</button>
            <pre>{JSON.stringify(list, null, 2)}</pre>
        </div>
    )
}
```
