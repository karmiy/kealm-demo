## useMount

调用同 useEffectOnce（其实内部就是调用 useEffectOnce），组件初始执行一次的 useEffect，相当于异步的 componentDidMount（称其异步，因为内部使用的是 useEffect 而不是 useLayoutEffect）

与 useEffectOnce 的区别在于：

- useEffectOnce 的返回值有效，可用于组件卸载

- useMount 的返回值无效，useMount 明确在于组件初始挂载，不关心卸载

### 结构

```ts
function useMount(fn: () => void): void;
```

### 函数与返回值

- Params:

    - fn: 组件初始化回调

### 作用

- 在组件初始化时执行操作

### 何时使用

- 希望在组件初始化时执行某些操作

### 应用场景

- 在组件初始化时执行某些 DOM 操作

### 源码细节

[useMount 源码地址](https://github.com/streamich/react-use/blob/master/src/useMount.ts)

### 示例

```tsx
function App() {
    useMount(() => {
        console.log('mounted');
    });

    return (
        <div className='app'>
            ...
        </div>
    )
}
```
