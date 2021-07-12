# 提取组件

处理复用并且保持功能优先项目的可维护性

## @apply 抽取组件类

对于一些轻量的小组件样式，定义为一个独立组件（.vue、.tsx 组件）显得过重，可以实现一个简单的 .btn 样式作为组件类

Tailwind 提供了 @apply 指令将通用功能模块提取至组件类

> 有点像 Sass 的 mixin

```html
<button class="btn-indigo">
  Click me
</button>

<style>
  .btn-indigo {
    @apply py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75;
  }
</style>
```

建议使用 @layer：

- 把组件类样式提取至 components 层

- Tailwind 在 purge components 层时也会考虑到

```css
@layer components {
  .btn-blue {
    @apply py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
  }
}
```

## 编写组件插件

```js
// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    plugin(function({ addComponents, theme }) {
      const buttons = {
        '.btn': {
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.600'),
        },
        '.btn-indigo': {
          backgroundColor: theme('colors.indigo.500'),
          color: theme('colors.white'),
          '&:hover': {
            backgroundColor: theme('colors.indigo.600')
          },
        },
      }

      addComponents(buttons)
    })
  ]
}
```