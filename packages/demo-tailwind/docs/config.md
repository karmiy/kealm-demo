# 配置

定制 tailwind.config.js

```js
// Example `tailwind.config.js` file
const colors = require('tailwindcss/colors'); // Tailwind 默认颜色集合

module.exports = {
  theme: {
    // 会覆盖原色调，只剩这 4 个颜色
    // 色调不能是 extend 扩展，color 是以 text-[color]-[x] 形式使用，可 extends 的如 spacing 是 h-128
    colors: {
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    // 扩展
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
    }
  }
}
```

## 前缀

配置 prefix 为所有 Tailwind 功能类加前缀，在做组件库时很有用

```js
// tailwind.config.js
module.exports = {
  prefix: 'km-',
}
```

```css
.km-text-left {
  text-align: left;
}
.km-text-center {
  text-align: center;
}
.km-text-right {
  text-align: right;
}
```

前缀 + 任何变体时，是跟随在变体之后的：

```html
<div class="hover:tw-bg-blue-500">
  <!-- -->
</div>
```

前缀只会加在 Tailwind 生成的类中，**自定义类不会生效**，若需要则在自定义类前添加前缀即可：

```css
/* Input */
@variants hover {
  .bg-brand-gradient { /* ... */ }
}

/* Output */
.bg-brand-gradient { /* ... */ }
.hover\:bg-brand-gradient:hover { /* ... */ }
```

## important

配置 important 将 Tailwind 功能类标记为 !important

```js
// tailwind.config.js
module.exports = {
  important: true,
}
```

```css
.leading-none {
  line-height: 1 !important;
}
.leading-tight {
  line-height: 1.25 !important;
}
.leading-snug {
  line-height: 1.375 !important;
}
```

同样，这个效果不会作用到自定义类中，自定义类需自己添加

此外 Tailwind 还提供了**选择器策略**，如为所有功能类前加上给定得 #app 选择器

```js
// tailwind.config.js
module.exports = {
  important: '#app',
}
```

```html
<div id='app'>
      <p className='text-red-100'>spacing</p>
  </div>
```

```css
/* 会生成 #app 前缀 */
#app .text-red-100 {
  ...
}
```

## 分隔符

Tailwind 默认分割变体前缀和类名使用的是 **:**，如 hover:text-center

可以配置 separator 自定义分隔符

```js
// tailwind.config.js
module.exports = {
  separator: '_',
}
```

## 变体顺序

使用 extend 启用额外变体，这些变体也会自动排序，遵循默认变体顺序

如果需要自定义变体顺序，可以配置 variantOrder

```js
// tailwind.config.js
module.exports = {
  // ...
  variantOrder: [
    'first',
    'last',
    'odd',
    'even',
    'visited',
    'checked',
    'group-hover',
    'group-focus',
    'focus-within',
    'hover',
    'focus',
    'focus-visible',
    'active',
    'disabled',
  ]
}
```

## 核心插件

corePlugins 部分允许您完全禁用掉那些 Tailwind 默认生成的类，如果项目不需要

没有配置 corePlugins 时，默认启用所以插件

[核心插件列表](https://www.tailwindcss.cn/docs/configuration#-11)

```js
// tailwind.config.js
module.exports = {
  // 1、对象结构，不要的 false 禁掉
  corePlugins: {
    float: false,
    objectFit: false,
    objectPosition: false,
    flex: false, // 禁掉用，如 flex-auto 这个内置类就没了
  },
  // 2、数组结构，列出哪些是需要的，没列的即不需要
  corePlugins: [
    'margin',
    'padding',
    'backgroundColor',
    // ...
  ],
  // 3、空数组，表示全部核心插件都不需要
  corePlugins: []
}
```

## JavaScript 中引用配置内容

有时我们可能需要在 JS 代码中引用配置的内容

Tailwind 提供了 resolveConfig 函数，用来生成一个配置对象的完全合并版：

```js
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig)

fullConfig.theme.width[4]
// => '1rem'

fullConfig.theme.screens.md
// => '768px'

fullConfig.theme.boxShadow['2xl']
// => '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
```

但这会过滤性的引入构建时的一些依赖，导致包体积变大

推荐使用 [babel-plugin-preval](https://github.com/kentcdodds/babel-plugin-preval) 之类的工具在构建时生成静态配置