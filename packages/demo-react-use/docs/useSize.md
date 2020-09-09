## useSize

跟踪元素的大小，与 useMeasure 不同的是：

- useMeasure 使用 Resize Observer API 做监听

- useSize 使用 iframe 做监听

### 结构

```ts
type Element = ((state: State) => React.ReactElement<any>) | React.ReactElement<any>;

interface State {
    width: number;
    height: number;
}

function useSize(
    element: Element,
    { width = Infinity, height = Infinity }: Partial<State> = {}
): [React.ReactElement<any>, State];
```

### 函数与返回值

- Params:

    - element: 监听大小变化的 ReactElement 元素，可以是函数

    - initialState: 初始状态

- Return:

    - sized: 被包装后的 element

    - state: 当前状态，即元素的当前宽高

### 作用

- 跟踪并获取一个元素的宽高变化

### 何时使用

- 希望实时获取一个元素的宽高变化

### 应用场景

- 开发地图组件，容器 div 宽高可能随页面大小变化而变化，在变化时需要重新绘制 echarts，即可用该 hook 在容器宽高变化时更新视图

### 源码细节

[useSize 源码地址](https://github.com/streamich/react-use/blob/master/src/useSize.ts)

- 利用 iframe 绝对定位在元素内，且宽高 100%，在 resize 事件实时获取 iframe 的 offsetWidth, offsetHeight 实现监听效果

### 示例

```tsx
function App() {
    const [sized, {width, height}] = useSize(
        ({width}) => <div style={{background: 'red'}}>Size me up! ({width}px)</div>,
        { width: 100, height: 100 }
    );

    return (
        <div className='app'>
            {sized}
            <div>width: {width}</div>
            <div>height: {height}</div>
        </div>
    )
}
```
