---
order: 6
mobile: false
---
# FrontMatter

## Markdown 配置项

### title

默认：正文第一个标题

用于配置该页面的标题，将会被用作该页面标题的子标题以及左侧菜单

### sidemenu

默认 true

控制左侧菜单的显示或隐藏

### toc

锚点的显示位置：

- content（默认）：在内容右边显示锚点菜单 Affix Menu 列表

- menu：在左侧菜单一起显示锚点菜单

- false：不展示

### order

控制该文档的显示顺序，数值越小排序越靠前

### legacy

指定该文档的旧路径（从根路径开始指定），避免从其他文档迁移到 dumi 后原路径访问 404

### group

当前页面在左侧菜单栏进行分组展示

默认基于 dumi 的文件夹嵌套来自动生成 group

以站点模式 site 示例：

```
.
└── src/
    ├── index.md
    ├── s.md
    ├── views/
        ├── index.md
        ├── a.md
        ├── pages/
            ├── index.md
            ├── b.md
            ├── items/
                ├── i.md
```

dumi 会基于 resolve.includes 的入口开始计算：

- 第一层定位成 **nav**，此处略，见 nav 小节
- 第二层定位为 **group** 布局在左侧菜单栏：
    - index.md：title 为 Index，path 为 /views
    - a.md：title 为 A，path 为 /views
    - pages 文件夹：作为其下的 index.md, b.md 的 title（Pages），其中 b.md 的 path 为 /views/pages
    - i.md：其上级文件夹 items 不会被视为 group，因为已经不是第二层了，但 items 会被作为 path 的一部分，i.md 的 title 虽然也是 Pages，但会独立 1 个 Pages 组，不与 b.md 那层一起，path 为 /views/pages/items

group 可配置如下属性：

- group.title：左侧菜单栏该组别的名称

- group.path：配置该组别的路由前缀，当 location.pathname 匹配到该前缀时，菜单组会进行 active 标记

- group.order：控制该文档组的显示顺序，数值越小排序越靠前

例如 i.md 配置：

```
---
group:
  title: 组件
---
```

左侧菜单栏组名将更新为 “组件”

<div>
    <Alert type='info'>若是 b.md 配置 group.title: 组件，它不会单独被作为一个组，而是其层中的 index.md 和它一起组名更新，除非是把 b.md 的 group.path 独自进行调整，如调整为 /views/pages/v，那它不仅会独立一个组，且路由地址为 /views/pages/v/b</Alert>
</div>

### nav

仅 site 模式有效

指定文档上方导航菜单

默认基于 dumi 的文件夹嵌套来自动生成 nav

例如：

```
.
└── src/
    ├── index.md
    ├── s.md
    ├── views/
        ├── index.md
        ├── a.md
        ├── pages/
            ├── index.md
            ├── b.md
            ├── items/
                ├── i.md
```

dumi 会基于 resolve.includes 的入口开始计算：

- 第一层定位成 **nav**
    - index.md：将作为项目根路径的内容，即本地 ip:8080 后看到的首页
    - s.md：作为独立的 nav 项，title 为 S，path 为 /s，且将出现一项左侧菜单栏，以 s.md 里的 # 标题作为 group 组的 title
    - views：title 为 Views，path 为 /views，左侧菜单栏表现见 group 小节

nav 可配置如下属性：

- nav.title：导航栏的名称

- nav.path：导航栏的路由前缀，当 location.pathname 匹配到该前缀时，菜单组会进行 active 标记

- nav.order：控制该导航栏的显示顺序，数值越小排序越靠前

### hero

在 site 模式下可用，配置 hero 后，该页面将会以首页形式呈现

可配置属性：

- hero.image：配置首页首屏区域的标题配图
- hero.title：配置首页首屏区域的大标题
- hero.desc：配置首页首屏区域的简介文字
- hero.actions：配置首页首屏区域的操作按钮，第一个按钮会作为主按钮展示

```
hero:
  actions:
    - text: Getting Started
      link: /getting-started
```

### features

在 site 模式下可用

配置后该页面将会以首页形式呈现

用于每行 3 个的形式展示组件库的特性

```
features:
  - icon: 图标的 URL 地址，建议切图尺寸为 144 * 144（可选）
    title: 性能强大
    link: 可为标题配置超链接
    desc: 可以配置 `markdown` 文本
```

### footer

配置当前页面的 footer 区域，建议首页做配置即可，目前暂不支持统一对所有页面进行配置

```
footer: Open-source MIT Licensed | Copyright © 2020<br />Powered by [dumi](https://d.umijs.org)
```

