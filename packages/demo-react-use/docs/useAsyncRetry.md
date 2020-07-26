## useAsyncRetry

可执行异步行为

在 useAsync 的基础上多返回一个手动触发执行的 retry 函数

### 结构

```ts
type AsyncState<T> = {
    loading: boolean;
    error?: Error ;
    value?: T;
    retry: () => void;
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

### 函数与返回值

- Params:

    - fn: 异步函数，返回 Promise 对象

    - deps: fn 的依赖项

    - initialState: 初始值

- Return:

    - state: 数据状态，拥有 value, error, loading, retry 属性

### 作用

- 管理并自动执行异步函数(async 或 return Promise)，以同步的方式返回数据，并在自动执行的基础上附带了一个可手动执行的功能

- 管理函数执行时的 loading 状态

### 何时使用

- 希望**自动执行**异步函数，并以同步的方式返回数据，又希望有些场景可以**手动**触发函数执行

- 希望自动执行异步函数时能知悉 loading 状态

### 应用场景

- 进入页面时发起异步请求返回列表数据，列表拥有更新操作，在更新数据时手动调用 retry 重新请求新的列表数据

### 注意事项

- loading 状态中执行 retry 无效，源码中相应控制如下:

```tsx
const retry = useCallback(() => {
    if (stateLoading) { // loading 状态不执行异步函数
      ...
      return;
    }
    ...
}, [...]);
```

### 源码细节

[useAsyncRetry 源码地址](https://github.com/streamich/react-use/blob/master/src/useAsyncRetry.ts)

- retry 的触发原理在于：保存了一个任意 number 状态一起作为 useAsync 的依赖，当手动执行 retry 时将状态 + 1，利用依赖值改变触发异步 useAsync 执行异步函数

```tsx
const [attempt, setAttempt] = useState<number>(0);
const state = useAsync(fn, [...deps, attempt]); // attempt 作为依赖被动触发 fn 执行

const retry = useCallback(() => {
    ...
    setAttempt(currentAttempt => currentAttempt + 1); // + 1 操作触发状态改变，间接触发上方依赖变化
}, [...deps, stateLoading]);
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

    const state = useAsyncRetry(async () => {
        const response = await getUsers(sex);
        return response;
    }, [sex]);

    const { value = [], error, loading, retry } = state;

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
            <button onClick={() => retry()}>手动执行</button>
        </div>
    )
}
```
