## useFavicon

挂载网站图标 favicon

### 结构

```ts
function useFavicon(
    href: href
): void;
```

### 函数与返回值

- Params:

    - href: favicon 路径

### 作用

- 手动给网站挂载 favicon

### 何时使用

- favicon 不适合在 html 中挂载，需要在代码中手动挂载，或 favicon 动态

### 应用场景

- favicon 由后台动态配置，地址需后端返回

### 源码细节

[useFavicon 源码地址](https://github.com/streamich/react-use/blob/master/src/useFavicon.ts)

### 示例

```tsx
function App() {
    useFavicon('https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico');

    return (
        <div className='app'>
            ...
        </div>
    )
}
```
