## useAsyncFn

异步函数

### 结构

```ts
type AsyncState<T> = {
    loading: boolean;
    error?: Error ;
    value?: T;
}

type FnReturningPromise = ...; // 返回 Promise 的函数

type PromiseType = ...; // 获取 Promise 返回值类型

type StateFromFnReturningPromise<T> = AsyncState<PromiseType<ReturnType<T>>>; // 其实就是 AsyncState 的结构，只是根据我们 Promise 返回值给 value 赋值了类型

function useAsyncFn<T extends FnReturningPromise>(
    fn: T, 
    deps?: DependencyList, 
    initialState?: StateFromFnReturningPromise
): [StateFromFnReturningPromise<T>, T];
```

### 函数与返回值

- Params:

    - fn: 异步函数，返回 Promise 对象

    - deps: fn 的依赖项

    - initialState: 初始值

- Return:

    - state: 数据状态，拥有 value, error, loading 属性

    - fetch: 手动执行异步函数

### 作用

- 管理异步函数(async 或 return Promise)，以同步的方式返回数据

- 管理函数执行时的 loading 状态

### 何时使用

- 希望以同步的方式获取到异步函数的返回值

- 希望执行异步函数时能知悉 loading 状态

### 应用场景

- 手动点击发起请求

### 源码细节

[useAsyncFn 源码地址](https://github.com/streamich/react-use/blob/master/src/useAsyncFn.ts)

- 函数被连续多次执行，只有最后一次的返回被响应，不会全部返回触发 render

```tsx
isMounted() && callId === lastCallId.current && set({ value, loading: false });
```

### 示例

```tsx
type ISex = 'man' | 'woman';

interface IUser {
    id: number;
    name: string;
    sex: 'man' | 'woman';
}

function getUsers(url: string, sex: ISex) {
    return new Promise<Array<IUser>>((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'k1', sex },
                { id: 2, name: 'k2', sex },
            ])
        }, 2000);
    });
}

function App() {
    const [url, setUrl] = useState('xxx');
    const [state, fetch] = useAsyncFn(async (sex: ISex) => {
        const response = await getUsers(url, sex);
        return response;
    }, [url]);

    const { value = [], error, loading } = state;

    return (
        <div className='app'>
            {loading && <div>loading...</div>}
            {error && <div>error!</div>}
            {value.map((item, i) => {
                return (
                    <div key={i}>
                        <span>{item.id}</span>
                        <span>{item.name}</span>
                        <span>{item.sex}</span>
                    </div>
                )
            })}
            <button onClick={() => fetch('man')}>查询男用户</button>
        </div>
    )
}
```
