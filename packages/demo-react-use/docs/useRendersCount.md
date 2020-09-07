## useRendersCount

获取组件渲染次数，包括初始第一次

### 结构

```ts
function useRendersCount(): number;
```

### 函数与返回值

- Return:

    - count: 当前组件渲染次数

### 作用

- 记录当前组件 render 次数

### 何时使用

- 希望对当前组件 render 次数进行记录或判断

### 应用场景

- 作为 debug 工具，在页面初始时，执行某些操作时打印渲染次数，判断组件渲染性能，是否渲染过多等问题进行分析

### 源码细节

[useRendersCount 源码地址](https://github.com/streamich/react-use/blob/master/src/useRendersCount.ts)

### 示例

```tsx
function App() {
    const update = useUpdate();
    const rendersCount = useRendersCount();

    return (
        <div className='app'>
            <span>Renders count: {rendersCount}</span>
            <br />
            <button onClick={update}>re-render</button>
        </div>
    )
}
```
