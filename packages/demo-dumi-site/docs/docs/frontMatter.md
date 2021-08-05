---
order: 2
nav:
  title: 指南
  order: 1
---
# FrontMatter 属性

## 引用到 code

<code
  src="./demo.tsx"
  title="demo 的名称"
/>

## 捕获 fixed 元素


```jsx
/**
 * transform: true
 */
import React from 'react';

export default () => <h1 style={{ position: 'fixed', top: 0, left: 0 }}>我不会飞出去</h1>;
```

## 背景色


```jsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';

export default () => <div>背景色</div>;
```

## 去除内边距


```jsx
/**
 * compact: true
 */
import React from 'react';

export default () => <div>'我会贴边站'</div>;
```

## 标题与简介

```jsx
/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */

import React from 'react';

export default () => <div>'标题与简介'</div>;
```

## 直接嵌入文档

```jsx
/**
 * inline: true
 */

import React from 'react';

export default () => <div>'我会被直接嵌入'</div>;
```

## 调试型 demo（仅在开发环境下展示）

```jsx
/**
 * debug: true
 */

import React from 'react';

export default () => <div>'我仅在开发环境下展示'</div>;
```

## iframe 模式

- 将会使用 iframe 渲染 demo，可实现和文档的完全隔离

- 通常用于布局型组件，此时 compact 配置默认为 true

```jsx
/**
 * iframe: true // 设置为数值可控制 iframe 高度
 */
import React from 'react';

export default () => (
  <h2 style={{ boxShadow: '0 2px 15px rgba(0,0,0,0.1)', padding: '5px 20px' }}>iframe 模式</h2>
);
```