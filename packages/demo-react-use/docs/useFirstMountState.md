## useFirstMountState

当前是否为第一次挂载 render

### 结构

```ts
function useFirstMountState(): boolean;
```

### 函数与返回值

- Return:

    - isFirstMount: 是否第一次挂载 render

### 作用

- 获取组件当前是否为初始化挂载状态

### 何时使用

- 需要在组件初始化时进行操作

### 应用场景

- 开发动画组件，当用户传递 appear 参数表示初始时需要动画时，利用该返回值进行判断并执行初始动画

### 源码细节

[useFirstMountState 源码地址](https://github.com/streamich/react-use/blob/master/src/useFirstMountState.ts)

- 使用 useRef 保存并返回状态，保证组件不作无用 render

### 示例

```tsx
function App() {
    const isFirstMount = useFirstMountState();
    const update = useUpdate();

    return (
        <div className='app'>
            <span>This component is just mounted: {isFirstMount ? 'YES' : 'NO'}</span>
            <br />
            <button onClick={update}>re-render</button>
        </div>
    )
}
```
