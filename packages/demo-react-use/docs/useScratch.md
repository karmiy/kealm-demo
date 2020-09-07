## useScratch

跟踪鼠标/触屏的 scratch 状态

即鼠标/触屏按下到拖动过程中，矩形轨迹区域的鼠标信息

### 结构

```ts
interface ScratchSensorParams {
    disabled?: boolean;
    onScratch?: (state: ScratchSensorState) => void;
    onScratchStart?: (state: ScratchSensorState) => void;
    onScratchEnd?: (state: ScratchSensorState) => void;
}

interface ScratchSensorState {
    isScratching: boolean; // 当前是否拖动中
    start?: number; // 开始拖动时 Date.now 的时间戳
    end?: number; // 拖动结束时的时间戳
    x?: number; // 开始拖动时的位置距离 ref 元素 x 方向距离
    y?: number; // 开始拖动时的位置距离 ref 元素 y 方向距离
    dx?: number; // 拖动过程中 x 方向的当前偏移量
    dy?: number; // 拖动过程中 y 方向的当前偏移量
    docX?: number; // 开始拖动时的位置距离文档 x 方向距离
    docY?: number; // 开始拖动时的位置距离文档 y 方向距离
    elH?: number; // ref 元素的 offsetHeight 高度
    elW?: number; // ref 元素的 offsetWidth 高度
    elX?: number; // ref 元素距离文档 x 方向距离
    elY?: number; // ref 元素距离文档 y 方向距离
}

function useScratch<S>(
    params: ScratchSensorParams = {}
): [(el: HTMLElement | null) => void, ScratchSensorState];
```

### 函数与返回值

- Params:

    - params: 配置参数

        - disabled: 是否禁用

        - onScratch: 拖动过程中回调

        - onScratchStart: 开始拖动时回调

        - onScratchEnd: 拖动结束放手时触发

- Return:

    - ref: 挂载到 DOM 节点的 ref

    - state: 当前状态

### 作用

- 跟踪鼠标/触屏的 scratch 信息

### 何时使用

- 希望追踪鼠标/触屏的 scratch 信息

### 应用场景

- 实现截图功能，对鼠标截图的矩形区域进行截图

### 源码细节

[useScratch 源码地址](https://github.com/streamich/react-use/blob/master/src/useScratch.ts)

### 示例

```tsx
function App() {
    const [ref, state] = useScratch();

    const blockStyle: React.CSSProperties = {
        position: 'relative',
        width: 400,
        height: 400,
        border: '1px solid tomato',
    };

    const preStyle: React.CSSProperties = {
        pointerEvents: 'none',
        userSelect: 'none',
    };

    let { x = 0, y = 0, dx = 0, dy = 0 } = state;
    if (dx < 0) [x, dx] = [x + dx, -dx];
    if (dy < 0) [y, dy] = [y + dy, -dy];

    const rectangleStyle: React.CSSProperties = {
        position: 'absolute',
        left: x,
        top: y,
        width: dx,
        height: dy,
        border: '1px solid tomato',
        pointerEvents: 'none',
        userSelect: 'none',
    };

    return (
        <div className='app'>
            <div ref={ref} style={blockStyle}>
                <pre style={preStyle}>{JSON.stringify(state, null, 4)}</pre>
                {state.isScratching && <div style={rectangleStyle} />}
            </div>
        </div>
    )
}
```
