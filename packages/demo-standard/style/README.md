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

### 常见场景

#### 孙子或更下级命名

```html
<div class='home'>
    <div class='home__header'>
        <!-- bad -->
        <h3 class='home__header__title'></h3>
    </div>
    <div class='home__content'>
        ...
    </div>
</div>
```

上方孙子元素命名 home__header__title 是不合适的

命名约定是为了更好识别顶层元素 block 如这里的 home，将元素与顶层达到关联

所以更好的做法是使用 home__title 命名：

```html
<div class='home'>
    <div class='home__header'>
        <!-- good -->
        <h3 class='home__title'></h3>
    </div>
    <div class='home__content'>
        ...
    </div>
</div>
```

这样的好处在于：

- 没有破坏与 home 的关联性

- title 与 header 没有强关联，将 title 移动到 content 下也是可行的，并且不破坏语义(title 是 home 里的 title)

- 命名更简洁

#### 不一定要为每一个元素命名

我们不需要一定为每一个元素进行命名

如上方 title 与 header 是相关联的，那么适当省略掉元素的类名也是可行的：

```html
<div class='home'>
    <div class='home__header'>
        <h3>...</h3>
    </div>
    <div class='home__content'>
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
<div class='home'>
    <div class='home__header'>
        <!-- is-disabled 表示禁用状态 -->
        <button class='home__btn is-disabled'></button>
    </div>
    <div class='home__content'>
        ...
    </div>
</div>
```

#### 划分顶层元素

并不是一个 DOM 结构里只有一个顶层元素，否则无限制的层级之下命名也会越来越困难

更好的做法是根据情况进行划分顶层元素 block，如下：

```html
<!-- 顶层元素 grid -->
<ul class='c-grid'>
    <li class='c-grid__item'>
        <!-- 重新划分新的顶层元素 card -->
        <div class='c-card'>
            <div class='c-card__header'>
                ...
            </div>
            <div class='c-card__body'>
                ...
            </div>
        </div>
    </li>
</ul>
```

可以看到，相比于 c-grid__card，重新规划顶层元素 c-card 可能更为的合适

c-grid__card 可能在命名 header 与 body 时显得更为困难，而 c-card 并不会，并且让自身与 grid 进行解耦，更好的分离，例如可以单独封装成 Card 组件

#### 浅划分

有时希望重新划分顶层元素 block，但是又不希望与外层完全解耦，可以这样处理：

```html
<div class='c-card'>
    <div class='c-card__header'>
        ...
    </div>
    <!-- 重新划分为 c-card-list -->
    <ul class='c-card-list'>
        <li class='c-card-list__item'>...</li>
        <li class='c-card-list__item'>...</li>
        <li class='c-card-list__item'>...</li>
    </ul>
</div>
```

如上做法，我们将顶层元素进一步的划分，又不完全让 c-card 与 c-card-list 解耦，这也是可行的

#### 深度关联命名

如果就是需要深层的命名，与其出现 __xx__yy 这样的做法，更好的应该是 __xx-yy：

```html
<div class='c-card'>
    <div class='c-card__header'>
        ...
    </div>
    <div class='c-card__body'>
        <!-- bad -->
        <!-- <h3 class='c-card__body__title'>...</h3> -->

        <!-- good -->
        <h3 class='c-card__body-title'>...</h3>
    </div>
</div>
```

#### 跨组件作用

在组件应用中，经常可能出现一个组件里嵌套另一个组件时需要调整样式的问题

例如 c-card 组件里使用了 c-button：

```html
<div class='c-card'>
    <div class='c-card__header'>
        ...
    </div>
    <div class='c-card__body'>
        <!-- 引用了 c-button -->
        <button class='c-button'></button>
    </div>
</div>
```
然而可能 UI 规定，在 Card 中的 Button，需要更小一点，意味着我们需要在 Card 组件里调整 Button 的样式

一种做法是新增一个 Card 与 Button 的关联类：

```html
<div class='c-card'>
    <div class='c-card__header'>
        ...
    </div>
    <div class='c-card__body'>
        <!-- 定义 c-card__c-button 覆盖原样式 -->
        <button class='c-button c-card__c-button'></button>
    </div>
</div>
```

但是这样的混合做法可能存在问题：

如果引入 Card 的样式声明在 Button 前，那么由于 c-card__c-button 这个类出现在 c-button 之后，如果同时都声明了如 height 属性，那么多 c-button 的优先级是更高的，意味着 c-card__c-button 对按钮的样式覆盖会失败

