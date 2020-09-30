## useTimeout

初始化时（ms 变化也会）创建一个定时器，返回当前定时器是否已完成的状态，并可手动清除、手动重置定时器

### 结构

```ts
type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];

function useTimeout<T, U extends any[]>(
    ms: number = 0
): UseTimeoutFnReturn;
```

### 函数与返回值

- Params:

    - ms: 延迟毫秒数

- Return:

    - isReady: 函数，执行后返回是否定时器执行完毕（该函数引用不变）

    - clear: 函数，执行后清除 setTimeout 定时器（该函数引用不变）

    - set: 函数，执行后手动开启定时器

### 作用

- 初始化时开启一个定时器并获取定时器执行状态

### 何时使用

- 希望在组件初始化开启一个定时器，并获取其执行状态，将其作为依赖，在状态变更时执行某些行为

### 应用场景

- 动画效果进入页面，许多操作希望在动画结束后才执行，此时可开启相对动画执行时间的定时器，将动画结束后的操作拆分为一个个 useEffect，并将定时器是否完成作为依赖，实现动画结束后执行许多需要的操作，且不需要把这些操作耦合在一个函数里

### 源码细节

[useTimeout 源码地址](https://github.com/streamich/react-use/blob/master/src/useTimeout.ts)

- 利用 useTimeoutFn 配合 useUpdate 轻松实现

```tsx
const update = useUpdate();

return useTimeoutFn(update, ms);
```

### 更多看法

- 个人认为该 useTimeout 的实际作用并不大，一般执行延迟操作在组件初始化的场景并不多，更多的是在操作途中

- 实现一个返回 setTimer(fn: Function, ms: number, name?: string), clearTimer(name: string) 的 hook 对于使用而言应该会更方便

### 示例

```tsx
function TestComponent(props: { ms?: number } = {}) {
    const ms = props.ms || 5000;
    const [isReady, cancel] = useTimeout(ms);
  
    return (
        <div>
            { isReady() ? 'I\'m reloaded after timeout' : `I will be reloaded after ${ ms / 1000 }s` }
            { isReady() === false ? <button onClick={ cancel }>Cancel</button> : '' }
        </div>
    );
}

function App() {
    return (
        <div className='app'>
            <TestComponent />
            <TestComponent ms={ 2000 } />
        </div>
    )
}
```
