## useKeyPressEvent

响应键盘按下与抬起，与 useKey 不同在于，按下按键不松开时不会持续触发事件

### 结构

```ts
type KeyFilter = null | undefined | string | ((event: KeyboardEvent) => boolean);

type Handler = (event: KeyboardEvent) => void;

function useKeyPressEvent(
    key: string | KeyFilter,
    keydown?: Handler | null | undefined,
    keyup?: Handler | null | undefined,
    useKeyPress: typeof useKeyPress = useKeyPress
): void;
```

### 函数与返回值

- Params:

    - key: 主要在于事件 event.key 的值，可以是字符串，函数等

    - keydown: 按下时触发的事件回调

    - keyup: 抬起时触发的事件回调

    - useKeyPress: 内部调用的主要 hook，默认使用 useKeyPress，一般不需要调整，只在不满足时需要自定义 useKeyPress 结构的 hook 时使用

### 作用

- 在键盘按下和抬起时分别进行**一次**反馈

### 何时使用

- 需要监听某个键盘按键，并在按下与抬起时执行响应操作

### 应用场景

- 开发游戏任务，在按下 → 键时触发定时器实现任务运动，松开时关闭定时器停止人物运动

### 源码细节

[useKeyPressEvent 源码地址](https://github.com/streamich/react-use/blob/master/src/useKeyPressEvent.ts)

### 示例

```tsx
function App() {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count => ++count);
    const decrement = () => setCount(count => --count);
    const reset = () => setCount(() => 0);

    useKeyPressEvent(']', increment);
    useKeyPressEvent('[', decrement);
    useKeyPressEvent('r', reset);

    return (
        <div className='app'>
            <p>
                Try pressing <code>[</code>, <code>]</code>, and <code>r</code> to
                see the count incremented and decremented.</p>
            <p>Count: {count}</p>
        </div>
    )
}
```
