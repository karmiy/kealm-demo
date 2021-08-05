---
order: 1
nav:
  title: 指南
  order: 1
---

# 基本使用

## 引用自定义组件

```jsx
import React from 'react';
import { Nav } from 'demo-dumi-site';

export default () => <Nav>Hello dumi!</Nav>;
```

## 不渲染代码块

```jsx | pure
// 我不会被渲染为 React 组件
import React from 'react';

export default () => <div>Hello dumi!</div>;
```

## 外部代码

<code src="./demo.tsx"></code>

## FrontMatter - 捕获 fixed 元素


```tsx
/**
 * transform: true
 */
import React from 'react';

export default () => <h1 style={{ position: 'fixed', top: 0, left: 0 }}>我不会飞出去</h1>;
```
