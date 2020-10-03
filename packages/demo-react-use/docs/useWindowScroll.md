## useWindowScroll

监听 window 的 scroll 事件，并返回当前页面的滚动距离 window.pageXOffset 与 window.pageYOffset

> 需要 window scroll 自定义回调操作，可用 useEvent 实现

### 结构

```ts
interface State {
  x: number;
  y: number;
}

function useWindowScroll(): State;
```

### 函数与返回值

- Return:

    - state

        - x: 当前 window.pageXOffset

        - y: 当前 window.pageYOffset

### 作用

- 监听 window 当前滚动距离

### 何时使用

- 希望获取页面当前滚动距离

### 应用场景

- 实现上拉加载更多，在页面滚动到底部时重新请求

### 源码细节

[useWindowScroll 源码地址](https://github.com/streamich/react-use/blob/master/src/useWindowScroll.ts)

- 使用 useRafState 对 setState 更新状态的操作进行防抖

```tsx
const [state, setState] = useRafState<State>({
    x: isClient ? window.pageXOffset : 0,
    y: isClient ? window.pageYOffset : 0,
});
```

### 示例

```tsx
function App() {
    const {x, y} = useWindowScroll();

    return (
        <div className='app' style={{ height: 2000 }}>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
            }}>
                <div>x: {x}</div>
                <div>y: {y}</div>
            </div>
        </div>
    )
}
```
