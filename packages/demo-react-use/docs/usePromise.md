## usePromise

返回一个帮助函数用于包装 promise 对象，该 promise 对象只有在组件未卸载时会 resolve 或 reject 通过

### 结构

```ts
function usePromise(): <T>(promise: Promise<T>) => Promise<T>;
```

### 函数与返回值

- Return:

    - mounted: 函数，接收一个 promise 对象，只有在组件未卸载时才会让其通过

### 作用

- 包装 promise 对象，禁止其在组件卸载时可通过，导致代码继续往下执行到 setState 引起报错

### 何时使用

- 希望防止在请求过程中，组件卸载导致请求响应后执行 setState 相关操作造成组件报错

### 应用场景

- fetch 请求服务端 API，使用该 hook 包裹请求，防止请求过程中组件卸载导致返回后跟新状态出现报错

### 源码细节

[usePromise 源码地址](https://github.com/streamich/react-use/blob/master/src/usePromise.ts)

### 示例

```tsx
function App() {
    const mounted = usePromise();
    const [value, setValue] = useState();

    useEffect(() => {
        (async () => {
            const value = await mounted(axios.get('/xxx/queryInfo'));
            // This line will not execute if <Demo> component gets unmounted.
            setValue(value);
        })();
    });

    return (
        <div className='app'>
            ...
        </div>
    )
}
```
