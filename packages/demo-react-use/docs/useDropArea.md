## useDropArea

追踪特定元素的事件：文件拖拽、链接拖拽、右键粘贴

### 结构

```ts
interface DropAreaOptions {
    onFiles?: (files: File[], event?) => void;
    onText?: (text: string, event?) => void;
    onUri?: (url: string, event?) => void;
}

interface DropAreaBond {
    onDragOver: React.DragEventHandler;
    onDragEnter: React.DragEventHandler;
    onDragLeave: React.DragEventHandler;
    onDrop: React.DragEventHandler;
    onPaste: React.ClipboardEventHandler;
}

interface DropAreaState {
    over: boolean;
}

function useDropArea(
    options: DropAreaOptions
): [DropAreaBond, DropAreaState];
```

### 函数与返回值

- Params:

    - options: 配置项，响应事件回调

        - onFiles: 拖拽文件进入页面，放手时触发

        - onText: 粘贴时触发

        - onUri: 拖拽链接放手时触发

- Return:

    - bond: 拖拽、粘贴事件，需挂载于指定元素上
    - state: 状态

        - over: 是否在页面中拖拽，如文件拖拽进页面时和移动过程中为 true，离开页面时为 false

### 作用

- 追踪特定元素的拖拽、粘贴事件，获取文件、链接、粘贴文本

### 何时使用

- 需要在特定监听以上事件获取相关数据时

### 应用场景

- 开发 markdown 编辑器，在编辑区域内拖拽或右键粘贴图片时获取 file 对象

### 源码细节

[useDropArea 源码地址](https://github.com/streamich/react-use/blob/master/src/useDropArea.ts)

### 更多看法

- options 中的事件(onFiles, onText, onUri)如果引用地址不变，将无法响应粘贴事件，因为 createProcess 的 isMounted 始终返回 false，不知是否是源码实现中的失误

### 示例

```tsx
function App() {
    const [bond, state] = useDropArea({
        onFiles: files => console.log('files', files),
        onUri: uri => console.log('uri', uri),
        onText: text => console.log('text', text),
    });

    return (
        <div className='app'>
            <p {...bond}>Drop something here.</p>
            <p>over: {state.over.toString()}</p>
            <a href='https://github.com/streamich/react-use/blob/master/docs/useDrop.md' 
                draggable 
                style={{backgroundColor: '#1394ff'}}
            >
                draggable
            </a>
        </div>
    )
}
```
