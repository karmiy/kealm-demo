## useSlider

让指定 HTMLElement 拥有滑块功能，即鼠标/手指在元素上按下时拖动，可获取当前拖动位置在元素总长度的比例值

### 结构

```ts
interface State {
    isSliding: boolean; // 当前是否滑动中
    value: number; // 当前拖动位置在元素总长度的比例值
}

interface Options {
    onScrub: (value: number) => void; // 滑动过程中触发
    onScrubStart: () => void; // 按下时触发
    onScrubStop: (value: number) => void;// 抬起时触发
    reverse: boolean; // 是否反向滑动
    styles: boolean | CSSProperties; // 使用会在给 ref 添加 use-select: none
    vertical?: boolean; // 是否垂直方向
}

function useSlider(
    ref: React.RefObject<HTMLElement>, 
    options: Partial<Options> = {}
): State;
```

### 函数与返回值

- Params:

    - ref: 指定滑块功能的元素

    - options: 配置项

- Return:

    - state: 当前状态

### 作用

- 为元素装饰上滑块功能

### 何时使用

- 希望为元素装饰滑动功能，获取滑动信息

### 应用场景

- 开发滑块 Slider 组件，为容器添加此功能，实时为滑块元素定位赋值

### 源码细节

[useSlider 源码地址](https://github.com/streamich/react-use/blob/master/src/useSlider.ts)

- 在元素长度为 0 时不进行处理，考虑细节

```tsx
const length = options.vertical ? rect.height : rect.width;

// Prevent returning 0 when element is hidden by CSS
if (!length) {
    return;
}
```

- raf 为滑动事件防抖

### 示例

```tsx
function App() {
    const ref = React.useRef(null);
    const { isSliding, value } = useSlider(ref);

    return (
        <div className='app'>
            <div ref={ref} style={{ position: 'relative' }}>
                <p style={{ textAlign: 'center', color: isSliding ? 'red' : 'green' }}>
                    {Math.round(value * 100)}%
                </p>
            </div>
        </div>
    )
}
```
