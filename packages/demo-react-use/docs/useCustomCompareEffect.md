## useCustomCompareEffect

自定义依赖比较的 useEffect

通常 useEffect 在依赖变化时便会执行

useCustomCompareEffect 给了使用者一个可控条件，手动控制 effect 是否执行

### 结构

```ts
// TODO: 官方是 (prevDeps: TDeps, nextDeps: TDeps)，看了源码感觉是错的，应该是反过来
// https://github.com/streamich/react-use/issues/1390
import { DependencyList, EffectCallback } from 'react';

type DepsEqualFnType<TDeps extends DependencyList> = (nextDeps: TDeps, prevDeps: TDeps) => boolean;

function useCustomCompareEffect<TDeps extends DependencyList>(
    effect: EffectCallback,
    deps: TDeps,
    depsEqual: DepsEqualFnType<TDeps>
): void;
```

### 函数与返回值

- Params:

    - effect: 同 useEffect

    - deps: 同 useEffect

    - depsEqual: 比较函数，返回 false 表示不相等，触发 effect 执行

### 作用

- 创建手动控制执行的 useEffect

### 何时使用

- 当现有的 useEffect 不满足条件，希望手动控制 effect 执行时机

- deps 里含有对象，并希望通过比较对象里的属性值来控制渲染

### 应用场景

- 在模态框 modal 显示时执行某些操作

### 源码细节

[useCustomCompareEffect 源码地址](https://github.com/streamich/react-use/blob/master/src/useCustomCompareEffect.ts)

- 利用 ref.current 作为内部 useEffect 的依赖，控制 useEffect 不执行，在 depsEqual 返回 false 后手动更新 ref.current，触发执行，来达到条件执行 effect 的效果

- 校验细致，判断 deps 是否都是基础数据类型，是则提示使用 useEffect，因为当 deps 都是基础数据类型时，使用 useEffect 就够了

### 示例

```tsx
function App() {
    const [visible, setVisible] = useState(false);

    useCustomCompareEffect(() => {
        // 当 visible 为 true 时触发
        console.log(111);
    }, [{ visible }], (nextDeps) => !nextDeps[0].visible);

    return (
        <div className='app'>
            <p>useCustomCompareEffect with deep comparison: {String(visible)}</p>
            <button onClick={() => setVisible(v => !v)}>toggle</button>
        </div>
    )
}
```
