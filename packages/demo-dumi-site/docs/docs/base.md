---
order: 1
---

# 基本使用

## 引用自定义组件

```jsx
import React from 'react';
import { Nav } from 'demo-dumi-site';

export default () => <Nav>Hello dumi!</Nav>;
```

## 引用 RN 组件

```jsx
import React from 'react';
import { View, Text } from 'react-native';

export default () => <View><Text style={{ color: 'skyblue' }}>This is RN View</Text></View>;
```

## 不渲染代码块

```jsx | pure
// 我不会被渲染为 React 组件
import React from 'react';

export default () => <div>Hello dumi!</div>;
```

## 外部代码

引用外部 code 还可以用 FrontMatter 配置项

<code src="./demo.tsx" title="demo 的名称"></code>