更好的做法应该是：

为 Button 新增修饰符：

```html
<div class='c-card__body'>
    <button class='c-button c-button--small'></button>
</div>
```
```css
.c-button {
    ...
}

.c-button--small {
    ...
}
```

虽然这样与 Card 就没有了什么联系，但是好处也是很明显的：

- 与父元素不再捆绑，不依赖优先级等问题

- 以脱离与父元素关系为代价，换来更大的收益：复用性。在未来需求扩大时收益是明显的

还有一种做法是直接在 Card 中用父子关系选择器的高优先级进行覆盖，element-ui 就是这样处理的：

```css
.c-card .c-button {
    ...
}
```

#### 使用 is-xxx 定义状态

对于状态，使用 is- 的命名方式是更为合适的：

```html
<button class='c-button is-disabled'></button>
```

这就是命名空间与 BEM 的一种配合，即不脱离与元素的关系，又简单清晰，在 element-ui 中状态也都是这样处理的：

```css
.el-button.is-disabled {
    ...
}
```

### BEM 配合 SCSS

在 SCSS 中，可以利用 @mixin 来创建 BEM 结构

根据需求，我们应该有如下 @mixin：

- @mixin b

- @mixin e

- @mixin m

- @mixin when

使用方式：

```scss
@include b(home) {
    background-color: deepskyblue;

    @include e(content) {
        font-size: 20px;

        @include m(large) {
            font-size: 24px;
        }

        @include when(disabled) {
            pointer-events: none;
        }
    }
}
```

解析结果：

```css
/* 假设前缀是 el- */
.el-home {
    background-color: deepskyblue;
}

.el-home__content {
    font-size: 20px;
}

.el-home__content--large {
    font-size: 24px;
}

.el-home__content.is-disabled {
    pointer-events: none;
}
```

值得注意的是：**@minxin BEM 解析出来的样式都只有一个层级**

```css
/* bad */
.el-home .el-home__content {
    font-size: 20px;
}

/* good */
.el-home__content {
    font-size: 20px;
}
```

这是为了在达到效果的前提下尽可能的减少 CSS 层级，而让其他地方更容易的调整它

想象一下如果组件本身的样式层级很高，其他地方需要对它进行调整，这会显得很困难

借鉴于 element-ui，完整的 BEM 样式如下：

```scss
/* config.scss */
$namespace: 'km';
$km-separator: '__';
$modifier-separator: '--';
$state-prefix: 'is-';
```

```scss
/* function.scss */
@function selectorToString($selector) { // .my-button
    $selector: inspect($selector); // 转字符串=> (.my-button,)    ...会多了个,
    $selector: str-slice($selector, 2, -2); // .my-button,
    @return $selector;
}

@function containsModifier($selector) { // .my-button
    $selector: selectorToString($selector);

    @if str-index($selector, $modifier-separator) { // 是否有--符号
        @return true;
    } @else {
        @return false;
    }
}

@function containWhenFlag($selector) {
    $selector: selectorToString($selector);

    @if str-index($selector, '.' + $state-prefix) {
        @return true
    } @else {
        @return false
    }
}

@function containPseudoClass($selector) {
    $selector: selectorToString($selector);

    @if str-index($selector, ':') {
        @return true
    } @else {
        @return false
    }
}

@function hitAllSpecialNestRule($selector) {
    @return containsModifier($selector) or containWhenFlag($selector) or containPseudoClass($selector);
}
```

```scss
@import 'function';
@import 'config';

@mixin b($block) {
    $B: $namespace + '-' + $block !global;
    .#{$B} {
        @content;
    }
}

@mixin e($element) {
    $E: $element !global;
    $selector: &;
    $currentSelector: '';
    @each $unit in $element {
        $currentSelector: #{$currentSelector + '.' + $B + $km-separator + $unit + ','};
    }

    @if hitAllSpecialNestRule($selector) {
        @at-root {
            #{$selector} {
                #{$currentSelector} {
                    @content;
                }
            }
        }
    } @else {
        @at-root {
            #{$currentSelector} {
                @content;
            }
        }
    }
}

@mixin m($modifier) {
    $selector: &;
    $currentSelector: '';
    @each $unit in $modifier {
        $currentSelector: #{$currentSelector + & + $modifier-separator + $unit + ','};
    }

    @at-root {
        #{$currentSelector} {
            @content;
        }
    }
}

@mixin when($state) {
    @at-root {
        &.#{$state-prefix + $state} {
            @content;
        }
    }
}
```
