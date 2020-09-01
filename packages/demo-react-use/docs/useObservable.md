## useObservable

跟踪可观察者对象最新的值

### 结构

```ts
interface Observable<T> {
    subscribe: (
        listener: (value: T) => void
    ) => {
        unsubscribe: () => void;
    };
}

function useObservable<T>(observable$: Observable<T>): T | undefined;
function useObservable<T>(observable$: Observable<T>, initialValue: T): T;
function useObservable<T>(observable$: Observable<T>, initialValue?: T): T | undefined
```

### 函数与返回值

- Params:

    - observable: 可观察者

- Return:

    - value: 当前最新的值

### 作用

- 接收可观察者最新的值，可以用来做一个小型状态管理库

### 何时使用

- 希望获取可观察者最新的值

- 开发小型状态管理库

### 应用场景

- 作为一个小型状态管理

### 源码细节

[useObservable 源码地址](https://github.com/streamich/react-use/blob/master/src/useObservable.ts)

### 示例

```tsx
class Subject<T> {
    private listeners: Array<(value: T) => void> = [];

    public subscribe(listener: (value: T) => void) {
        this.listeners.push(listener);

        return {
            unsubscribe: () => {
                const index = this.listeners.indexOf(listener);
                this.listeners[index] = this.listeners[this.listeners.length - 1];
                this.listeners.pop();
            }
        }
    }

    public next(value: T) {
        this.listeners.forEach(listener => listener(value));
    }
}

const subject = new Subject<number>();

const Button: React.FC<{}> = () => {
    const value = useObservable(subject, 0);

    return <button onClick={() => subject.next(value + 1)}>Clicked {value} times</button>
}

const Content: React.FC<{}> = () => {
    const value = useObservable(subject, 0);

    return <div>Value is {value}</div>
}

function App() {
    const state = useNetwork();

    return (
        <div className='app'>
            <Button />
            <Content />
        </div>
    )
}
```
