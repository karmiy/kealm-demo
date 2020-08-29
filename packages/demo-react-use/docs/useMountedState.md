## useMountedState

获取组件是否挂载的状态

### 结构

```ts
function useMountedState(): () => boolean;
```

### 函数与返回值

- Return:

    - get: 函数，返回组件当前是否挂载完成

### 作用

- 获取组件当前是否挂载完成

### 何时使用

- 希望在函数中获取到该组件是否已挂载的状态

- 不希望将组件是否已挂载的状态作为一个依赖

### 应用场景

- 发起请求前，判断组件是否已挂载，未挂载则取消请求，防止组件已卸载，请求后 setState 执行报错

### 源码细节

[useMountedState 源码地址](https://github.com/streamich/react-use/blob/master/src/useMountedState.ts)

- 利用 useRef 存储状态，而不是 useState，这样的做法很细节，因为挂载状态的获取如果以 get 函数的形式，在变化时是不需要驱动组件 render 的，get 的返回值总是最新的

```tsx
const mountedRef = useRef<boolean>(false);
```

- 在组件卸载后将状态赋为 false，这在请求前判断是否组件已卸载非常有用

```tsx
useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
});
```

- 返回的 get 返回引用始终不变，使用者不需要将其作为依赖，减少不必要的性能消耗

```tsx
const get = useCallback(() => mountedRef.current, []);
```

### 示例

```tsx
function App() {
    const isMounted = useMountedState();

    useEffect(() => {
        setTimeout(() => {
            if (isMounted()) {
                // ...
            } else {
                // ...
            }
        }, 1000);
    });

    return (
        <div className='app'>
            ...
        </div>
    )
}
```
