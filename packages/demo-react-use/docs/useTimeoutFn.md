## useTimeoutFn

初始化时（ms 变化也会）延迟一段时间后执行函数，并可手动获取当前函数是否已执行、手动请求、手动延迟调用

### 结构

```ts
type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];

function useTimeoutFn<T, U extends any[]>(
    fn: Function,
    ms: number = 0
): UseTimeoutFnReturn;
```

### 函数与返回值

- Params:

    - fn: 延迟后要执行的函数

    - ms: 延迟毫秒数

- Return:

    - isReady: 函数，执行后返回是否 fn 执行完毕（该函数引用不变）

    - clear: 函数，执行后清除 setTimeout 定时器（该函数引用不变）

    - set: 函数，执行后开启 setTimeout 定时器延迟后执行 fn，即用于手动调用的方法

### 作用

- 初始化时延迟执行函数，并可手动获取当前函数是否已执行、手动请求、手动延迟调用

### 何时使用

- 希望在组件初始化延迟执行某些操作

- 希望延迟执行的操作可控可清除，可手动触发

### 应用场景

- 实现动画效果进入页面延迟一段时间再执行某些操作，防止在动画完成前先执行产生交互错误，确保在动画完成后执行

### 源码细节

[useTimeoutFn 源码地址](https://github.com/streamich/react-use/blob/master/src/useTimeoutFn.ts)

### 更多看法

- 可以让 ms 可传 null，表示初始调用不自动执行，方便某些场景手动延迟调用

- 该 hook 不支持多个定时器，在需要同时触发多个定时器的场景并不适用，需要使用多次该 hook，因为新的定时器会清除前一次

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
