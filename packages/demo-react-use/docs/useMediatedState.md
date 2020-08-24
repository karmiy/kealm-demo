## useMediatedState

set 时将会先执行中间层过滤的 useState

### 结构

```ts
import { Dispatch, SetStateAction } from 'react';

interface StateMediator<S = any> {
    (newState: any): S;

    (newState: any, dispatch: Dispatch<SetStateAction<S>>): void;
}

type UseMediatedStateReturn<S = any> = [S, Dispatch<SetStateAction<S>>];

function useMediatedState<S = undefined>(mediator: StateMediator<S | undefined>): UseMediatedStateReturn<S | undefined>;
function useMediatedState<S = any>(mediator: StateMediator<S>, initialState: S): UseMediatedStateReturn<S>;
function useMediatedState<S = any>(mediator: StateMediator<S>, initialState?: S): UseMediatedStateReturn<S>;
```

### 函数与返回值

- Params:

    - mediator: 中间层，在 set 赋值前执行一个过滤

    - initialState: 初始状态，同 useState

- Return:

    - state: 状态，同 useState

    - setState: 更新状态，同 useState

### 作用

- 对赋值进行中间层过滤的 useState

### 何时使用

- 希望使用 useState 管理状态，并且在赋值前需要对值进行过滤

### 应用场景

- 管理 input 输入框，对其进行文本过滤，控制只能输入一个空格

### 源码细节

[useMediatedState 源码地址](https://github.com/streamich/react-use/blob/master/src/useMediatedState.ts)

### 示例

```tsx
function App() {
    const [state, setState] = useMediatedState((s: string) => s.replace(/[\s]+/g, ' '), '');

    return (
        <div className='app'>
            <div>You will not be able to enter more than one space</div>
            <input type="text" min="0" max="10" 
                value={state}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                    setState(ev.target.value);
                }}
            />
        </div>
    )
}
```
