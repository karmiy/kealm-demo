## useEvent

事件挂载

### 结构

```ts
interface ListenerType1 {
    addEventListener(name: string, handler: (event?: any) => void, ...args: any[]);
    removeEventListener(name: string, handler: (event?: any) => void, ...args: any[]);
}

interface ListenerType2 {
    on(name: string, handler: (event?: any) => void, ...args: any[]);
    off(name: string, handler: (event?: any) => void, ...args: any[]);
}

type UseEventTarget = ListenerType1 | ListenerType2;

type AddEventListener<T> = T extends ListenerType1 ? T['addEventListener'] : T extends ListenerType2 ? T['on'] : never;

function useEvent<T extends UseEventTarget>(
    name: Parameters<AddEventListener<T>>[0],
    handler?: null | undefined | Parameters<AddEventListener<T>>[1],
    target: null | T | Window,
    options?: Parameters<AddEventListener<T>>[2]
): void;
```

### 函数与返回值

- Params:

    - name: 事件名，如 click

    - handler: 事件回调

    - target: 事件绑定目标元素

    - options: addEventListener 的 options 参数

### 作用

- 给元素绑定对应事件，并在适当时机（依赖变化、组件卸载等）自动卸载事件

### 何时使用

- 需要给非组件内 render 的 DOM 元素挂载事件时

> 组件内的 DOM 可以直接挂载事件，不需要使用 useEvent 挂载，如下:

```tsx
function App() {
    const onClick = useCallback(() => {
        // ...
    }, []);

    return (
        <div onClick={onClick}>
        </div>
    )
}
```

### 应用场景

- 给 window 挂载 scroll 事件

### 源码细节

[useEvent 源码地址](https://github.com/streamich/react-use/blob/master/src/useEvent.ts)

- 在 useEffect 中挂载事件，并在返回的函数中卸载事件，保证事件自动卸载

- 对于对象依赖 options，使用 JSON.stringify 转为字符串再作为依赖，保证在 options 引用变化，但是内容不变时，事件不需要重新挂载

### 更多看法

无法挂载未 render 的 DOM 或 ref.current 挂载的 DOM，因为最开始作为参数传入 useEvent 时是 null 的，导致 useEvent 在挂载时判断会找不到 target

- 作者的初衷应该是认为组件内的元素可以直接挂载事件，不需要使用 useEvent 挂载，但是实际场景是可能需要的，如二次封装自定义 hook，该 hook 可能接收的参数就是个 ref，在该 hook 内部需要对 ref 上的 DOM 绑定事件，这时就无法利用 useEvent 给 ref.current 挂载事件了

- target 参数应该新增 ref 与 () => HTMLElement 的类型

### 示例

```tsx
function App() {
    const onScroll = useCallback((e: Event) => {
        console.log('scroll', e);
    }, []);

    useEvent('scroll', onScroll); // 给 window 挂载滚动事件

    return (
        <div className='app'>
            ...
        </div>
    )
}
```
