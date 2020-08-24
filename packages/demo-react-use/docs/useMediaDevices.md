## useMediaDevices

跟踪可用的媒体输入和输出设备的列表，主要利用 navigator.mediaDevices.enumerateDevices()

### 结构

```ts
interface Devices {
    devices: {
        deviceId: string, 
        groupId: string, 
        kind: MediaDeviceKind, 
        label: string
    }
}
function useMediaDevices(): Devices;
```

### 函数与返回值

- Return:

    - state
    
        - devices : 设置信息

### 作用

- 跟踪可用的媒体输入和输出设备的列表

### 何时使用

- 希望跟踪可用的媒体输入和输出设备的列表

### 应用场景

- 查询是否可用摄像头

### 源码细节

[useMediaDevices 源码地址](https://github.com/streamich/react-use/blob/master/src/useMediaDevices.ts)

### 示例

```tsx
function App() {
    const state = useMediaDevices();

    return (
        <div className='app'>
            <pre>
                {JSON.stringify(state, null, 2)}
            </pre>
        </div>
    )
}
```
