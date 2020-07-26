## useDebounce

hook 形式的 debounce 防抖

### 结构

```ts
import { DependencyList } from 'react';

export type UseDebounceReturn = [() => boolean | null, () => void];

function useDebounce(
    fn: Function,
    ms: number,
    deps: DependencyList
): UseDebounceReturn;
```

### 函数与返回值

- Params:

    - fn: 防抖函数

    - ms: 防抖毫秒数

    - deps: 依赖项，依赖变化时执行防抖函数

- Return:

    - isReady: 函数，返回是否在执行完毕
    
    - cancel: 函数，执行后取消正在 setTimeout 的待执行任务

### 作用

- 对某个函数的执行进行延迟和防抖

### 何时使用

- 需要执行的函数可延迟执行，希望多次执行有防抖效果

### 应用场景

- 输入框 input 联想查询，在输入的过程中对用户输入的值进行联想查询，防止连续快速输入造成重复多次请求

### 源码细节

[useDebounce 源码地址](https://github.com/streamich/react-use/blob/master/src/useDebounce.ts)

- 以 useTimeoutFn 为核心实现，以 deps 作为 useEffect 的依赖，变化时执行 reset 操作实现依赖变化时执行防抖函数

### 更多看法

个人认为该 hook 更偏向于 effect 响应形式

- 简单方便，根据依赖值变化响应函数的执行

- 但是灵活性不高，更好的做法可能是返回一个引用不变的函数 debounceFn，由用户在需要的场景在手动执行 debounceFn()，这样在场景适用将更为广泛

- 缺少可配置项，如第一次执行是否立即响应

### 示例

```tsx
function App() {
    const [state, setState] = React.useState('Typing stopped');
    const [val, setVal] = React.useState('');

    const [isReady, cancel] = useDebounce(
        () => {
            setState('Typing stopped');
            // 发起请求
            console.log('start request');
        },
        2000,
        [val]
    );

    return (
        <div className='app'>
            <input
                type="text"
                value={val}
                placeholder="Debounced input"
                onChange={({ currentTarget }) => {
                    setState('Waiting for typing to stop...');
                    setVal(currentTarget.value);
                }}
            />
            <div>{state}</div>
            <div>isReady: {String(isReady())}</div>
            <button onClick={cancel}>Cancel debounce</button>
        </div>
    )
}
```
