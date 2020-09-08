## useSearchParam

获取 location.search 上的某个参数

> hash router 时不可用

### 结构

```ts
function useSearchParam(
    param: string
): string | null;
```

### 函数与返回值

- Params:

    - param: location.search 上的参数键

- Return:

    - value: 对应的参数值

### 作用

- 获取 location.search 上的参数值

### 何时使用

- 希望获取 location.search 上的参数值

### 应用场景

- 任何需要获取 location.search 上参数值的场景

### 源码细节

[useSearchParam 源码地址](https://github.com/streamich/react-use/blob/master/src/useSearchParam.ts)

- 使用 URLSearchParams 类来获取参数值

```tsx
const getValue = (search: string, param: string) => new URLSearchParams(search).get(param);
```

### 示例

```tsx
function App() {
    const edit = useSearchParam('edit');

    return (
        <div className='app'>
            <div>edit: {edit || '🤷‍♂️'}</div>
            <div>
                <button onClick={() => history.pushState({}, '', location.pathname + '?edit=123')}>Edit post 123 (?edit=123)</button>
            </div>
            <div>
                <button onClick={() => history.pushState({}, '', location.pathname + '?edit=999')}>Edit post 999 (?edit=999)</button>
            </div>
            <div>
                <button onClick={() => history.pushState({}, '', location.pathname)}>Close modal</button>
            </div>
        </div>
    )
}
```
