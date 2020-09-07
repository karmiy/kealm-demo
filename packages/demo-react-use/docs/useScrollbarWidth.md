## useScrollbarWidth

获取页面滚动条宽度

> 移动端不支持，会返回 0

### 结构

```ts
function useScrollbarWidth(): number | undefined;
```

### 函数与返回值

- Return:

    - sbw: 滚动条宽度

### 作用

- 获取页面滚动条宽度

### 何时使用

- 希望获取页面滚动条宽度进行某些计算

### 应用场景

- 在设置元素宽度时扣除滚动条宽

### 源码细节

[useScrollbarWidth 源码地址](https://github.com/streamich/react-use/blob/master/src/useScrollbarWidth.ts)

- 使用第三方库 [@xobotyi/scrollbar-width](https://www.npmjs.com/package/@xobotyi/scrollbar-width) 获取滚动条宽度

- 在组件初始化后下一个 raf 重新获取滚动条宽度，防止 DOM 生成前获取不到

```tsx
// this needed to ensure the scrollbar width in case hook called before the DOM is ready
useEffect(() => {
    if (typeof sbw !== 'undefined') {
      return;
    }

    const raf = requestAnimationFrame(() => {
      setSbw(scrollbarWidth());
    });

    return () => cancelAnimationFrame(raf);
}, []);
```

### 示例

```tsx
function App() {
    const sbw = useScrollbarWidth();

    return (
        <div className='app'>
            {sbw === undefined ? `DOM is not ready yet, SBW detection delayed` : `Browser's scrollbar width is ${sbw}px`}
        </div>
    )
}
```
