## useMouseHovered

同 useMouse，监听鼠标的位置与元素尺寸，区别在于多了可配置参数：

- whenHovered: 是否只有在 hover 时才响应 mousemove 事件更新状态

- bound: 是否 elX, elY 的范围只在元素内，如 elX 会经过 Math.max(0, Math.min(state.elX, state.elW)) 的过滤


### 结构

```ts
interface State {
    docX: number;
    docY: number;
    posX: number;
    posY: number;
    elX: number;
    elY: number;
    elH: number;
    elW: number;
}

interface UseMouseHoveredOptions {
    whenHovered?: boolean;
    bound?: boolean;
}

function useMouseHovered(
    ref: RefObject<Element>,
    options: UseMouseHoveredOptions = {}
): State;
```

### 函数与返回值

- Params:

    - ref: useRef 挂载的 DOM ref

    - options:

        - whenHovered: 是否只有在 hover 时才响应 mousemove 事件更新状态

        - bound: 是否 elX, elY 的范围只在元素内，如 elX 会经过 Math.max(0, Math.min(state.elX, state.elW)) 的过滤

- Return:

    - state: 当前鼠标状态与元素尺寸

### 作用

- 监听鼠标位置与元素尺寸

### 何时使用

- 希望监听当前鼠标的位置，根据数值进行相关操作

### 应用场景

- 实现元素拖拽时，move 过程中根据该 hook 返回值给拖动元素赋 left, top 值

### 源码细节

[useMouseHovered 源码地址](https://github.com/streamich/react-use/blob/master/src/useMouseHovered.ts)

### 示例

```tsx
function App() {
    const ref = useRef(null);

    const { docX, docY, posX, posY, elX, elY, elW, elH } = useMouseHovered(ref, {
        bound: true,
        whenHovered: true,
    });

    return (
        <div className='app'>
            <div>Mouse position in document - x:{docX} y:{docY}</div>
            <div>Mouse position in element - x:{elX} y:{elY}</div>
            <div>Element position- x:{posX} y:{posY}</div>
            <div>Element dimensions - {elW}x{elH}</div>
            <div ref={ref} style={{
                width: 100,
                height: 100,
                border: '1px solid skyblue',
            }}></div>
        </div>
    )
}
```
