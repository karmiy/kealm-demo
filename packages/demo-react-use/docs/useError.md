## useError

派发错误 Error

### 结构

```ts
function useError(): ((err: Error) => void);
```

### 函数与返回值

- Return:

    - dispatchError: 函数，用于派发一个 Error


### 作用

- 手动抛出 Error

### 何时使用

- 需要在适当的实际手动抛出 Error

### 源码细节

[useError 源码地址](https://github.com/streamich/react-use/blob/master/src/useError.ts)

### 示例

```tsx
function App() {
    const dispatchError = useError();

    const clickHandler = () => {
        dispatchError(new Error('Some error!'));
    };

    return (
        <div className='app'>
            <button onClick={clickHandler}>Click me to throw</button>
        </div>
    )
}
```
