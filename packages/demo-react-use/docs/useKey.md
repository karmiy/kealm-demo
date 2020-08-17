## useKey

响应键盘按键

> 注：useKey 绑定的按下事件，在按下未松开过程中，会一直触发

### 结构

```ts
type KeyFilter = null | undefined | string | ((event: KeyboardEvent) => boolean);

type Handler = (event: KeyboardEvent) => void;

interface UseKeyOptions {
    event?: 'keydown' | 'keypress' | 'keyup';
    target?: UseEventTarget; // UseEventTarget 类型查看 useEvent
    options?: any;
}

function useKey(
    key: KeyFilter,
    fn: Handler,
    opts: UseKeyOptions,
    deps: React.DependencyList
): void;
```

### 函数与返回值

- Params:

    - key: 主要在于事件 event.key 的值，可以是字符串，函数等

    - fn: key 满足时执行的回调

    - opts: 配置项

        - event: 事件名，'keydown' | 'keypress' | 'keyup'，默认 keydown

        - target: DOM 节点

        - options: 事件函数的配置，如 addEventListener 的 第 3 个参数

    - deps: 依赖项，依赖改变时更新

### 作用

- 在相应的键盘按键时**持续**执行一些行为

### 何时使用

- 需要监听某个键盘按键，并在按键时执行相应行为，且按下的行为在松开时可持续触发

### 应用场景

- 开发累加功能，在按住某个按键持续累加某个值

- 开发聊天消息发送功能，监听用户键盘输入 Enter 回车键，发送用户消息

### 源码细节

[useKey 源码地址](https://github.com/streamich/react-use/blob/master/src/useKey.ts)

- key 参数灵活性强，可以是 null | undefined | string | ((event: KeyboardEvent) => boolean)，并用一个 createKeyPredicate 函数进行结果转化，根据结果的 boolean 判断是否触发 handler

```tsx
const createKeyPredicate = (keyFilter: KeyFilter): KeyPredicate =>
    typeof keyFilter === 'function'
        ? keyFilter
        : typeof keyFilter === 'string'
        ? (event: KeyboardEvent) => event.key === keyFilter
        : keyFilter
        ? () => true
        : () => false;
```

### 示例

```tsx
function App() {
    const [count, set] = useState(0);
    const increment = () => set(count => ++count);
    useKey('ArrowUp', increment); // 监听用户键盘 ↑ 按键

    return (
        <div className='app'>
            Press arrow up: {count}
        </div>
    )
}
```
