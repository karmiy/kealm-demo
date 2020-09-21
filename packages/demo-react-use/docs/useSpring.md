## useSpring

指定目标值，在一段时间内不断以弹簧动力效果更新值，实现弹簧动力效果

> 需要安装 [rebound](https://www.npmjs.com/package/rebound)

### 结构

```ts
function useSpring(
    targetValue: number = 0,
    tension: number = 50,
    friction: number = 3
): number;
```

### 函数与返回值

- Params:

    - targetValue: 目标值，最终要达到的数值

    - tension: 拉力

    - friction: 摩擦力

- Return:

    - value: 当前数值

### 作用

- 模仿弹簧动力学

### 何时使用

- 希望在一些动画上有弹簧动力效果

### 应用场景

- 做某些动效，如点击元素后放大，并且有弹簧震感

### 源码细节

[useSpring 源码地址](https://github.com/streamich/react-use/blob/master/src/useSpring.ts)

- 使用 [rebound](https://www.npmjs.com/package/rebound) 为基底实现

### 示例

```tsx
import useSpring from 'react-use/lib/useSpring';

function App() {
    const [target, setTarget] = useState(100);
    const value = useSpring(target);

    return (
        <div className='app'>
            <div style={{
                position: 'absolute',
                width: 50,
                height: 50,
                left: 200,
                top: 200,
                backgroundColor: '#1394ff',
                transform: `scale(${value / 100})`,
            }}></div>
            {value}
            <br />
            <button onClick={() => setTarget(50)}>Set 50</button>
            <button onClick={() => setTarget(200)}>Set 200</button>
        </div>
    )
}
```
