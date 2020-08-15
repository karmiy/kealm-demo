## useIntersection

使用 IntersectionObserver API 观察元素是否可见

### 结构

```ts
function useIntersection(
    ref: RefObject<HTMLElement>,
    options: IntersectionObserverInit
): IntersectionObserverEntry | null;
```

### 函数与返回值

- Params:

    - ref: useRef 挂载的 DOM 节点

    - options: [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) 的配置项，主要有 root, rootMargin, threshold 属性

- Return:

    - intersection: [IntersectionObserver 返回值](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)

### 作用

- 观察元素是否可见，传统的做法是监听 scroll 事件判断元素的 getBoundingClientRect 判断是否在视口，该 hook 主要使用新的 IntersectionObserver API 来实现

### 何时使用

- 需要观察元素是否可见，响应不同操作

### 应用场景

- 观察 video 视频的滚动状态，在滚动到 video 元素可见一半时 play 播放，反之 pause 暂停

### 源码细节

[useIntersection 源码地址](https://github.com/streamich/react-use/blob/master/src/useIntersection.ts)

- 利用 IntersectionObserver API 做观察者，性能更好（但是要注意兼容性，需要时使用 polyfill 在全局 window 挂载该函数，因为源码中是判断是否全局下有此 API）

```tsx
useEffect(() => {
    if (ref.current && typeof IntersectionObserver === 'function') {
        ...
    }
}, [...]);
```

### 示例

```tsx
function App() {
    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
        root: null,
        rootMargin: '10px',
        threshold: 1
    });

    return (
        <div className='app' style={{height: 2000}}>
            <div ref={intersectionRef} style={{marginTop: 400}}>
                {intersection && intersection.intersectionRatio < 1
                    ? 'Obscured'
                    : 'Fully in view'}
            </div>
        </div>
    )
}
```
