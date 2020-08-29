## useMouse

监听鼠标的位置与元素尺寸：

- docX: 鼠标距离文档 x 方向距离

- docY: 鼠标距离文档 y 方向距离

- posX: 元素距离文档 x 方向距离

- posY: 元素距离文档 y 方向距离

- elX: 鼠标距离元素左上角 x 方向距离

- elY: 鼠标距离元素左上角 y 方向距离

- elH: 元素高度

- elW: 元素宽度

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

function useMouse(
    ref: RefObject<Element>
): State;
```

### 函数与返回值

- Params:

    - ref: useRef 挂载的 DOM ref

- Return:

    - state: 当前鼠标状态与元素尺寸

### 作用

- 监听鼠标位置与元素尺寸

### 何时使用

- 希望监听当前鼠标的位置，根据数值进行相关操作

### 应用场景

- 实现元素拖拽时，move 过程中根据该 hook 返回值给拖动元素赋 left, top 值

### 源码细节

[useMouse 源码地址](https://github.com/streamich/react-use/blob/master/src/useMouse.ts)

### 示例

```tsx
function App() {
    const ref = useRef(null);

    const { docX, docY, posX, posY, elX, elY, elW, elH } = useMouse(ref);

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
