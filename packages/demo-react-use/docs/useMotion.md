## useMotion

使用 H5 设备运动事件，包括：

- accelerationIncludingGravity 重力加速度

- acceleration 加速度

- rotationRate 旋转速度

- interval 获取的时间间隔

> IOS13 无法直接使用，似乎需要判断事件与手机配置

### 结构

```ts
interface MotionSensorState {
    acceleration: {
        x: number | null;
        y: number | null;
        z: number | null;
    };
    accelerationIncludingGravity: {
        x: number | null;
        y: number | null;
        z: number | null;
    };
    rotationRate: {
        alpha: number | null;
        beta: number | null;
        gamma: number | null;
    };
    interval: number | null;
}

const defaultState: MotionSensorState = {
    acceleration: {
        x: null,
        y: null,
        z: null,
    },
    accelerationIncludingGravity: {
        x: null,
        y: null,
        z: null,
    },
    rotationRate: {
        alpha: null,
        beta: null,
        gamma: null,
    },
    interval: 16,
};

function useMotion(
    initialState: MotionSensorState = defaultState
): MotionSensorState;
```

### 函数与返回值

- Params:

    - initialState: 初始状态

- Return:

    - state: 当前状态

### 作用

- 利用 H5 的 devicemotion 获取设备运动状态

### 何时使用

- 希望监听手机的运动状态，如手机运动速度，旋转角度等

### 应用场景

- 开发摇一摇功能，监听运动速度和轨迹判断是否是摇一摇操作

### 源码细节

[useMotion 源码地址](https://github.com/streamich/react-use/blob/master/src/useMotion.ts)

### 示例

```tsx
function App() {
    const state = useMotion();

    return (
        <div className='app'>
            <pre>
                {JSON.stringify(state, null, 2)}
            </pre>
        </div>
    )
}
```
