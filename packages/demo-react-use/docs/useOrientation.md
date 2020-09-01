## useOrientation

监听设备的纵横方向，即设备垂直或水平旋转时更新状态

### 结构

```ts
interface OrientationState {
    angle: number;
    type: string;
}

const defaultState: OrientationState = {
    angle: 0,
    type: 'landscape-primary',
};

function useOrientation(
    initialState: OrientationState = defaultState
): OrientationState;
```

### 函数与返回值

- Params:

    - initialState: 初始状态

- Return:

    - state

        - angle: 旋转角度

        - type: 'landscape-primary' (横向), 'portrait-primary' (纵向)

### 作用

- 监听设备的纵横方向

### 何时使用

- 希望监听设备当前是横向还是纵向，方向是左侧还是右侧

### 应用场景

- 在设备变为横向时，改变部分布局

### 源码细节

[useOrientation 源码地址](https://github.com/streamich/react-use/blob/master/src/useOrientation.ts)

### 示例

```tsx
function App() {
    const state = useOrientation();

    return (
        <div className='app'>
            <pre>
                {JSON.stringify(state, null, 2)}
            </pre>
        </div>
    )
}
```
