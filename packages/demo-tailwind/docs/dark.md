# 深色模式

Tailwind 包含了一个 dark 变体

## 使用与原理

当需要启用深色模式时，只需要在样式前加上 dark: 前缀

```html
<div class="bg-white dark:bg-gray-800">
  <h1 class="text-gray-900 dark:text-white">Dark mode is here!</h1>
  <p class="text-gray-600 dark:text-gray-300">
    Lorem ipsum...
  </p>
</div>
```

> 用户的操作系统开启了深色模式时，策略底层是利用 @media (prefers-color-scheme: dark) 来实现的（win10 是设置 => 个性化 => 颜色 => 深色），如 dark:text-white 为：

```css
@media (prefers-color-scheme: dark)
.dark\:text-white {
    ...
}
```

默认情况下，Tailwind 未开启深色模式变体，需要将 darkMode 配置为 media：

```js
// tailwind.config.js
module.exports = {
  darkMode: 'media',
  // ...
}
```

## 与其他变体结合

```html
<button class="lg:dark:hover:bg-white ...">
  <!-- ... -->
</button>
```

## 为其它功能类启用 dark

默认情况下，dark 变体只对 backgroundColor、borderColor、gradientColorStops、placeholderColor 和 textColor 启用

如果需要为其他功能类启用，可以配置：

```js
// tailwind.config.js
module.exports = {
  // ...
  variants: {
    extend: {
      textOpacity: ['dark']
    }
  }
}
```

## 手动切换深色模式

如果不希望依赖操作系统的深色模式，可以将策略从 media 改为 class

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}
```

此时 dark:{class} 将在 HTML 树中出现 **dark** 类时起作用

```html
<html class="dark">
    <body>
    <!-- Will be black -->
    <div class="bg-white dark:bg-black">
        <!-- ... -->
    </div>
    </body>
</html>
```