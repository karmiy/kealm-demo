## useKeyPress

响应键盘按下与抬起状态

### 结构

```ts
type KeyFilter = null | undefined | string | ((event: KeyboardEvent) => boolean);

function useKeyPress(
    keyFilter: KeyFilter
): [boolean, KeyboardEvent | null];
```

### 函数与返回值

- Params:

    - keyFilter: 主要在于事件 event.key 的值，可以是字符串，函数等

- Return:

    - pressed: 当前是否按下，按下为 true，抬起 false

    - event: 事件对象

### 作用

- 在键盘按下和抬起时进行反馈

### 何时使用

- 需要监听某个键盘按键，根据返回的 pressed 执行不同的 useEffect 副作用操作

### 应用场景

- 开发功能按键，如按下 ` 键，根据返回的 pressed 判断是否正在按下，显示与隐藏帮助提示框

### 源码细节

[useKeyPress 源码地址](https://github.com/streamich/react-use/blob/master/src/useKeyPress.ts)

### 示例

```tsx
const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

function App() {
    const states = [];
    for (const key of keys) states.push(useKeyPress(key)[0]);

    return (
        <div className='app'>
            Try pressing numbers
            <br />
            {states.reduce((s, pressed, index) => s + (pressed ? (s ? ' + ' : '') + keys[index] : ''), '')}
        </div>
    )
}
```
