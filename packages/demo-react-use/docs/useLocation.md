## useLocation

获取 window.location 相关信息

### 结构

```ts
interface LocationSensorState {
    trigger: string;
    state?: any;
    length?: number;
    hash?: string;
    host?: string;
    hostname?: string;
    href?: string;
    origin?: string;
    pathname?: string;
    port?: string;
    protocol?: string;
    search?: string;
}

function useLocation<T>(): LocationSensorState;
```

### 函数与返回值

- Return:

    - state: window.location 的一些列属性 + window.history 的 state, length 属性

### 作用

-  获取 window.location 的信息

### 何时使用

- 希望获取 window.location 的相关信息

### 应用场景

- 与 window.location 有关的任何场景

### 源码细节

[useLocation 源码地址](https://github.com/streamich/react-use/blob/master/src/useLocation.ts)

- 判断浏览器环境与事件兼容，选择 useLocationBrowser 或 useLocationServer

### 示例

```tsx
function App() {
    const state = useLocation();

    return (
        <div className='app'>
            <pre>
                {JSON.stringify(state, null, 2)}
            </pre>
        </div>
    )
}
```
