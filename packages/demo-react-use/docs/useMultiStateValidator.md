## useMultiStateValidator

多状态校验，每当状态发生变化，validator 就会被调用

### 结构

```ts
type ValidityState = [boolean | undefined, ...any[]];

// 函数重载
interface StateValidator<V, S> {
    (state: S): V;

    (state: S, dispatch: Dispatch<SetStateAction<V>>): void;
}

type MultiStateValidatorStates = any[] | { [p: string]: any } | { [p: number]: any };

type MultiStateValidator<V extends ValidityState, S extends MultiStateValidatorStates> = StateValidator<V, S>;

type UseStateValidatorReturn<V> = [V, () => void];

function useMultiStateValidator<V extends ValidityState, S extends MultiStateValidatorStates, I extends V>(
    states: S,
    validator: MultiStateValidator<V, S>,
    initialValidity: I = [undefined] as I
): UseStateValidatorReturn;
```

### 函数与返回值

- Params:

    - states: 需要校验的状态列表，可以是数组，对象集合等

    - validator: 验证器函数

    - initialValidity: 初始验证结果

- Return:

    - validity: 当前验证结果

    - validate: 验证函数，状态变化时内部执行的也是此函数

### 作用

- 让使用者提供一个验证器函数，验证一些列状态是否符合要求

### 何时使用

- 希望验证一些列状态是否符合某些要求

### 应用场景

- 表单验证，在一些列条件通过前让提交按钮为 disabled 状态

### 源码细节

[useMultiStateValidator 源码地址](https://github.com/streamich/react-use/blob/master/src/useMultiStateValidator.ts)

- 利用函数重载，让 validator 校验器的提供方式更灵活，即可以返回一个 validity 结果，也可以在第二个参数手动让使用者执行 setValidity

```tsx
interface StateValidator<V, S> {
    (state: S): V;

    (state: S, dispatch: Dispatch<SetStateAction<V>>): void;
}

const validate = useCallback(() => {
    // 根据 length 判断是哪个重载结果
    if (validatorInner.current.length >= 2) {
      validatorInner.current(statesInner.current, setValidity);
    } else {
      setValidity(validatorInner.current(statesInner.current));
    }
}, [setValidity]);
```

- 利用 Object.values(states) 作为状态变化的依赖，而不是单纯的 states，这是更为细节的，应该通常用户在使用 hook 时传入的对象往往每次 render 引用都是变化的

```tsx
useEffect(() => {
    validate();
}, Object.values(states));
```

### 示例

```tsx
function App() {
    const [state1, setState1] = React.useState<number>(1);
    const [state2, setState2] = React.useState<number>(1);
    const [state3, setState3] = React.useState<number>(1);
    const [[isValid]] = useMultiStateValidator([state1, state2, state3], DemoStateValidator);

    return (
        <div className='app'>
            <div>Below fields will be valid if all of them is even</div>
            <input type="number" min="1" max="10" value={state1}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                    setState1((ev.target.value as unknown) as number);
                }}
            />
            <input type="number" min="1" max="10" value={state2}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                    setState2((ev.target.value as unknown) as number);
                }}
            />
            <input type="number" min="1" max="10" value={state3}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                    setState3((ev.target.value as unknown) as number);
                }}
            />
            {isValid !== null && <span>{isValid ? 'Valid!' : 'Invalid'}</span>}
        </div>
    )
}
```
