## useHoverDirty

管理 ReactElement 的 hover 事件，同 useHover

区别在于：

- 参数传递的是 ref

- 绑定的是 onMouseOver, onMouseOut

### 结构

```ts
type Element = ((state: boolean) => React.ReactElement<any>) | React.ReactElement<any>;

function useHoverDirty(
    ref: RefObject<Element>,
    enabled: boolean
): [boolean];
```

### 函数与返回值

- Params:

    - ref: useRef 挂载的节点

- Return:

    - hovered: 当前是否 hover 中

### 作用

- 为 DOM 节点添加 onMouseOver 和 onMouseOut 事件，管理 hover 状态

### 何时使用

- 需要管理 DOM 节点的 hover 状态

### 应用场景

- 监听页面中指定 div 的 hover 状态

### 源码细节

[useHoverDirty 源码地址](https://github.com/streamich/react-use/blob/master/src/useHoverDirty.ts)

### 示例

```tsx
function App() {
    const ref = useRef<HTMLDivElement>(null);

    const hovered = useHoverDirty(ref);

    return (
        <div className='app' ref={ref}>
            <div style={{height: 50}}></div>
            <div>{hovered ? 'HOVERED' : ''}</div>
        </div>
    )
}
```
