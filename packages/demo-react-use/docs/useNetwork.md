## useNetwork

监听网络状态

### 结构

```ts
interface NetworkState {
    online?: boolean;
    since?: Date;
    downlink?: number;
    downlinkMax?: number;
    effectiveType?: string;
    rtt?: number;
    type?: string;
}

function useNetwork(
    initialState: NetworkState = {}
): NetworkState;
```

### 函数与返回值

- Params:

    - initialState: 初始状态

- Return:

    - state: 当前网络状态

        - online: 当前是否有网络
    
        - since: online, offline 事件触发时间

        - downlink: 网络速度

        - downlinkMax: 最大网络速度

        - effectiveType: 网络类型

        - rtt: 往返时间

        - type: 网络类型

### 作用

- 监听网络状态

### 何时使用

- 希望根据当前是否有网，网络状态进行相关操作

### 应用场景

- 在网络断开时弹出相应提示框

### 源码细节

[useNetwork 源码地址](https://github.com/streamich/react-use/blob/master/src/useNetwork.ts)

### 示例

```tsx
function App() {
    const state = useNetwork();

    return (
        <div className='app'>
            <pre>
                {JSON.stringify(state, null, 2)}
            </pre>
        </div>
    )
}
```
