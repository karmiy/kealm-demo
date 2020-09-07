## useRafState

使用 requestAnimationFrame 对 useState 的 setState 进行防抖处理

### 结构

```ts
import { Dispatch, SetStateAction } from 'react';

function useRafState<S>(
    initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];
```

### 函数与返回值

- Params:

    - initialState: 同 useState 参数

- Return:

    - state: 同 useState 返回值，当前状态

    - setState: 同 useState 返回值，更新状态函数

### 作用

- 对高频的 setState 更新状态使用 requestAnimationFrame 进行防抖处理，防止高频 render 造成的性能问题

### 何时使用

- 希望对高频更新的状态进行防抖处理

### 应用场景

- 在页面大小变化监听 resize 事件，更新某些状态时进行防抖处理

- 对鼠标移动坐标更新进行防抖处理

### 源码细节

[useRafState 源码地址](https://github.com/streamich/react-use/blob/master/src/useRafState.ts)

### 示例

```tsx
function App() {
    const [state, setState] = useRafState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const onResize = () => {
            setState({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
      
        window.addEventListener('resize', onResize);
      
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div className='app'>
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    )
}
```
