## useLocalStorage

管理 localStorage

### 结构

```ts
import { Dispatch, SetStateAction } from 'react';

type parserOptions<T> =
    {
        raw: true;
    } | 
    {
        raw: false;
        serializer: (value: T) => string;
        deserializer: (value: string) => T;
    };

function useLocalStorage<T>(
    key: string,
    initialValue?: T,
    options?: parserOptions<T>
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void];
```

### 函数与返回值

- Params:

    - key: 存储到 localStorage 的键

    - initialValue: 存储到 localStorage 的初始值，注意如果原本该 key 下已有缓存，则这个初始值无效

    - options:

        - raw: 如果为 false，hook 将使用 JON.stringify 或 parse 来做序列化与反序列化

        - serializer: 序列化函数，将 T 转为 string，默认 JON.stringify

        - deserializer: 反序列化函数，将 string 转为 T，默认 JSON.parse

- Return:

    - value: 当前缓存值

    - setValue: 设置新缓存值

    - remove: 移除缓存

### 作用

- 管理 localStorage，并提供 set 和 remove 方法更方便的操作，且不需要关注序列化问题

### 何时使用

- 希望方便的管理与操作 localStorage

### 应用场景

- 与 localStorage 有关的任何场景

### 源码细节

[useLocalStorage 源码地址](https://github.com/streamich/react-use/blob/master/src/useLocalStorage.ts)

- 利用 try catch 包裹初始化赋值与 set remove 方法，确保异常状况，考虑周全

- 提供自定义序列化与反序列化，适用广泛

### 示例

```tsx
function App() {
    const [value, setValue, remove] = useLocalStorage('my-key', 'foo');

    return (
        <div className='app'>
            <div>Value: {value}</div>
            <button onClick={() => setValue('bar')}>bar</button>
            <button onClick={() => setValue('baz')}>baz</button>
            <button onClick={() => remove()}>Remove</button>
        </div>
    )
}
```
