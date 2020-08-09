## useHover

管理 ReactElement 的 hover 事件

### 结构

```ts
type Element = ((state: boolean) => React.ReactElement<any>) | React.ReactElement<any>;

function useHover(
    element: Element
): [React.ReactElement<any>, boolean];
```

### 函数与返回值

- Params:

    - element: ReactElement 元素或返回 ReactElement 元素的函数

- Return:

    - hoverable: 重构后的 ReactElement 元素

    - hovered: 当前是否 hover 中

### 作用

- 为 ReactElement 添加 onMouseEnter 和 onMouseLeave 事件，管理 hover 状态

### 何时使用

- 需要管理 ReactElement 元素的 hover 状态

### 应用场景

- 开发 tooltip 组件，为 children 挂载 hover 监听，显示隐藏 tooltip

```tsx
const el = <Tooltip>{children}</Tooltip>;
```

### 源码细节

[useHover 源码地址](https://github.com/streamich/react-use/blob/master/src/useHover.ts)

- 使用高阶函数创建 onMouseEnter, onMouseLeave 事件

```tsx
const onMouseEnter = (originalOnMouseEnter?: any) => (event: any) => {
    (originalOnMouseEnter || noop)(event);
    setState(true);
};
```

- 使用 React.cloneElement 重置 onMouseEnter, onMouseLeave 事件

```tsx
const el = React.cloneElement(element, {
    onMouseEnter: onMouseEnter(element.props.onMouseEnter),
    onMouseLeave: onMouseLeave(element.props.onMouseLeave),
});
```

### 示例

```tsx
function App() {
    const element = (hovered: boolean) =>
        <div>
            Hover me! {hovered && 'Thanks!'}
        </div>;

    const [hoverable, hovered] = useHover(element);

    return (
        <div className='app'>
            {hoverable}
            <div>{hovered ? 'HOVERED' : ''}</div>
        </div>
    )
}
```
