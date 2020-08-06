## useGeolocation

使用 H5 navigator.geolocation 地理位置定位

### 结构

```ts
interface GeoLocationSensorState {
    loading: boolean;
    accuracy: number | null;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    latitude: number | null;
    longitude: number | null;
    speed: number | null;
    timestamp: number | null;
    error?: Error | PositionError;
}

function useGeolocation(options?: PositionOptions): GeoLocationSensorState;
```

### 函数与返回值

- Params:

    - options: [position options](https://developer.mozilla.org/zh-CN/docs/Web/API/PositionOptions)

- Return:

    - state: 定位信息

### 作用

- 使用 H5 的地理位置

### 何时使用

- 需要使用 H5 的地理位置 API 获取信息

### 应用场景

- 需要展示或使用用户地理位置信息的场景

### 源码细节

[useGeolocation 源码地址](https://github.com/streamich/react-use/blob/master/src/useGeolocation.ts)

### 示例

```tsx
function App() {
    const state = useGeolocation();

    return (
        <div className='app'>
            <pre>
                {JSON.stringify(state, null, 2)}
            </pre>
        </div>
    )
}
```
