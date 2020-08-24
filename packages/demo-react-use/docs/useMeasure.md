## useMeasure

使用 [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) 跟踪元素尺寸

> 为了兼容低版本浏览器，可以使用 [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill)

### 结构

```ts
type UseMeasureRef<E extends HTMLElement = HTMLElement> = (element: E) => void;

type UseMeasureRect = Pick<DOMRectReadOnly, 'x' | 'y' | 'top' | 'left' | 'right' | 'bottom' | 'height' | 'width'>;

type UseMeasureResult<E extends HTMLElement = HTMLElement> = [UseMeasureRef<E>, UseMeasureRect];

function useMeasure<E extends HTMLElement = HTMLElement>(): UseMeasureResult<E>;
```

### 函数与返回值

- Return:

    - ref: 挂载在 DOM 上的 ref

    - rect: DOM 元素的尺寸信息

### 作用

- 跟踪元素尺寸

### 何时使用

- 希望监听一个元素尺寸大小变化

### 应用场景

- 开发一个 table 表格，自适应高度始终其底部在距离浏览器底部 20px 的位置，利用该 hook 监听其父容器尺寸变化为其赋值

### 源码细节

[useMeasure 源码地址](https://github.com/streamich/react-use/blob/master/src/useMeasure.ts)

- 利用 useState 的 setState 作为 ref 给使用者挂载，这很有用也很方便

```tsx
const [element, ref] = useState<E | null>(null);
```

### 示例

```tsx
function App() {
    const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure<HTMLDivElement>();

    return (
        <div className='app'>
            <div>x: {x}</div>	
            <div>y: {y}</div>
            <div>width: {width}</div>
            <div>height: {height}</div>
            <div>top: {top}</div>
            <div>right: {right}</div>
            <div>bottom: {bottom}</div>
            <div>left: {left}</div>
        </div>
    )
}
```
