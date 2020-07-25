## useCopyToClipboard

将文件复制到剪切板(Ctrl + V 粘贴)

### 结构

```ts
interface CopyToClipboardState {
  value?: string;
  noUserInteraction: boolean;
  error?: Error;
}

function useCopyToClipboard(): [CopyToClipboardState, (value: string) => void];
```
### 参数与返回值

- Return:

    - state: 状态，拥有 value, noUserInteraction, error 属性

        - value: 粘贴值

        - error: 错误对象

        - noUserInteraction: 是否用户不需要额外的按键(execCommand, IE 的 clipboardData)

    - copyToClipboard: 函数，设置粘贴值

### 作用

- 将文本复制到剪切板

### 何时使用

- 需要将相应文本进行自动复制的操作时

### 应用场景

- 选中文本后自动复制选中内容

### 源码细节

[useCopyToClipboard 源码地址](https://github.com/streamich/react-use/blob/master/src/useCopyToClipboard.ts)

- 使用 [copy-to-clipboard](https://www.npmjs.com/package/copy-to-clipboard) 管理复制操作

### 示例

```tsx
function App() {
    const [text, setText] = React.useState('');
    const [state, copyToClipboard] = useCopyToClipboard();

    return (
        <div className='app'>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button type="button" onClick={() => copyToClipboard(text)}>copy text</button>
            {state.error
                ? <p>Unable to copy value: {state.error.message}</p>
                : state.value && <p>Copied {state.value}</p>}
        </div>
    )
}
```
