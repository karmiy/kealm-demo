## 样式命名规范

样式命名有很多种版本，如 BEM、NEC 等。此处使用 BEM 规范

### 参考来源

[BEM](https://github.com/zhaotoday/bem)

### BEM

块（block）、元素（element）、修饰符（modifier）

由 Yandex 团队提出的一种前端命名方法论，让 CSS 类对其他开发者而言更为透明而有意义

#### 命名结构

```css
.block {}
.block__element {}
.block--modifier {}
.block__element--modifier {}
```

之所以使用 2 个下划线 _ 和连字符 - 是为了让 block 可以用单个连字符 - 来界定: 

```css
.site-search {}
.site-search__field {}
.site-search--full {}
```

此外，单个连字符 - 还可以用于定义前缀，如:

- element-ui

```css
.el-button {}
```

- antd

```css
.ant-button {}
```

#### 示例理解

- block__element: 块里的元素，可以读作 block 里的 element

```css
/* 滑块 slider 里的区间条 bar */
.km-slider__bar {}
```

- block__element--modifier: 块里元素的状态、属性或修饰

```css
/* 大尺寸的滑动条 */
.km-slider__bar--large {}
```

### 命名空间

[more-transparent-ui-code-with-namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)

- o-: 表示一个对象（Object），如 .o-layout。

- c-: 表示一个组件（Component），指一个具体的、特定实现的 UI。如 .c-avatar。

- u-: 表示一个通用工具（Utility），如 .u-hidden。

- t-: 表示一个主题（Theme），如 .t-light。

- s-: 表示一个上下文或作用域（Scope），如 .s-cms-content。

- is-，has-: 表示一种状态或条件样式。如 .is-active

- _: 表示一个 hack，如 ._important。

- js-: 表示一个 JavaScript 钩子。如 .js-modal。

- qa-: 表示测试钩子。

BEM 可以搭配命名空间使用，如:

```css
/* 表示 card 是一个组件 */
c-card {}
```

比较常用的是 is-:

```css
/* 表示是否禁用 */
is-disabled {}
```

### 常见问题

- 孙子或更下级选择器命名

