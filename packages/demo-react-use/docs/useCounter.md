## useCounter

管理与跟踪一个 number 值

### 结构

```ts
export type StateSetter<S> = (prevState: S) => S;
export type InitialStateSetter<S> = () => S;

export type InitialHookState<S> = S | InitialStateSetter<S>;
export type HookState<S> = S | StateSetter<S>;

export interface CounterActions {
    inc: (delta?: number) => void;
    dec: (delta?: number) => void;
    get: () => number;
    set: (value: HookState<number>) => void;
    reset: (value?: HookState<number>) => void;
}

function useCounter(
    initialValue: InitialHookState<number>,
    max: number | null,
    min: number | null,
): [number, CounterActions];
```

### 函数与返回值

- Params:

    - initialValue: 初始数值

    - max: 最大数值

    - min: 最小数值

- Return:

    - value: 当前数值
    
    - counterAction: 计数器对象，用于手动控制数值变化

        - inc: 累加一个数值

        - dec: 减去一个数值

        - get: 获取当前值

        - set: 赋值

        - reset: 赋值，并重置初始值


### 作用

- 管理一个数值

### 何时使用

- 组件中需要对一个数值进行管理和操作时

### 应用场景

- 开发计数器组件

- 任何需要一个数字并控制管理的场景

### 源码细节

[useCounter 源码地址](https://github.com/streamich/react-use/blob/master/src/useCounter.ts)

- 初始值 initialValue 定义为 InitialHookState 类型，既可以传递 number，也可以传递 () => number，贴合 React.useState 的方式

- set 方法接收 HookState 类型，可以传递 number, () => number, (prev) => number，贴合 React.useState 的方式

- 内置一个 [resolveHookState](../README.md#Utils工具) 函数转换 newState 与 prevState

```tsx
let init = resolveHookState(initialValue);

let rState = resolveHookState(newState, prevState);
```

- 使用 useMemo 包裹返回值 counterAction 对象，保证用户使用 counterAction 作为 dep 时少做无用 render

- **reset 配合 useMemo 的闭包实现**，原理在于: 由于 useMemo 缓存了 init，reset(x) 后，对 init 的赋值是对当前闭包下的的 init 进行赋值的，而外层 useMemo 外的 init 一直都是 hooks 初始化时的初始值，不会导致 useMemo 返回的对象更新，所以 reset 更新了闭包内的 init 可以对后续 reset() 重置有效

### 示例

```tsx
function App() {
    const [min, { inc: incMin, dec: decMin }] = useCounter(1);
    const [max, { inc: incMax, dec: decMax }] = useCounter(10);
    const [value, { inc, dec, set, reset }] = useCounter(5, max, min);

    return (
        <div className='app'>
            <div>
                current: { value } [min: { min }; max: { max }]
            </div>

            <br />
            Current value: <button onClick={ () => inc() }>Increment</button>
            <button onClick={ () => dec() }>Decrement</button>
            <button onClick={ () => inc(5) }>Increment (+5)</button>
            <button onClick={ () => dec(5) }>Decrement (-5)</button>
            <button onClick={ () => set(100) }>Set 100</button>
            <button onClick={ () => reset() }>Reset</button>
            <button onClick={ () => reset(25) }>Reset (25)</button>

            <br />
            <br />
            Min value:
            <button onClick={ () => incMin() }>Increment</button>
            <button onClick={ () => decMin() }>Decrement</button>

            <br />
            <br />
            Max value:
            <button onClick={ () => incMax() }>Increment</button>
            <button onClick={ () => decMax() }>Decrement</button>
        </div>
    )
}
```
