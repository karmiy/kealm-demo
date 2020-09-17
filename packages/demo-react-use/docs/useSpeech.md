## useSpeech

H5 语音合成，讲文本用语音的方式播放出来

使用的是 H5 [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) 类，还在实验阶段

### 结构

```ts
interface SpeechState {
    isPlaying: boolean;
    lang: string;
    voice: SpeechSynthesisVoice;
    rate: number;
    pitch: number;
    volume: number;
}

interface SpeechOptions {
    lang?: string;
    voice?: SpeechSynthesisVoice;
    rate?: number;
    pitch?: number;
    volume?: number;
}

function useSpeech(
    text: string, 
    opts: SpeechOptions = {}
): SpeechState;
```

### 函数与返回值

- Params:

    - text: 语音合成的文本

    - opts: 配置项，SpeechSynthesisUtterance 实例的属性

        - lang: 语言

        - voice: 说出语音的声音

        - rate: 语速

        - pitch: 音调

        - volume: 音量

- Return:

    - state: 当前状态

### 作用

- 使用 H5 SpeechSynthesisUtterance 将文本转为语音

### 何时使用

- 希望在组件初始化时将文本内容转为语音播放

### 应用场景

- 封装语音合成，文本转语音组件

### 源码细节

[useSpeech 源码地址](https://github.com/streamich/react-use/blob/master/src/useSpeech.ts)

### 示例

```tsx
const voices = window.speechSynthesis.getVoices();

function App() {
    const state = useSpeech('Hello world!', { rate: 0.8, pitch: 0.5, voice: voices[0] });

    return (
        <div className='app'>
            <pre>
                {JSON.stringify(state, null, 2)}
            </pre>
        </div>
    )
}
```
