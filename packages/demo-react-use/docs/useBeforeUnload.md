## useBeforeUnload

页面离开前 hook

试验发现 message 无效，并且只在 PC 端有效，慎用

### 结构

```ts
function useBeforeUnload(
    enabled: boolean | (() => boolean) = true, 
    message?: string): void;
```

### 函数与返回值

- Params:

    - enabled: 是否开启 hook

    - message: 提示信息

### 作用

- 在浏览器刷新页面和关闭页面前触发提示

### 何时使用

- 希望在刷新或关闭页面前提示

### 示例

```tsx
function App() {
    const [dirty, toggleDirty] = useToggle(false);
    useBeforeUnload(dirty, 'You have unsaved changes, are you sure?');

    return (
        <div className='app'>
            {dirty && <p>Try to reload or close tab</p>}
            <button onClick={() => toggleDirty()}>{dirty ? 'Disable' : 'Enable'}</button>
        </div>
    )
}
```
