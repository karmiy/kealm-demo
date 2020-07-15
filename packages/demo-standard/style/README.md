## 样式命名规范

样式命名有很多种版本，如 BEM、NEC 等。此处使用 BEM 规范

### BEM

[参考来源](https://github.com/zhaotoday/bem)

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
.el-slider__bar {}
```

- block__element--modifier: 块里元素的状态、属性或修饰

```css
/* 大尺寸的滑动条 */
.el-slider__bar--large {}
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

#### 孙子或更下级命名

```html
<div class="home">
    <div class="home__header">
        <!-- bad -->
        <h3 class="home__header__title"></h3>
    </div>
    <div class="home__content">
        ...
    </div>
</div>
```

上方孙子元素命名 home__header__title 是不合适的

命名约定是为了更好识别顶层元素如 home，将元素与顶层达到关联

所以更好的做法是使用 home__title 命名：

```html
<div class="home">
    <div class="home__header">
        <!-- good -->
        <h3 class="home__title"></h3>
    </div>
    <div class="home__content">
        ...
    </div>
</div>
```

这样的好处在于：

- 没有破坏与 home 的关联性

- title 与 header 没有强关联，将 title 移动到 content 下也是可行的，并且不破坏语言(title 是 home 里的 title)

- 命名更简洁

#### 不一定要为每一个元素命名

我们不需要一定为每一个元素进行命名

如上方 title 与 header 是相关联的，那么适当省略掉元素的类名也是可行的：

```html
<div class="home">
    <div class="home__header">
        <h3>...</h3>
    </div>
    <div class="home__content">
        ...
    </div>
</div>
```

```css
.home__header h3 {
    ...
}
```
#### BEM 与命名空间可以一起使用

配合命名空间来作用元素，甚至可以提升可读性，如为元素加上禁用状态：

```html
<div class="home">
    <div class="home__header">
        <!-- is-disabled 表示禁用状态 -->
        <button class="home__btn is-disabled"></button>
    </div>
    <div class="home__content">
        ...
    </div>
</div>
```