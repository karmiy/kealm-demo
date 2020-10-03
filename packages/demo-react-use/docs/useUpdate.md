## useUpdate

返回一个函数，执行后强制让组件 render，相当于 forceUpdate

### 结构

```ts
function useUpdate(): () => void;
```

### 函数与返回值

- Return:

    - update: 函数，执行后强制组件 render

### 作用

- 强制组件重新 render

### 何时使用

- 希望手动让组件重新 render

### 应用场景

- 开发自定义 hook，希望返回一个引用不变的函数（无依赖），使用 useRef 替代 useState 管理内部状态， 又希望在 ref 变更时达到 useState 触发组件 render 的效果

### 源码细节

[useUpdate 源码地址](https://github.com/streamich/react-use/blob/master/src/useUpdate.ts)

- 利用 useReducer 一次性实现功能

```tsx
const updateReducer = (num: number): number => (num + 1) % 1_000_000;

const [, update] = useReducer(updateReducer, 0);
```

### 示例

```tsx
function App() {
    const update = useUpdate();

    return (
        <div className='app'>
            <div>Time: {Date.now()}</div>
            <button onClick={update}>Update</button>
        </div>
    )
}
```
