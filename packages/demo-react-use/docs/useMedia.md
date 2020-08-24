## useMedia

跟踪 CSS media 媒体查询的状态

### 结构

```ts
function useMedia(
    query: string, 
    defaultState: boolean = false
): boolean;
```

### 函数与返回值

- Params:

    - query: CSS media query

    - defaultState: 默认状态，非客户端环境有效

- Return:

    - state: matchMedia 的 matches 状态值

### 作用

- 跟踪 CSS 媒体查询状态

### 何时使用

- 希望用 JS 跟踪 CSS 媒体查询状态

### 应用场景

- 纯 CSS media 满足不了，需要在状态变化时手动控制某些操作的场景

### 源码细节

[useMedia 源码地址](https://github.com/streamich/react-use/blob/master/src/useMedia.ts)

- 使用 matchMedia 作为驱动，监听状态

### 示例

```tsx
function App() {
    const isWide = useMedia('(min-width: 480px)');

    return (
        <div className='app'>
            Screen is wide: {isWide ? 'Yes' : 'No'}
        </div>
    )
}
```
