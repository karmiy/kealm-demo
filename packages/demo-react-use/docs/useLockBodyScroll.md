## useLockBodyScroll

阻止 body 滚动

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

function useLockBodyScroll<T>(
    locked: boolean = true, 
    elementRef?: RefObject<HTMLElement>
): void;
```

### 函数与返回值

- Params:

    - locked: 是否阻止 body 滚动

    - elementRef: DOM ref，会在此基础上向上找到 body 元素，如果是 iframe 元素，则找到此 iframe 中的 body

### 作用

- 阻止页面的滚动

### 何时使用

- 希望手动控制页面的可滚动状态

### 应用场景

- 弹出模态框后，阻止页面滚动

### 源码细节

[useLockBodyScroll 源码地址](https://github.com/streamich/react-use/blob/master/src/useLockBodyScroll.ts)

- 使用一个 Map 存储 body 状态（counter, initialOverflow），counter 在于防止多次使用 useLockBodyScroll 锁住 body 滚动条导致重复操作引发 BUG，且在某个 useLockBodyScroll 解锁时如果还有其他 useLockBodyScroll 未解锁，则不做任何操作，而 initialOverflow 在于存储 body 元素原本的 style，防止解锁时丢失用户原本设置的样式，考虑很周全

### 更多看法

- 可以提供阻止滚动的元素，而不仅仅是 body，项目中有时承担页面滚动责任的元素可能只是个 div

- 该 hook 在 IOS 下阻止页面滚动的操作在于阻止 document 的 touchmove，这在弹框中存在滚动元素的场景并不适用，会导致弹框中的滚动元素也无法滚动

### 示例

```tsx
function App() {
    const [locked, setLocked] = useState(false);
    useLockBodyScroll(locked);

    return (
        <div className='app'>
            <div  style={{height: 2000, backgroundColor: 'skyblue'}}></div>
            <div style={{height: 200, backgroundColor: 'pink', overflow: 'auto'}}>
                <div style={{height: 400}}>
                    inner scroll
                </div>
            </div>
            <button onClick={() => setLocked(v => !v)}>
                {locked ? 'Unlock' : 'Lock'}
            </button>
        </div>
    )
}
```
