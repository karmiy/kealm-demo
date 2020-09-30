## useToggle

管理一个 boolean 值的切换和更新

### 结构

```ts
function useToggle(
    initialValue: boolean
): [boolean, (nextValue?: any) => void];
```

### 函数与返回值

- Params:

    - initialValue: 初始 boolean 状态

- Return:

    - on: 当前 boolean 状态

    - toggle: 函数，切换 boolean 状态，没有传递或非 boolean 值则切换，传递 boolean 值则赋值

### 作用

- 管理一个 boolean 值的切换和更新

### 何时使用

- 希望管理一个 boolean 类型的状态并控制其切换

### 应用场景

- 开发折叠面板 Collapse 组件，控制其展开收起

- 开发模态框 Modal 组件，控制其显示隐藏

### 源码细节

[useToggle 源码地址](https://github.com/streamich/react-use/blob/master/src/useToggle.ts)

- 使用 useReducer 控制状态切换逻辑

```tsx
const toggleReducer = (state: boolean, nextValue?: any) => (typeof nextValue === 'boolean' ? nextValue : !state);

useReducer<Reducer<boolean, any>>(toggleReducer, initialValue);
```

- 兼容传递非 boolean 值的情况，考虑周全

### 示例

```tsx
function App() {
    const [on, toggle] = useToggle(true);

    return (
        <div className='app'>
            <div>{on ? 'ON' : 'OFF'}</div>
            <button onClick={toggle}>Toggle</button>
            <button onClick={() => toggle(true)}>set ON</button>
            <button onClick={() => toggle(false)}>set OFF</button>
        </div>
    )
}
```
