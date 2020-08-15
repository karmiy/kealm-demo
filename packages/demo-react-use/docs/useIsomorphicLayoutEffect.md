## useIsomorphicLayoutEffect

使用 useLayoutEffect（会判断是否在服务端下，选择 useLayoutEffect 或 useEffect）

### 结构

```ts
// 同 useLayoutEffect
function useIsomorphicLayoutEffect(
    effect: React.EffectCallback,
    deps?: React.DependencyList
): void;
```

### 函数与返回值

- 略，同 useLayoutEffect

### 作用

- 更安全的去使用 useLayoutEffect（在服务端渲染时使用 useLayoutEffect 会报警告，则改用 useEffect）

### 何时使用

- 当前需要使用 useLayoutEffect，但该项目可能会使用服务端渲染

### 应用场景

- 同 useLayoutEffect

### 源码细节

[useIsomorphicLayoutEffect 源码地址](https://github.com/streamich/react-use/blob/master/src/useIsomorphicLayoutEffect.ts)

- 判断是否 window is undefined，是则使用 useEffect，否则都使用 useLayout

```tsx
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
```

### 示例

- 略，同 useLayoutEffect