## useShallowCompareEffect

对 useEffect 的 deps 依赖只做浅比较，即当 deps 中的对象引用变了，但属性值没有变化时不会触发 useEffect 回调的执行

即 deps 中的某一个对象 { id: 1 }，即使引用变了，也不会触发 useEffect 回调，但要注意只是浅比较，{ id: 1, obj: { name: 2 } } 依旧会触发回调

### 结构

```ts
import { DependencyList, EffectCallback } from 'react';

function useShallowCompareEffect(
    effect: EffectCallback, 
    deps: DependencyList
): void;
```

### 函数与返回值

- Params:

    - effect: 同 useEffect

    - deps: 同 useEffect

### 作用

- 对 useEffect 的 deps 依赖只做浅比较，防止依赖中的对象引用变化但是实际内容不变时触发无意义的回调执行

### 何时使用

- 希望以对象作为 useEffect 的依赖，但不希望对象内容不变时执行回调

### 应用场景

- 开发组件，某个 prop 是个对象，这在将该对象作为 useEffect 依赖非常有用，因为用户在使用组件时对于对象类型的 prop 往往是直接 { key: value } 传递的，很少会特意控制引用不变

### 源码细节

[useShallowCompareEffect 源码地址](https://github.com/streamich/react-use/blob/master/src/useShallowCompareEffect.ts)

- 以 useCustomCompareEffect 为基层二次封装

- 对于开发环境，会做校验，如果 deps 不是数组、是空数组、每一项都是基础数据类型，会打印警告，告知使用 useShallowCompareEffect 是没必要的，使用 useEffect 替换。且生产环境不做提示，很细节

- 使用 [fast-shallow-equal](https://www.npmjs.com/package/fast-shallow-equal) 作为浅比较工具库

### 示例

```tsx
function App() {
    const [visible, setVisible] = useState(false);
    const option = { step: 2 };

    useShallowCompareEffect(() => {
        console.log(111);
    }, [option]);

    return (
        <div className='app'>
            <p>useCustomCompareEffect with shallow comparison: {String(visible)}</p>
            <button onClick={() => setVisible(v => !v)}>toggle</button>
        </div>
    )
}
```
