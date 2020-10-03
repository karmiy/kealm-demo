## useVibrate

使用 [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API) 触发设备震动

### 结构

```ts
import { EffectCallback } from 'react';

function useVibrate(
    enabled: boolean = true,
    pattern: VibrationPattern = [1000, 1000],
    loop: boolean = true
): void;
```

### 函数与返回值

- Params:

    - enabled: 是否启动

    - pattern: navigator.vibrate 的参数值

    - loop: 是否循环

### 作用

- 触发设备震动

### 何时使用

- 希望让设备震动达到某些效果

### 应用场景

- 收到服务端返回的消息时触发设备震动

### 源码细节

[useVibrate 源码地址](https://github.com/streamich/react-use/blob/master/src/useVibrate.ts)

### 示例

```tsx
function App() {
    const [vibrating, toggleVibrating] = useToggle(false);

    useVibrate(vibrating, [300, 100, 200, 100, 1000, 300], false);

    return (
        <div className='app'>
            <button onClick={toggleVibrating}>{vibrating ? 'Stop' : 'Vibrate'}</button>
        </div>
    )
}
```
