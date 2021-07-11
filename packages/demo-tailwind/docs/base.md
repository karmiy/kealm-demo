# 添加基础样式

Tailwind 包含了一系列有用的开箱即用的基础样式 Preflight

但是有时想添加自己的额外的基础样式，以下是一些惯用做法的建议


## 在 HTML 中使用类

如果只想对 html 或者 body 元素应用某种全局样式，只需将现有类添加到 HTML 中的那些元素，而不是编写新的 CSS 

```html
<html lang="en" class="text-gray-900 leading-tight">
  <!-- ... -->
  <body class="min-h-screen bg-gray-100">
    <!-- ... -->
  </body>
</html>
```

## 使用 CSS

如果要将某些基本样式应用于特定元素，最容易的方法是将其添加到 CSS 中

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
}
```

> @layer 指令告诉 Tailwind 要把这些样式隶属至哪一层，如上会放到 base 层，这样就不用担心 CSS 顺序问题

通过使用 @layer 指令：

- 自动将这些样式移到 @tailwind base 的同一位置，以避免出现一些意外问题

- 在清除基础样式时考虑这些样式

## @font-face 规则

可以使用相同的方式添加 @font-face 规则

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  @font-face {
    font-family: Proxima Nova;
    font-weight: 400;
    src: url(/fonts/proxima-nova/400-regular.woff) format("woff");
  }
  @font-face {
    font-family: Proxima Nova;
    font-weight: 500;
    src: url(/fonts/proxima-nova/500-medium.woff) format("woff");
  }
}
```

## 使用插件

还可以通过 编写插件 并使用 addBase 函数来添加基础样式

```js
// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    plugin(function({ addBase, config }) {
      addBase({
        'h1': { fontSize: config('theme.fontSize.2xl') },
        'h2': { fontSize: config('theme.fontSize.xl') },
        'h3': { fontSize: config('theme.fontSize.lg') },
      })
    })
  ]
}
```