## useDefault

使用带默认值的 useState

### 结构

```ts
function useDefault<TStateType>(
    defaultValue: TStateType,
    initialValue: TStateType | (() => TStateType)
): [TStateType, (value: React.SetStateAction<TStateType | null | undefined>) => void];
```

### 函数与返回值

- Params:

    - defaultValue: 默认值

    - initialValue: 初始值

- Return:

    - value: 同 setState 返回值
    
    - setValue: 同 setState 返回值

### 作用

- useState 的形式管理一个对象状态，并在 null 或 undefined 时有默认值

### 何时使用

- 当需要使用 useState 管理对象状态时，并且在状态为 null 或 undefined 时有默认值

### 应用场景

- user 对象初始为 null 时，默认为 { id: '' }，确保 render 时使用 user.id 不报错，并在请求用户数据后进行赋值，请求失败直接赋值为 null 也不需要特意拼接出对象

### 源码细节

[useDefault 源码地址](https://github.com/streamich/react-use/blob/master/src/useDefault.ts)

- 使用 typescript 的 as const 断言作为返回值，确保返回不会被识别为 Array<X | Y> 的错误形式

```tsx
return [value, setValue] as const;
```

### 示例

```tsx
function App() {
    const initialUser = { name: 'Marshall' }
    const defaultUser = { name: 'Mathers' }
    const [user, setUser] = useDefault(defaultUser, initialUser);

    return (
        <div className='app'>
            <div>User: {user.name}</div>
            <input onChange={e => setUser({ name: e.target.value })} />
            <button onClick={() => setUser(null)}>set to null</button>
        </div>
    )
}
```
