## useStartTyping

在开始打字时触发

### 结构

```ts
function useStartTyping(
    onStartTyping: (event: KeyboardEvent) => void,
): void;
```

### 函数与返回值

- Params:

    - onStartTyping: 开始打字时触发的回调

### 作用

- 监听用户打字响应

### 何时使用

- 希望监听用户打字响应（0 - 9, a - z）

### 应用场景

- 监听用户打字响应的任何场景

### 源码细节

[useStartTyping 源码地址](https://github.com/streamich/react-use/blob/master/src/useStartTyping.ts)

### 示例

```tsx
function App() {
    useStartTyping(() => alert('Started typing...'));

    return (
        <div className='app'>
            ...
        </div>
    )
}
```
