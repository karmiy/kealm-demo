## useUpdateEffect

忽略 useEffect 的第一次调用，有点类似于 componentDidUpdate

### 结构

```ts
import { EffectCallback } from 'react';

function useUpdateEffect(
    effect: EffectCallback,
    deps?: DependencyList
): void;
```

### 函数与返回值

- Params:

    - effect: 同 useEffect

    - deps: 同 useEffect

### 作用

- 忽略 useEffect 第一次执行，达到依赖更新触发的效果

### 何时使用

- 希望实现监听依赖更新

### 应用场景

- 任何需要监听数据更新的场景

### 源码细节

[useUpdateEffect 源码地址](https://github.com/streamich/react-use/blob/master/src/useUpdateEffect.ts)

### 示例

```tsx
function App() {
    const [count, setCount] = React.useState(0);
  
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count => count + 1);
        }, 1000);
        
        return () => {
            clearInterval(interval);
        }
    }, []);

    useUpdateEffect(() => {
        console.log('count', count); // will only show 1 and beyond
        
        return () => { // *OPTIONAL*
            // do something on unmount
        }
    }); // you can include deps array if necessary

    return (
        <div className='app'>
            Count: {count}
        </div>
    )
}
```
