## useLogger

在组件生命周期中（mounted, updated, unmounted）打印日志

### 结构

```ts
function useLogger(
    componentName: string, 
    ...rest
): void;
```

### 函数与返回值

- Params:

    - componentName: 组件名，会显示在打印的日志开头作为标志

    - rest: 其他参数，在 mounted 和 updated 阶段会一起打印出来

### 作用

- 在组件生命周期中（mounted, updated, unmounted）打印日志

### 何时使用

- 希望在组件生命周期中打印日志

### 应用场景

- 在组件生命周期中打印日志，对比状态，props 的变化

### 源码细节

[useLogger 源码地址](https://github.com/streamich/react-use/blob/master/src/useLogger.ts)

### 示例

```tsx
function App(props) {
    useLogger('Demo', props);

    return (
        <div className='app'>
            ...
        </div>
    )
}
```
