## useTitle

管理页面 document.title

### 结构

```ts
interface UseTitleOptions {
    restoreOnUnmount?: boolean;
}
const DEFAULT_USE_TITLE_OPTIONS: UseTitleOptions = {
    restoreOnUnmount: false,
};

function useTitle<T, U extends any[]>(
    title: string,
    options: UseTitleOptions = DEFAULT_USE_TITLE_OPTIONS
): void;
```

### 函数与返回值

- Params:

    - title: 标题

    - options: 配置

        - restoreOnUnmount: 组件卸载后是否恢复之前的 title

### 作用

- 管理页面 document.title

### 何时使用

- 希望在不同页面管理不同的 title 文本

### 应用场景

- 不同页面需要展示不同 title 的场景

### 源码细节

[useTitle 源码地址](https://github.com/streamich/react-use/blob/master/src/useTitle.ts)

### 更多看法

- 对 title 的更新可以放在 useEffect 中，title 作为依赖，有时 title 可能需要根据后端返回数据有不同展示，restoreOnUnmount 的必要性可能没那么高

### 示例

```tsx
function App() {
    useTitle('Hello world!');

    return (
        <div className='app'>
            ...
        </div>
    )
}
```
