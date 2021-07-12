# 函数与指令

Tailwind 向 CSS 暴露了函数和指令

## @tailwind

```css
/* 注入 Tailwind 基础 base 样式 + 插件 plugin 注册的 base 样式 */
@tailwind base;

/* 注入 Tailwind 基础 components 样式 + 插件 plugin 注册的 components 样式 */
@tailwind components;

/* 注入 Tailwind 基础 utilities 样式 + 插件 plugin 注册的 utilities 样式 */
@tailwind utilities;

/* 控制 Tailwind 在哪注入响应式变体，没写的话 Tailwind 默认会添加到我们 stylesheet 末尾 */
@tailwind screens;
```

## @apply

将通用功能模块提取至组件类

> 有点像 Sass 的 mixin

```css
.btn {
  @apply font-bold py-2 px-4 rounded;
}
```

类在生成的 CSS 中顺序并不会按 @apply 顺序来定，而是根据其在原始 CSS 的顺序：

```css
/* Input */
.bbb {
  /* 生成顺序会是 bg-100/500/800，p-4（padding: 1rem），py-2（padding-top/bottom: 0.5rem）*/
  @apply bg-blue-500 bg-blue-100 bg-blue-800 py-2 p-4;
}

/* Output */
.bbb {
  background-color: rgb(219,234,254); /* bg-100 */
  background-color: rgb(59,130,246); /* bg-500 */
  background-color: rgb(30,64,175); /* bg-800 */
  padding-top: 0.5rem; /* py-2 */
  padding-bottom: 0.5rem; /* py-2 */
  padding: 1rem; /* p-4 */
}
```

如果希望对功能类的应用顺序进行细粒度的控制，可以使用多个 @apply：

```css
/* Input */
.btn {
  @apply py-2;
  @apply p-4;
}

/* Output */
.btn {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding: 1rem;
}
```

@apply 也可以和常规 CSS 混用：

```css
/* Input */
.btn {
  transform: translateY(-1px);
  @apply bg-black;
}

/* Output */
.btn {
  background-color: #000;
  transform: translateY(-1px);
}
```

默认情况下，使用 @apply 内联的规则中，!important 将被删除，以避免出现特异性问题：

```css
/* Input */
.foo {
  color: blue !important;
}

.bar {
  @apply foo;
}

/* Output */
.foo {
  color: blue !important;
}

.bar {
  color: blue; /* import 没了 */
}
```

如果希望保留 important，可以在 @apply 尾部追加：

```css
.alert {
  @apply bg-red-500 !important;
}
```

```scss
/* scss 中不能直接追加，需要 #{} 插值使用 */
.alert {
  @apply bg-red-500 #{!important};
}
```

## @layer

告诉 Tailwind 一组自定义样式应该属于哪个 bucket，可用层有：

- base

- components

- utilities

使用 @layer 的好处在于：

- 指令中的所有 CSS 移至与相应 @tailwind 规则相同的位置

- Tailwind 在 purge 摇树时会考虑到被 @layer 指令包装的部分

## @variants

@variants 指令中声明自己的功能类来生成他们的 responsive, hover, focus, active 及其它 变体

```css
/* Input */
/* 注：写后面的生成在后面，也意味着优先级高，这里 hover 优先级高 */
@variants focus, hover {
  .rotate-0 {
    transform: rotate(0deg);
  }
  .rotate-90 {
    transform: rotate(90deg);
  }
}

/* Output */
.rotate-0 {
  transform: rotate(0deg);
}
.rotate-90 {
  transform: rotate(90deg);
}

.focus\:rotate-0:focus {
  transform: rotate(0deg);
}
.focus\:rotate-90:focus {
  transform: rotate(90deg);
}

.hover\:rotate-0:hover {
  transform: rotate(0deg);
}
.hover\:rotate-90:hover {
  transform: rotate(90deg);
}
```

## @responsive

@responsive 指令中声明他们的定义来生成您自己的类的响应式变体

是 @variants responsive { ... } 的简写

```css
/* Input */
@responsive {
  .bg-gradient-brand {
    background-image: linear-gradient(blue, green);
  }
}

/* Output */
.bg-gradient-brand {
  background-image: linear-gradient(blue, green);
}

@media (min-width: 640px) {
  .sm\:bg-gradient-brand {
    background-image: linear-gradient(blue, green);
  }
}

@media  (min-width: 768px) {
  .md\:bg-gradient-brand {
    background-image: linear-gradient(blue, green);
  }

@media (min-width: 1024px) {
  .lg\:bg-gradient-brand {
    background-image: linear-gradient(blue, green);
  }
}

@media (min-width: 1280px) {
  .xl\:bg-gradient-brand {
    background-image: linear-gradient(blue, green);
  }
}
```

## @screen

@screen 指令允许通过名称引用断点的媒体查询

```css
/* 这样太麻烦，需要写完整的媒体查询，且不灵活 */
@media (min-width: 640px) {
  /* ... */
}

/* 应该这样写，指定引用 sm 断点 */
@screen sm {
  /* ... */
}
```

## theme()

theme() 函数可以获取 Tailwind [主题配置](https://www.tailwindcss.cn/docs/theme)

```css
.content-area {
  /* 跟 js 操作对象一样用 . 衔接属性，也可用 [] */
  height: calc(100vh - theme('spacing.12'));
  padding: calc(100vh - theme('spacing[2.5]'));
}
```

由于 Tailwind 使用嵌套对象语法来定义其默认调色板，访问颜色时只能用 . 操作符

```css
/* ❌ */
.btn-blue {
  background-color: theme('colors.blue-500');
}

/* ✔ */
.btn-blue {
  background-color: theme('colors.blue.500');
}
```