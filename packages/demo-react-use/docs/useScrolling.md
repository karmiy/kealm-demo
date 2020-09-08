## useScrolling

监听指定元素当前是否正在滚动

### 结构

```ts
function useScrolling(
    ref: React.RefObject<HTMLElement>
): boolean;
```

### 函数与返回值

- Params:

    - ref: 被挂载到滚动元素的 useRef

- Return:

    - scrolling: 当前是否正在滚动中

### 作用

- 监听元素当前是否正在滚动中

### 何时使用

- 希望判断元素是否正在滚动中

### 应用场景

- 需判断元素是否滚动中的任何场景

### 源码细节

[useScrolling 源码地址](https://github.com/streamich/react-use/blob/master/src/useScrolling.ts)

- 在滚动事件中利用 setTimeout 延迟 150ms 来判断是否停止滚动，如果 150ms 后未触发下次滚动，表示停止滚动

```tsx
const handleScrollEnd = () => {
    setScrolling(false);
};
const handleScroll = () => {
    setScrolling(true);
    clearTimeout(scrollingTimeout);
    scrollingTimeout = setTimeout(() => handleScrollEnd(), 150);
};
```

### 示例

```tsx
function App() {
    const scrollRef = React.useRef(null);
    const scrolling = useScrolling(scrollRef);

    return (
        <div className='app'>
            <div>{scrolling ? "Scrolling" : "Not scrolling"}</div>
            <div ref={scrollRef} style={{
                height: 200,
                border: '1px solid #1394ff',
                overflow: 'auto',
            }}>
                <div style={{height: 1000}} />
            </div>
        </div>
    )
}
```
