## useEnsuredForwardedRef

更可靠的 forwardRef

### 结构

```ts
import { 
    MutableRefObject, 
    RefForwardingComponent, 
    ForwardRefExoticComponent,
    PropsWithoutRef,
    RefAttributes
} from 'react';

function useEnsuredForwardedRef<T>(
    forwardedRef: MutableRefObject<T>
): MutableRefObject<T>;

function ensuredForwardRef<T, P>(
    Component: RefForwardingComponent<T, P>
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>
```

### 函数与返回值

#### useEnsuredForwardedRef

- Params:

    - forwardedRef: forwardRef 传递下来的 ref

#### ensuredForwardRef

- Params:

    - Component: (props, ref) => { ... } 的组件

### 作用

提及作用前先看问题：

```tsx
const Child = React.forwardRef<HTMLDivElement, IChildProps>((props, ref) => {
    useEffect(() => {
        console.log(ref); // 将输出 null
    }, [])
  
    return (
        <div ref={ref} />
    );
});

function App() {
    return (
        <div className='app'>
            {/* 没有给 Child 传递 ref */}
            <Child />
        </div>
    )
}
```
上例中的 ref 将会打印出 null，这并不是我们想要的，即使父组件没有传递 ref，也应该拿到正确的 HTMLDivElement

useEnsuredForwardedRef 的作用即是解决这个问题：

- 在父组件没有传递 ref 时依旧确保能拿到正确的值

### 何时使用

- 当使用 forwardRef 接收父组件的 ref，由需要在子组件中去使用它时

### 应用场景

- 开发 Input 组件，使用 forwardRef 让用户可以绑定 ref 来获得 input 元素，Input 组件内部又需要使用该 ref 对 input 元素进行操作

### 源码细节

[useEnsuredForwardedRef 源码地址](https://github.com/streamich/react-use/blob/master/src/useEnsuredForwardedRef.ts)

- 由 useEnsuredForwardedRef 内部创建新的 ref 并返回，并在 useEffect 为父组件传递的 forwardedRef 赋值，实现 ref 由内部控制，确保有值，又保证父组件传递的 ref 获取正确的值:

```ts
const ensuredRef = useRef(forwardedRef && forwardedRef.current);

useEffect(() => {
    if (!forwardedRef) {
      return;
    }
    forwardedRef.current = ensuredRef.current;
}, [forwardedRef]);

return ensuredRef;
```
- ensuredForwardRef 使用的是高阶组件的形式，即 ensuredForwardRef 是一个高阶组件，接收一个组件，返回新组建，而返回的组件利用 forwardRef 来分离传递过来的 ref，并二次使用 useEnsuredForwardedRef hook 来实现以上功能:

```ts
export function ensuredForwardRef<T, P = {}>(
    Component: RefForwardingComponent<T, P>
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> {
    return forwardRef((props: PropsWithChildren<P>, ref) => {
        const ensuredRef = useEnsuredForwardedRef(ref as MutableRefObject<T>);
        return Component(props, ensuredRef);
    });
}
```

### 示例

- ensuredForwardRef:

```tsx
const Child = ensuredForwardRef<HTMLDivElement, IChildProps>((props, ref) => {
    useEffect(() => {
        console.log((ref as React.MutableRefObject<HTMLDivElement>).current); // <div />
    }, [])
  
    return (
        <div ref={ref} />
    );
});

function App() {
    return (
        <div className='app'>
            {/* 没有给 Child 传递 ref */}
            <Child />
        </div>
    )
}
```
- useEnsuredForwardedRef:

```tsx
const Child = forwardRef<HTMLDivElement, IChildProps>((props, ref) => {
    const ensuredForwardRef = useEnsuredForwardedRef(ref as React.MutableRefObject<HTMLDivElement>);
  
    useEffect(() => {
        console.log(ensuredForwardRef.current); // <div />
    }, [])
  
    return (
        <div ref={ensuredForwardRef} />
    );
});

function App() {
    return (
        <div className='app'>
            {/* 没有给 Child 传递 ref */}
            <Child />
        </div>
    )
}
```
