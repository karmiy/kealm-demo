## usePreviousDistinct

同 usePrevious，区别在于：

- usePrevious 在于获取**前一次 render 时**的状态，即时上一次 render 时该 state 没有变化也会更新

- usePreviousDistinct 在于获取该 state 确切的前一次状态

### 结构

```ts
type Predicate<T> = (prev: T | undefined, next: T) => boolean;

const strictEquals = <T>(prev: T | undefined, next: T) => prev === next;

function usePreviousDistinct<T>(
    state: T,
    compare: Predicate<T> = strictEquals
): T | undefined;
```

### 函数与返回值

- Params:

    - state: 需要被管理的状态

    - compare: 自定义比较器，返回 false 则更新 prevState

- Return:

    - prevState: 前一次 render 时的状态

### 作用

- 管理一个状态，并始终保留其前一次变更前的状态

### 何时使用

- 希望获取一个数据变更前的状态

### 应用场景

- 根据场景功能判断，如某些业务，需要做到这样的效果：如果之前订单状态是 A，则发起 XX 请求，如果之前状态是 B，则更新 YYY

### 源码细节

[usePreviousDistinct 源码地址](https://github.com/streamich/react-use/blob/master/src/usePreviousDistinct.ts)

### 示例

```tsx
function App() {
    const [count, setCount] = useState(0);
    const [unrelatedCount, setUnrelatedCount] = useState(0);
    const prevCount = usePreviousDistinct(count);

    return (
        <div className='app'>
            Now: {count}, before: {prevCount}
            <button onClick={() => setCount(count + 1)}>Increment</button>
            Unrelated: {unrelatedCount}
            <button onClick={() => setUnrelatedCount(unrelatedCount + 1)}>Increment Unrelated</button>
        </div>
    )
}
```
