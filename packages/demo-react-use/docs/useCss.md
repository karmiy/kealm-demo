## useCss

动态使用 CSS，hook 形式的 [nano-css](https://www.npmjs.com/package/nano-css) 

### 结构

```ts
function useCss(css: object): string;
```

### 函数与返回值

- Params:

    - css: nano-css 的结构对象

- Return:

    - className: class 类名

### 作用

- 以 JS 的形式写 CSS

### 何时使用

- 希望以 JS 的形式写 CSS

### 应用场景

- 需要 CSS-in-JS 的场景

### 源码细节

[useCss 源码地址](https://github.com/streamich/react-use/blob/master/src/useCss.ts)

- 使用 nano-css 构造 CSSOM

### 示例

```tsx
function App() {
    const className = useCss({
        color: 'red',
        border: '1px solid red',
        '&:hover': {
            color: 'blue',
        },
        '.global_class': {
            color: 'green',
        },
    });

    return (
        <div className={className}>
            Hover me!
            <div className='global_class'>
                Over!
            </div>
        </div>
    )
}
```
