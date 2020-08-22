## useClickAway

点击元素外时触发

### 结构

```ts
function useClickAway<E extends Event = Event>(
    ref: RefObject<HTMLElement | null>, 
    onClickAway: (event: E) => void, 
    events: string[] = ['mousedown', 'touchstart']
): void;
```

### 参数与返回值

- Params:

    - ref: React ref 节点

    - onClickAway: 点击元素外触发的回调

    - events: 事件名

### 作用

- 触发元素外的相应事件

### 何时使用

- 希望响应元素外的点击事件

### 应用场景

- 点击弹框外层时隐藏弹框

### 源码细节

[useClickAway 源码地址](https://github.com/streamich/react-use/blob/master/src/useClickAway.ts)

- 利用 ref 存储并实时更新最新的回调值

```tsx
const savedCallback = useRef(onClickAway);

useEffect(() => {
    savedCallback.current = onClickAway;
}, [onClickAway]);
```

### 示例

```tsx
const style = {
    width: 200,
    height: 200,
    background: 'red',
};

function App() {
    const ref = useRef(null);

    useClickAway(ref, () => console.log('OUTSIDE CLICKED'), ['click']);

    return (
        <div className='app' ref={ref} style={style} />
    )
}
```
