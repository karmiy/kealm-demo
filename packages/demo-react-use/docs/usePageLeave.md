## usePageLeave

响应用户离开当前页

内部用 mouseout 实现，只支持 PC 端

触发场景：

- 在切换浏览器会触发，鼠标静止的情况下再切换不会触发，需要切换前鼠标有移动过，影响不大

- 在切换浏览器标签 tab 前，鼠标离开页面但还未点到新 tab 时已触发，如果需要做用户可明星感知的效果，会在切到新 tab 前就出现，可能会出现体验问题

### 结构

```ts
function usePageLeave(
    onPageLeave: Function,
    args = []
): void;
```

### 函数与返回值

- Params:

    - onPageLeave: 事件触发回调

    - args: 依赖性，会被作为 useEffect 依赖

### 作用

- 监听并响应页面离开，执行相关操作

### 何时使用

- 希望监听用户是否离开当前页面

### 应用场景

- 在用户离开当前页时暂停页面中的定时器

### 源码细节

[usePageLeave 源码地址](https://github.com/streamich/react-use/blob/master/src/usePageLeave.ts)

- 利用 mouseout 配置 event.relatedTarget || event.toElement 实现页面离开监听

```tsx
const handler = event => {
    event = event ? event : (window.event as any);
    const from = event.relatedTarget || event.toElement;
    if (!from || (from as any).nodeName === 'HTML') {
    onPageLeave();
    }
};
```

### 示例

```tsx
function App() {
    usePageLeave(() => console.log('Page leave...'));

    return (
        <div className='app'>
            ...
        </div>
    )
}
```
