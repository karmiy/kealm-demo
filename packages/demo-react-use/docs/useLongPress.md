## useLongPress

监控元素的长按

### 结构

```ts
interface Options {
    isPreventDefault?: boolean;
    delay?: number;
}

interface LongPressEvent {
    onMouseDown: (e: any) => void,
    onTouchStart: (e: any) => void,
    onMouseUp: () => void,
    onMouseLeave: () => void,
    onTouchEnd: () => void,
}

function useLongPress(
    callback: (e: TouchEvent | MouseEvent) => void,
    options: Options = { isPreventDefault = true, delay = 300 }
): LongPressEvent;
```

### 函数与返回值

- Params:

    - callback: 长按后执行的回调

    - options:

        - isPreventDefault: 是否阻止 touchend 的默认事件，主要为了防止点击穿透问题

        - delay: 长按延迟时长，如 300ms 后触发 callback

- Return:

    - longPressEvent: 挂载于 DOM 节点的事件，只需要 {...longPressEvent} 挂载即可

### 作用

- 给元素绑定事件，监听长按

### 何时使用

- 希望监听元素的长按，并做出响应

### 应用场景

- 长按二维码后，弹出识别二维码的弹窗

### 源码细节

[useLongPress 源码地址](https://github.com/streamich/react-use/blob/master/src/useLongPress.ts)

### 示例

```tsx
function App() {
    const onLongPress = () => {
        console.log('calls callback after long pressing 300ms');
    };
    
    const defaultOptions = {
        isPreventDefault: true,
        delay: 1000,
    };
    const longPressEvent = useLongPress(onLongPress, defaultOptions);

    return (
        <div className='app'>
            <button {...longPressEvent}>useLongPress</button>
        </div>
    )
}
```
