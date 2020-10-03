## useWindowSize

监听并返回 window 页面大小，即 window.innerWidth 与 window.innerHeight

### 结构

```ts
function useWindowSize(
    initialWidth = Infinity,
    initialHeight = Infinity
): { width: number; height: number };
```

### 函数与返回值

- Params:

    - initialWidth: 初始宽度，非 window 环境的默认值

    - initialHeight: 初始高度，非 window 环境的默认值

- Return:

    - state

        - width: 窗口宽度

        - height: 窗口高度

### 作用

- 监听当前页面大小

### 何时使用

- 希望监听并获取当前页面大小

### 应用场景

- 实现一个自适应高度的 table，table 底部始终在距离页面底部 20px 的位置，即可监听页面大小，实时变更 table height 值

### 源码细节

[useWindowSize 源码地址](https://github.com/streamich/react-use/blob/master/src/useWindowSize.ts)

- 判断是否 window 环境，非 window 环境则取默认初始设置，并使用 useRafState 对 setState 操作进行防抖

```tsx
const [state, setState] = useRafState<{ width: number; height: number }>({
    width: isClient ? window.innerWidth : initialWidth,
    height: isClient ? window.innerHeight : initialHeight,
});
```

### 示例

```tsx
function App() {
    const {width, height} = useWindowSize();

    return (
        <div className='app'>
            <div>width: {width}</div>
            <div>height: {height}</div>
        </div>
    )
}
```
