# 主题

theme 对象包含 screens、colors 和 spacing 的键，以及每一个可定制的核心插件的键

## 默认主题

Tailwind 提供了[默认主题](https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L7)

## 屏幕

自定义项目中的响应断点

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  }
}
```

## 颜色

定制全局调色板

```js
// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  theme: {
    colors: {
      ...colors, // 没有 ...colors，会直接覆盖，只有下面定义的这些才有效
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      gray: {
        100: '#f7fafc', // 如 text-gray-100
        // ...
        900: '#1a202c',
      },

      // ...
    }
  }
}
```

## 间距

默认由 padding、 margin、 width、 height、 maxHeight、 gap、 inset、 space以及 translate 核心插件继承