### translateHelp

是否在该页面顶部展示『帮助翻译』的提示框

当设置 String 类型时，会自定义提示语内容

### hide <Badge>1.1.0+</Badge>

如果你暂时不希望在生产环境的站点中展示某些文档，可以打开这个配置临时隐藏它

该配置**不会影响开发环境的渲染**

## demo 配置项

在 demo 上以注释的形式展示

```js
/**
 * title: 我是标题
 */
```
### title

用于配置该外部 Demo 的标题，配置后会在 Demo 预览器中显示

```jsx
/**
 * title: 我是标题
 */
import React from 'react';

export default () => <div>包含标题</div>;
```

### desc

用于配置该外部 Demo 的简介，配置后会在 Demo 预览器中显示

支持 Markdown 语法

```jsx
/**
 * desc: 我是简介
 */
import React from 'react';

export default () => <div>包含简介</div>;
```

### compact

用于去除 demo 渲染容器的内边距


```jsx
/**
 * compact: true
 */
import React from 'react';

export default () => <div>没有内边距</div>;
```

### background

用于设置 demo 渲染容器的背景色

```jsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';

export default () => <div>background: '#f6f7f9'</div>;
```

### inline

用于指示该 demo 为自由 demo，将会直接在文档中嵌入渲染

不会被 demo 容器包裹，用户也无法查看源代码

```jsx
/**
 * inline: true
 */

import React from 'react';

export default () => <div>我会被直接嵌入</div>;
```

### transform

用于控制 demo 的包裹容器是否设置 transform 的 CSS 值以控制 position: fixed; 的元素相对于 demo 容器定位

```jsx
/**
 * transform: true
 */
import React from 'react';

export default () => <h1 style={{ position: 'fixed', top: 0, left: 0 }}>我不会飞出去</h1>;
```

### defaultShowCode

用于控制当前 demo 的包裹容器是否默认展开源代码显示

```jsx
/**
 * defaultShowCode: true
 */
import React from 'react';

export default () => <div>我默认展开源码</div>;
```

### debug <Badge>1.1.0+</Badge>

标记当前 demo 为调试 demo

这意味着在生产模式下该 demo 是不可见的

另外，调试 demo 在开发环境下也会展示一个 DEV ONLY 的标记，以便开发者将其和其他 demo 区分开来

```jsx
/**
 * debug: true
 */

import React from 'react';

export default () => <div>'我仅在开发环境下展示'</div>;
```

### hideActions

用于控制 Demo 预览器部分功能按钮的隐藏，配置值含义如下

- CSB: 隐藏『在 codesandbox.io 中打开』的按钮
- EXTERNAL: 隐藏『在新窗口打开』的按钮

通过 code 标签的属性配置：

```jsx | pure
<!-- 注意，单引号为必备，要确保值为有效 JSON 字符串 -->
<code hideActions='["CSB"]' />
```

通过 frontmatter 配置：

```jsx | pure
/**
 * hideActions: ["CSB"]
 * hideActions:
 *   - CSB
 */

// 以上两种方式均可识别
```

```jsx
/**
 * hideActions: ["CSB", "EXTERNAL"]
 */

import React from 'react';

export default () => <div>隐藏 “codesandbox.io” 与 “新窗口”</div>;
```

### iframe <Badge>1.1.0+</Badge>

使用 iframe 模式渲染当前 demo

对于渲染 layout 型的 demo 非常有用

当我们传递数值时可以控制 iframe 的高度，访问 [iframe 模式](https://d.umijs.org/zh-CN/guide/basic#iframe-%E6%A8%A1%E5%BC%8F) 了解更多

```jsx
/**
 * iframe: true // 设置为数值可控制 iframe 高度
 */
import React from 'react';

export default () => (
  <div style={{ boxShadow: '0 2px 15px rgba(0,0,0,0.1)', padding: '5px 20px', fontSize: '20px' }}>iframe 模式</div>
);
```

### demoUrl <Badge>1.1.1+</Badge>

默认值：dumi 自动生成的 demo 独立访问链接

用于指定该 demo 的访问链接

通常在 dumi 默认渲染的 demo 无法满足展示需要时使用，例如需要呈现 ReactNative 的渲染结果

在默认主题时，仅在 iframe 呈现模式下才会生效

在移动端研发主题中，会作为右侧手机预览框中的 demo 渲染链接

```jsx
/**
 * demoUrl: https://www.baidu.com
 */

import React from 'react';

export default () => <div>跳去百度</div>;
```