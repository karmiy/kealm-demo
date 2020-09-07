## useScroll

监听指定元素的滚动距离

### 结构

```ts
interface State {
    x: number;
    y: number;
}

function useScroll(
    ref: React.RefObject<HTMLElement>
): State;
```

### 函数与返回值

- Params:

    - ref: 被挂载到滚动元素的 useRef

- Return:

    - state: 当前滚动状态

        - x: 水平方向滚动距离

        - y: 垂直方向滚动距离

### 作用

- 监听元素的滚动信息

### 何时使用

- 希望监听元素的滚动信息

### 应用场景

- 实现加载更多效果，监听元素的滚动信息，在滚到底部时加载更多内容

### 源码细节

[useScroll 源码地址](https://github.com/streamich/react-use/blob/master/src/useScroll.ts)

- 使用 useRafState 对滚动回调进行防抖处理

```tsx
const [state, setState] = useRafState<State>({
    x: 0,
    y: 0,
});
```

### 更多看法

- 可以用 useState\<HTMLElement | null> 传递 ref 绑定，这样更为灵活，useEffect 的依赖也更为有效，源码中使用 ref 作为依赖的意义不大，通常引用地址是不变的

- 可在没有传递元素时默认绑定如 window

### 示例

```tsx
function App() {
    const scrollRef = React.useRef(null);
    const {x, y} = useScroll(scrollRef);

    return (
        <div className='app'>
            <div>x: {x}</div>
            <div>y: {y}</div>
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
