# 添加功能类

尽管 Tailwind 提供了相当全面的开箱即用的功能类集

仍可能会遇到需要添加一些自己的功能类的情况

## CSS

```css
@layer utilities {
  .popover {
    @apply bg-blue-400;
  }
}
```

建议使用 @layer：

- 把功能类样式提取至 utilities 层

- Tailwind 在 purge components 层时也会考虑到

## 响应式变体

```css
/* 会生效 full 与 md:full 功能类 */
@layer utilities {
  @variants responsive {
    .full {
      flex: 1;
    }
  }
}
```

```html
<div class="full md:full"></div>
```

## 深色模式变体

```js
// tailwind.config.js
module.exports = {
  darkMode: 'media', // 设置为 media 或者 class
  // ...
}
```

```css
@layer utilities {
  @variants dark {
    .filter-none {
      filter: none;
    }
    .filter-grayscale {
      filter: grayscale(100%);
    }
  }
}
```

```html
<div class="filter-grayscale dark:filter-none"></div>
```

## 状态变体

```css
@layer utilities {
  @variants hover, focus {
    .filter-none {
      filter: none;
    }
    .filter-grayscale {
      filter: grayscale(100%);
    }
  }
}
```

```html
<div class="filter-grayscale hover:filter-none"></div>
```

## 变体优先级

写在后面的优先级高（因为写前面的生成在前面，而 css 样式规则中，后会覆盖前）

```css
/* demo-1: Focus will take precedence over hover */
@variants hover, focus {
  .filter-grayscale {
    filter: grayscale(100%);
  }
  /* ... */
}

/* demo-2: Hover will take precedence over focus */
@variants focus, hover {
  .filter-grayscale {
    filter: grayscale(100%);
  }
  /* ... */
}
```

## 编写变体插件

```js
// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.filter-none': {
          filter: 'none',
        },
        '.filter-grayscale': {
          filter: 'grayscale(100%)',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ]
}
```