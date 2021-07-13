# 主题

theme 对象包含 screens、colors 和 spacing 的键，以及每一个可定制的核心插件的键

- screen: 影响响应式断点，作用于其他核心插件（lg:border-0）

- colors: 影响色调，作用于其他核心插件（border-red-50）

- spacing: 影响间距，作用于 width、height、padding、margin 等（w-10）

- 核心插件：一些[主题属性](https://www.tailwindcss.cn/docs/theme#-12)，如 borderRadius、opacity（**上面的 screen、colors、spacing 不属于核心插件**）

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
module.exports = {
  theme: {
    colors: {
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

默认由 

- width

- height

- maxHeight

- padding

- margin

- gap

- inset

- space

- translate

继承

```js
// tailwind.config.js
module.exports = {
  theme: {
    spacing: {
      px: '1px',
      0: '0',
      0.5: '0.125rem',
      // ...
    },
  }
}
```

## 核心插件

其余的 theme 部分用于配置每个核心插件的可用值

如 borderRadius：

```js
module.exports = {
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '.125rem',
      DEFAULT: '.25rem', // DEFAULT 不会生成后缀 
      'lg': '.5rem',
      'full': '9999px',
    },
  }
}
```
```css
.rounded-none { border-radius: 0 }
.rounded-sm   { border-radius: .125rem }
.rounded      { border-radius: .25rem }
.rounded-lg   { border-radius: .5rem }
.rounded-full { border-radius: 9999px }
```

## 扩展默认主题

可用在 theme 的 extend 下添加扩展

如扩展新颜色：

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'rose-blue': {
            10: '#1394ff', // text-rose-blue-10
        },
      },
    }
  }
}
```

## 覆盖默认主题

不在 extend 中，而是直接在外层的健将覆盖原主题

```js
// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  theme: {
    colors: {
      // ...colors, // 没有 ...colors，会直接覆盖，只有下面定义的这些才有效
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      gray: {
        100: '#f7fafc',
        900: '#1a202c',
      },
    }
  }
}
```

## 主题引用其他主题值

有时可能希望某个主题可用引用另一个组件的值

这时可以接收一个函数，函数接收 theme 作为参数：

```js
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      // ...
    },
    fill: theme => theme('colors'),
  }
}
```

## 主题应用默认主题

可以通过 tailwindcss/defaultTheme 引用到 Tailwind 的默认主题：

```js
// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Lato',
          ...defaultTheme.fontFamily.sans,
        ]
      }
    }
  }
}
```

## 禁用全部核心插件

同 [config](./config.md) 章节提及，当不需要某核心插件时，只需禁用对应的 corePlugins：

```js
// tailwind.config.js
module.exports = {
  corePlugins: {
    borderRadius: false,
    opacity: false,
  }
}
```
> 禁用后，Tailwind 的 VSCode 插件依然会有提示，但其实已经被移除了，用了也没效果，甚至在 @apply 引用会报错

注意 **screen、colors、spacing 不属于核心插件**，这意味着下面这种操作是没意义的：

```js
// tailwind.config.js
module.exports = {
  corePlugins: {
    screen: false, // ❌
    colors: false, // ❌
    spacing: false, // ❌
  }
}
```

## 自定义主题键

虽然自定义主题键并不会新增类：

```js
// tailwind.config.js
module.exports = {
  theme: {
    // 并不会生产出 positions-bottom 这种类
    positions: {
      bottom: 'bottom',
    },
  }
}
```

但在某些场景下，可以作为其他核心插件的中间键：

```js
// tailwind.config.js
module.exports = {
  theme: {
    positions: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    backgroundPosition: theme => theme('positions'),
    objectPosition: theme => theme('positions'),
  }
}
```

并且由于 theme 对象可以通过 theme() 函数在 CSS 里引用，也可以把自定义键作为变量在 CSS 里引用