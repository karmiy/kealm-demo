## useStateValidator

校验一个状态是否满足某些条件

### 结构

```ts
type ValidityState = [boolean | undefined, ...any[]];

interface StateValidator<V, S> {
    (state: S): V;

    (state: S, dispatch: React.Dispatch<React.SetStateAction<V>>): void;
}

type UseStateValidatorReturn<V> = [V, () => void];

function useStateValidator<V extends ValidityState, S, I extends V>(
    state: S,
    validator: StateValidator<V, S>,
    initialState: I = [undefined] as I
): UseStateValidatorReturn<V>;
```

### 函数与返回值

- Params:

    - state: 需要监听校验的状态

    - validator: 校验器，在 state 变化时会执行该函数，可以有 2 种参数形式，一种是直接返回校验结果，另一种是接收一个 dispatch 函数手动触发，见重载类型

    - initialState: 初始校验结果（这里取这个名字有点误导）

- Return:

    - validatorReturn: 校验结果，是个数组，第一个值是校验结果，第二个是校验器 validate

### 作用

- 自定义校验器，校验一个状态是否满足某个条件

### 何时使用

- 希望校验一个状态是否满足条件，一般用在校验逻辑复杂的场景（简单的话一个表达式就可以解决了）

### 应用场景

- 表单验证等场景，判断按钮是否满足条件可点击

### 源码细节

[useStateValidator 源码地址](https://github.com/streamich/react-use/blob/master/src/useStateValidator.ts)

### 示例

```tsx
const DemoStateValidator = (s: string): [boolean] => [s === '' ? false :  +s % 2 === 0];

function App() {
    const [state, setState] = React.useState<string>('0');
    const [[isValid]] = useStateValidator(state, DemoStateValidator, [false]);

    return (
        <div className='app'>
            <div>Below field is valid only if number is even</div>
            <input
                type="number"
                min="0"
                max="10"
                value={state}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                    setState(ev.target.value);
                }}
            />
            {isValid !== null && <span>{isValid ? 'Valid!' : 'Invalid'}</span>}
        </div>
    )
}
```
