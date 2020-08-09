## useHarmonicIntervalFn

执行一个同谐波的 setInterval，即同一个 delay 时长的定时器，会进行合并

如定义个 delay 为 1000 的 setInterval，等待 500 ms 后创建第 2 个 delay 为 1000 的 setInterval，那么这 2 个定时器会合并，即 1s 后第 2 个定时器的回调也会和第 1 个一起执行

### 结构

```ts
import { Dispatch } from 'react';

type InitialHookState<S> = S | (() => S);

type HookState<S> = S | ((prevState: S) => S);

function useHarmonicIntervalFn(
    fn: Function,
    delay: number | null
): void;
```

### 函数与返回值

- Params:

    - fn: 定时器回调

    - delay: 定时器延迟，默认 0

### 作用

- 创建同谐波的 setInterval，将同 delay 的回调进行合并

### 何时使用

- 希望创建一个 setInterval 定时器，并将回调中的逻辑进行解耦

### 应用场景

- 开发一个聊天对话框，在为了兼容不支持 websocket 的环境或场景，需要创建一个轮询定时器进行如请求数据等操作，回调中可能需要执行需要不相关的逻辑，为了更如何 hook 逻辑解耦的特性，可以同时创建多个 useHarmonicIntervalFn，分别执行各个逻辑

### 源码细节

[useHarmonicIntervalFn 源码地址](https://github.com/streamich/react-use/blob/master/src/useHarmonicIntervalFn.ts)

- 使用第三方库 [set-harmonic-interval](https://www.npmjs.com/package/set-harmonic-interval) 作为核心驱动

### 示例

```tsx
function App() {
    useHarmonicIntervalFn(() => {
        console.log('interval-1');
    }, 1000);

    useHarmonicIntervalFn(() => {
        console.log('interval-2');
    }, 1000);

    return (
        <div className='app' />
    )
}
```
