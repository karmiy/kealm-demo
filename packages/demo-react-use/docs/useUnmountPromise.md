## useUnmountPromise

执行后返回一个包装函数，函数接收一个 promise 对象，执行后对该 promise 进行包装，返回新的 promise 对象，如果组件已卸载，新的 promise 将不会 resolve 或 reject

### 结构

```ts
type Race = <P extends Promise<any>, E = any>(promise: P, onError?: (error: E) => void) => P;

function useUnmountPromise(): Race;
```

### 函数与返回值

- Return:

    - wrapper: 包装函数，接收一个 promise，返回新的 promise 对象，使其在组件卸载时不将 resolve 或 reject

        - promise: 参数，接收的 promise 包装对象

        - onError: 参数，在包装的 promise reject 时，如果组件已卸载则会执行 onError

### 作用

- 对 promise 对象进行二次包装，确保 promise 在组件卸载后不会 resolve 或 reject 

### 何时使用

- 执行某些异步操作，并在获取到结果后还有某些行为（如 setState 更新组件），这些行为在组件卸载后不应该被执行

### 应用场景

- 任何异步请求的场景都建议使用该 wrapper 包裹，如请求用户信息列表，返回后进行 setUserList 给组件 useState 状态赋值，这种行为在组件卸载后会导致报错

### 源码细节

[useUnmountPromise 源码地址](https://github.com/streamich/react-use/blob/master/src/useUnmountPromise.ts)

### 示例

```tsx
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

const Child = () => {
    const wrapper = useUnmountPromise();

    const requestUser = async () => {
        const users = await wrapper(getUsers('man'));
        console.log(users);
    };

    useEffect(() => {
        requestUser();
    }, []);

    return <div>child</div>;
}

function App() {
    const [show, setShow] = useState(true);

    return (
        <div className='app'>
            {show && <Child />}
            <button onClick={() => setShow(v => !v)}>Toggle</button>
        </div>
    )
}
```
