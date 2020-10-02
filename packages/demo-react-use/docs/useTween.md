## useTween

给定一个时间，使用 easing 缓动函数返回一个 0 - 1 的值

### 结构

```ts
function useTween(
    easingName: string = 'inCirc',
    ms: number = 200,
    delay: number = 0
): number;
```

### 函数与返回值

- Params:

    - easingName: 缓动动画函数名，可选项在 [ts-easing](https://github.com/streamich/ts-easing/blob/master/src/index.ts)

    - ms: 动画时长

    - delay: 组件初始化后，hook 开始响应的延迟

- Return:

    - elapsed: 当前占比

### 作用

- 实现一个可选 easing 缓动函数的动画

### 何时使用

- 希望选择一个缓动函数实现一个动画效果

### 应用场景

- 实现一个 elastic 效果的入场动画

### 源码细节

[useTween 源码地址](https://github.com/streamich/react-use/blob/master/src/useTween.ts)

- 使用第三方库 [ts-easing](https://www.npmjs.com/package/ts-easing)

### 更多看法

- 可以新增配置项，或时长为 null 时不执行，因为如执行动画可能并不是组件初始就立即执行的，灵活性不够

### 示例

```tsx
function App() {
    const t = useTween('inCirc', 2000);

    return (
        <div className='app'>
            <div style={{
                position: 'relative',
                width: 100,
                height: 100,
                border: '1px solid #1394ff',
                left: 300 * t,
            }} />
        </div>
    )
}
```
