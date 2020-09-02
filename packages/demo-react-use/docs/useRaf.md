## useRaf

在一定时间内不断调用 requestAnimationFrame 触发组件 render，返回当前时间在总时间的占比

### 结构

```ts
function useRaf(
    ms: number = 1e12, 
    delay: number = 0
): number;
```

### 函数与返回值

- Params:

    - ms: 总时长

    - delay: 组件初始化后，hook 开始响应的延迟

- Return:

    - elapsed: 当前时间在总时间的占比

### 作用

- 在规定时间内利用 requestAnimationFrame 不断触发组件 render，使用者根据 elapsed 占比更新所需视图

### 何时使用

- 希望在组件初始后的一段时间内执行某些动画

### 应用场景

- 页面入场动画效果，进入页面时，右滑 150ms 入场，根据 elapsed 占比 setState 页面容器的 translateX

### 源码细节

[useRaf 源码地址](https://github.com/streamich/react-use/blob/master/src/useRaf.ts)

### 更多看法

- 可以新增配置项，或时长为 null 时不执行，因为如执行动画可能并不是组件初始就立即执行的，灵活性不够

### 示例

```tsx
function App() {
    const elapsed = useRaf(2000, 1000);

    return (
        <div className='app'>
            <div style={{
                position: 'relative',
                width: 100,
                height: 100,
                border: '1px solid #1394ff',
                left: 300 * elapsed,
            }} />
        </div>
    )
}
```
