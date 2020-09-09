## useSetState

让 useState 的 set 方法，用法类似于 Class Component 类组件的 this.setState（对象合并机制）

### 结构

```ts
function useSetState<T extends object>(
    initialState: T = {} as T
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void];
```

### 函数与返回值

- Params:

    - initialState: 初始对象状态

- Return:

    - state: 当前状态

    - setState: 用法同类组件 this.setState

### 作用

- 将状态集合到一个 useState 中，并以类组件 this.setState 的机制管理对象状态

### 何时使用

- 希望将状态集合到一个对象上

- 希望以类组件 this.setState 的方式管理状态集合

### 应用场景

- 任何需要管理对象状态的场景

### 源码细节

[useSetState 源码地址](https://github.com/streamich/react-use/blob/master/src/useSetState.ts)

### 示例

```tsx
function App() {
    const [state, setState] = useSetState<{ hello?: string; foo?: string; count?: number }>({});

    return (
        <div className='app'>
            <pre>{JSON.stringify(state, null, 2)}</pre>
            <button onClick={() => setState({hello: 'world'})}>hello</button>
            <button onClick={() => setState({foo: 'bar'})}>foo</button>
            <button 
                onClick={() => {
                    setState((prevState) => ({
                        count: (prevState.count || 0) + 1,
                    }))
                }}
            >
                count
            </button>
        </div>
    )
}
```
