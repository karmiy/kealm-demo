## useEffectOnce

只执行一次的 useEffect，相当于异步的 componentDidMount（称其异步，因为内部使用的是 useEffect 而不是 useLayoutEffect）+ componentWillMount

### 结构

```ts
import { EffectCallback } from 'react';

function useEffectOnce(effect: EffectCallback): void;
```

### 函数与返回值

- Params:

    - effect: 同 useEffect

### 作用

- 执行在组件有效期间只期望执行一次的操作

### 何时使用

- 当执行的内容需要在组件初始化时执行，且只执行一次

- 初始化执行，伴随着可选的卸载操作

### 应用场景

- 页面初始化时挂载页面 scroll 事件

### 源码细节

[useEffectOnce 源码地址](https://github.com/streamich/react-use/blob/master/src/useEffectOnce.ts)

### 示例

```tsx
function App() {
    useEffectOnce(() => {
        const onScroll = () => {};

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    });

    return (
        <div className='app'>
            ...
        </div>
    )
}
```
