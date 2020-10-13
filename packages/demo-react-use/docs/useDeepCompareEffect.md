## useDeepCompareEffect

深度比较依赖的 useCustomCompareEffect

即 deps 中的某一个对象 { id: 1, obj: { name: 2 } }，即使引用变了，也不会触发 useEffect 回调

### 结构

```ts
import { DependencyList, EffectCallback } from 'react';

function useDeepCompareEffect<TDeps extends DependencyList>(
    effect: EffectCallback,
    deps: TDeps,
): void;
```

### 函数与返回值

- Params:

    - effect: 同 useEffect

    - deps: 同 useEffect

### 作用

- 通过深度比较执行 effect

### 何时使用

- 当现有的 useEffect 不满足条件，且 effect 执行时机在于深度比较前后依赖变化时

### 应用场景

- useCustomCompareEffect 需要深度比较的场景

### 源码细节

[useDeepCompareEffect 源码地址](https://github.com/streamich/react-use/blob/master/src/useDeepCompareEffect.ts)

- 二次封装 useDeepCompareEffect，利用 fast-deep-equal/react 作为深度比较函数

### 示例

```tsx
function App() {
    const [visible, setVisible] = useState(false);
    const option = { step: 2, obj: { id: 10 } };

    useDeepCompareEffect(() => {
        console.log(111);
    }, [option]);

    return (
        <div className='app'>
            <p>useCustomCompareEffect with deep comparison: {String(visible)}</p>
            <button onClick={() => setVisible(v => !v)}>toggle</button>
        </div>
    )
}
```
