## useUnmount

在组件卸载时调用，相当于 class Component 的 componentWillUnmount

### 结构

```ts
function useUnmount(
    fn: () => any
): void;
```

### 函数与返回值

- Params:

    - fn: 组件卸载时执行的函数

### 作用

- 在组件卸载时执行某些操作

### 何时使用

- 希望在组件卸载时执行某些操作

### 应用场景

- 在组件卸载时取消 document 上绑定的 event

### 源码细节

[useUnmount 源码地址](https://github.com/streamich/react-use/blob/master/src/useUnmount.ts)

- 实时保存 fn

```tsx
const fnRef = useRef(fn);

// update the ref each render so if it change the newest callback will be invoked
fnRef.current = fn;
```

### 示例

```tsx
function App() {
    useUnmount(() => console.log('UNMOUNTED'));

    return (
        <div className='app'>
            ...
        </div>
    )
}
```
