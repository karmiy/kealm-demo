## useAsync

异步行为

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

function useAsync<T extends FnReturningPromise>(
    fn: T, 
    deps?: DependencyList, 
    initialState?: StateFromFnReturningPromise
): StateFromFnReturningPromise<T>;
```
### 参数与返回值

- Params:

    - fn: 异步函数，返回 Promise 对象

    - deps: fn 的依赖项

    - initialState: 初始值

- Return:

    - state: 数据状态，拥有 value, error, loading 属性

### 作用

- 管理并自动执行异步函数(async 或 return Promise)，以同步的方式返回数据

- 管理函数执行时的 loading 状态

### 何时使用

- 希望**自动执行**异步函数，并以同步的方式返回数据

- 希望自动执行异步函数时能知悉 loading 状态

### 应用场景

- 进入页面时发起异步请求，并且在依赖数据改变时重新请求

### 源码细节

[useAsync 源码地址](https://github.com/streamich/react-use/blob/master/src/useAsync.ts)

- 当 callback 改变时自动执行(利用 deps 改变时 callback 改变的特性)

```tsx
useEffect(() => {
    callback();
}, [callback]);
```

- 内部使用了 useAsyncFn，多次执行只响应最后一次的返回，不会造成多次返回多次渲染

### 示例

```tsx
type ISex = 'man' | 'woman';

interface IUser {
    id: number;
    name: string;
    sex: 'man' | 'woman';
}

function getUsers(sex: ISex) {
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
    const [sex, setSex] = useState<ISex>('man');

    const state = useAsync(async () => {
        const response = await getUsers(sex);
        return response;
    }, [sex]);

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
            <button onClick={() => setSex(s => s === 'man' ? 'woman' : 'man')}>切换用户类型</button>
        </div>
    )
}
```
