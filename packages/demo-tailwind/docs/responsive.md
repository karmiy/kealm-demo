# 响应式设计

```css
@media (min-width: ...px)
```

提供 5 个断点：

- sm: 640px

- md: 768px

- lg: 1024px

- xl: 1280px

- 2xl: 1536px

```html
<!-- sm: 这样的前缀 -->
<img class="w-16 md:w-32 lg:w-48" src="...">
```
还可以自定义断点：

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  }
}
```