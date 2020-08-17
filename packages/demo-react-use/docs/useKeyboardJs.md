## useKeyboardJs

响应键盘组合键，返回按下状态

> 注：该 hook 较为特殊，需要 install 引入 keyboardjs，并且引入方式也不同

### 结构

```ts
function useKeyboardJs(
    combination: string | string[]
): [boolean, KeyboardEvent | null];
```

### 函数与返回值

- Params:

    - combination: 键盘组合键，如 'a + b', ['a', 'b'] 都表示键盘按下 a, b 键

- Return:

    - pressed: 当前是否按下，按下为 true，抬起 false

    - event: 事件对象

### 作用

- 响应键盘组合键，返回当前是否按下的状态

### 何时使用

- 需要监听键盘某些组合键，并根据返回的 pressed 状态执行相应操作

### 应用场景

- 开发 markdown 编辑器，监听 ctrl + c 等组合键做快捷键功能

### 源码细节

[useKeyboardJs 源码地址](https://github.com/streamich/react-use/blob/master/src/useKeyboardJs.ts)

- 合理使用第三方库 [keyboardjs](https://www.npmjs.com/package/keyboardjs)

- 异步加载 keyboardjs，实现懒加载，性能优化

```tsx
useMount(() => {
    import('keyboardjs').then(k => setKeyboardJs(k.default || k));
});
```

### 示例

```tsx
function App() {
    const [isPressed] = useKeyboardJs(['a + b']);

    return (
        <div className='app'>
            [a + b] pressed: {isPressed ? 'Yes' : 'No'}
        </div>
    )
}
```
