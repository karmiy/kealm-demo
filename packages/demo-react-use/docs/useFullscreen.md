## useFullscreen

使用全屏

### 结构

```ts
interface FullScreenOptions {
    video?: RefObject<HTMLVideoElement & { webkitEnterFullscreen?: () => void; webkitExitFullscreen?: () => void; }>;
    onClose?: (error?: Error) => void;
}

function useFullscreen(
    ref: RefObject<Element>,
    on: boolean, 
    options: FullScreenOptions = {}
): boolean;
```

### 函数与返回值

- Params:

    - ref: 需要全屏展示的元素

    - on: 控制是否全屏

    - options: 配置项

        - video: screenfull 不可用时，可传 video

        - onClose: 关闭全屏或报错时回调

- Return:

    - isFullscreen: 是否全屏中

### 作用

- 展示全屏效果

### 何时使用

- 需要给页面中的 video 进行全屏展示

### 应用场景

- video 全屏场景

### 源码细节

[useFullscreen 源码地址](https://github.com/streamich/react-use/blob/master/src/useFullscreen.ts)

- 使用第三方库 [screenfull](https://www.npmjs.com/package/screenfull) 作主要全屏操作

### 示例

```tsx
function App() {
    const ref = useRef(null)
    const [show, toggle] = useToggle(false);
    const isFullscreen = useFullscreen(ref, show, {onClose: () => toggle(false)});

    return (
        <div ref={ref} className='app'>
            <div>{isFullscreen ? 'Fullscreen' : 'Not fullscreen'}</div>
            <button onClick={() => toggle()}>Toggle</button>
            <video src='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' autoPlay />
        </div>
    )
}
```
