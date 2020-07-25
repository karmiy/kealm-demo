## useAudio

音频

### 结构

```ts
// 原生 <audio> 的属性
interface HTMLMediaProps extends React.AudioHTMLAttributes<any>, React.VideoHTMLAttributes<any> {
  src: string;
}

// 返回的 state
interface HTMLMediaState {
  buffered: any[];
  duration: number;
  paused: boolean;
  muted: boolean;
  time: number;
  volume: number;
}

// 返回的 controls
interface HTMLMediaControls {
  play: () => Promise<void> | void;
  pause: () => void;
  mute: () => void;
  unmute: () => void;
  volume: (volume: number) => void;
  seek: (time: number) => void;
}

// props 为原生 audio 属性或 <audio> 元素
function useAsync(props: HTMLMediaProps | React.ReactElement<HTMLMediaProps>): [React.ReactElement<HTMLMediaProps>, HTMLMediaState, HTMLMediaControls, ref];
```

### 函数与返回值

- Params:

    - props: 元素 audio 属性或 \<audio> 元素

- Return:

    - audio: \<audio> 元素
    
    - state: 状态
    
    - controls: 功能函数控件
    
    - ref: HTMLAudioElement 元素 ref


### 作用

- 创建并管理一个 audio 元素

### 何时使用

- 使用 hooks 的形式管理一个 audio 音频，实时获取常用状态与便捷操作

### 应用场景

- 页面中使用 audio 音频

### 源码细节

[useAudio 源码地址](https://github.com/streamich/react-use/blob/master/src/useAudio.ts)

- 利用 try finally 执行默认方法与 props 对应方法，捕获内部执行问题

```tsx
const wrapEvent = (userEvent, proxyEvent?) => {
    return event => {
        try {
            proxyEvent && proxyEvent(event);
        } finally {
            userEvent && userEvent(event);
        }
    };
};
```

- 利用 React.cloneElement 与 React.createElement 应对不同的 props 类型

```tsx
if (element) {
    element = React.cloneElement(element, {
        controls: false,
        ...props,
        ref,
        onPlay: wrapEvent(props.onPlay, onPlay),
        ...
    });
} else {
    element = React.createElement(tag, {
        controls: false,
        ...props,
        ref,
        onPlay: wrapEvent(props.onPlay, onPlay),
        ...
    } as any);
}
```

- lockPlay 防止一些浏览器中 .play 返回 Promise，造成中途再次 play 或 pause 时报错

```tsx
const controls = {
    play: () => {
        ...
        if (!lockPlay) {
            const promise = el.play();
            const isPromise = typeof promise === 'object';

            if (isPromise) {
                lockPlay = true;
                const resetLock = () => {
                    lockPlay = false;
                };
                promise.then(resetLock, resetLock);
            }

            return promise;
        }
        ...
    },
}
```

- 以原生 audio 的属性作为 props，灵活性强

- 返回 audio 元素，在功能不满足时，用户可操作性强

- 封装 play, pause 等 controls 方法，操作便捷

- 组合 duration 等常用属性作为 state 返回，便于与 UI 相应

### 示例

```tsx
function App() {
    const [audio, state, controls, ref] = useAudio({
        src: 'https://www.w3school.com.cn/i/horse.ogg',
        autoPlay: true,
    });

    return (
        <div className='app'>
            {audio}
            <pre>{JSON.stringify(state, null, 2)}</pre>
            <button onClick={controls.pause}>Pause</button>
            <button onClick={controls.play}>Play</button>
            <br/>
            <button onClick={controls.mute}>Mute</button>
            <button onClick={controls.unmute}>Un-mute</button>
            <br/>
            <button onClick={() => controls.volume(.1)}>Volume: 10%</button>
            <button onClick={() => controls.volume(.5)}>Volume: 50%</button>
            <button onClick={() => controls.volume(1)}>Volume: 100%</button>
            <br/>
            <button onClick={() => controls.seek(state.time - 5)}>-5 sec</button>
            <button onClick={() => controls.seek(state.time + 5)}>+5 sec</button>
        </div>
    )
}
```
