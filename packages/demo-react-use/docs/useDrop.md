## useDrop

追踪整个页面的事件：文件拖拽、链接拖拽、右键粘贴

### 结构

```ts
interface DropAreaOptions {
    onFiles?: (files: File[], event?) => void;
    onText?: (text: string, event?) => void;
    onUri?: (url: string, event?) => void;
}

interface DropAreaState {
    over: boolean;
}

function useDrop(
    options: DropAreaOptions,
    args: Array<any>
): DropAreaState;
```

### 函数与返回值

- Params:

    - options: 配置项，响应事件回调

        - onFiles: 拖拽文件进入页面，放手时触发

        - onText: 粘贴时触发

        - onUri: 拖拽链接放手时触发

    - args: 其他依赖项，可用于刷新事件绑定，作用不大

- Return:

    - over: 是否在页面中拖拽，如文件拖拽进页面时和移动过程中为 true，离开页面时为 false

### 作用

- 追踪整个页面的拖拽、粘贴事件，获取文件、链接、粘贴文本

### 何时使用

- 需要在整个页面监听以上事件获取相关数据时

### 应用场景

- 开发文件上传功能，获取被拖拽进页面的 file 文件进行上传操作

### 源码细节

[useDrop 源码地址](https://github.com/streamich/react-use/blob/master/src/useDrop.ts)

- 将事件行为封装为 createProcess 高阶函数，复用性好

### 示例

```tsx
function App() {
    const state = useDrop({
        onFiles: files => console.log('files', files),
        onUri: uri => console.log('uri', uri),
        onText: text => console.log('text', text),
    });

    return (
        <div className='app'>
            <p>Drop something on the page.</p>
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
