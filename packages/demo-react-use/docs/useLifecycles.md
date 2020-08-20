## useLifecycles

挂载组件生命周期中初始和销毁事件

相当于:

```tsx
useEffect(() => {

}, [])
```

### 结构

```ts
function useLifecycles(
    mount: Function;
    unmount?: Function;
): void;
```

### 函数与返回值

- Params:

    - mount: 初始化时执行的钩子，将在初始 useEffect 中执行

    - unmount: 组件销毁时执行的钩子

### 作用

- 在组件生命周期的开始与销毁时执行操作

### 何时使用

- 希望在组件初始化和销毁时执行一些操作

### 应用场景

- 组件初始化时挂载全局挂载 scroll 事件，组件销毁时卸载

### 源码细节

[useLifecycles 源码地址](https://github.com/streamich/react-use/blob/master/src/useLifecycles.ts)

### 示例

```tsx
function App() {
    useLifecycles(() => console.log('MOUNTED'), () => console.log('UNMOUNTED'));

    return (
        <div className='app'>
            ...
        </div>
    )
}
```
