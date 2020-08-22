## useIdle

跟踪用户是否空闲

### 结构

```ts
type Element = ((state: boolean) => React.ReactElement<any>) | React.ReactElement<any>;

const defaultEvents = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];

function useIdle(
    ms: number = 60e3,
    initialState: boolean = false,
    events: string[] = defaultEvents
): [boolean];
```

### 函数与返回值

- Params:

    - ms: 空闲间隔的毫秒数，即非空闲状态开始，多久之后重置为空闲状态，默认 1 分钟

    - initialState: 初始状态，默认 false

    - events: 用于判断的事件，触发了这些事件代表用户当前不空闲，默认为 'mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'

- Return:

    - isIdle: 当前是否空闲

### 作用

- 监听页面空闲状态

### 何时使用

- 需要监听用户在当前页面的活跃状态进行相应操作

### 应用场景

- 监听用户活跃状态，在空闲时开启如屏保之类的效果

### 源码细节

[useIdle 源码地址](https://github.com/streamich/react-use/blob/master/src/useIdle.ts)

- 使用第三方库 [throttle-debounce](https://www.npmjs.com/package/throttle-debounce) 作响应节流

### 示例

```tsx
function App() {
    const isIdle = useIdle(3e3);

    return (
        <div className='app'>
            <div>User is idle: {isIdle ? 'Yes 😴' : 'Nope'}</div>
        </div>
    )
}
```
