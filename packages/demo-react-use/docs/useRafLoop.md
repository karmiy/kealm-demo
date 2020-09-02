## useRafLoop

循环以 requestAnimationFrame 调用回调

### 结构

```ts
type RafLoopReturns = [() => void, () => void, () => boolean];

function useRafLoop(
    callback: FrameRequestCallback,
    initiallyActive = true
): RafLoopReturns;
```

### 函数与返回值

- Params:

    - callback: 循环 raf 中执行的回调

    - initiallyActive: 初始激活状态，即组件初始化时是否立即执行

- Return:

    - rafLoopReturns

        - stopLoop: 函数，执行后停止 raf 执行

        - startLoop: 函数，执行后开启 raf 执行

        - isActive: 函数，执行后返回当前是否激活

### 作用

- 循环以 requestAnimationFrame 调用回调实现动画

### 何时使用

- 动画的执行与时间关联性较小（回调是 RafLoopReturns 类型，只接收一个当前 timestamp，做时间差计算动画偏移不够方便）

- 希望 raf 执行的动画不关联 state 状态，不由 state 驱动动画，而是手动操作 DOM

- 希望 raf 执行的动画关联 state 状态，由 state 驱动动画

- 希望动画的执行时机可控

### 应用场景

- 构建某些非时间相关的动画

### 源码细节

[useRaf 源码地址](https://github.com/streamich/react-use/blob/master/src/useRaf.ts)

### 更多看法

- 回调的接收参数可以补充开始时间 startTime，当前时间 currentTime 或时间间隔 deltaTime，在做与时间有关的动画会更方便

### 示例

```tsx
function App() {
    const [left, setLeft] = useState(0);
    const directiveRef = useRef(true);
    const [loopStop, loopStart, isActive] = useRafLoop(() => {
        setLeft(value => {
            const nextValue = value + (directiveRef.current ? 1 : -1);
            (nextValue === 500 || nextValue === 0) && (directiveRef.current = !directiveRef.current);
            return nextValue;    
        });
    }, false);

    return (
        <div className='app'>
            <div style={{
                position: 'relative',
                width: 100,
                height: 100,
                border: '1px solid #1394ff',
                left,
            }} />
            <button onClick={() => isActive() ? loopStop() : loopStart()}>Toggle</button>
        </div>
    )
}
```
