# 断点

默认断点来自常见的设备分辨率

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  }
}
```

## 自定义名称

可以用设备名称更贴合的代替 sm 这类尺寸方案：

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'tablet': '640px', // 如 tablet:text-red-50
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  }
}
```

## 使用 maxWidth

screen 默认以 minWidth 作为断点

如果需要，也可以配置为 maxWidth 为断点基准：

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    }
  }
}
```

## 同时使用 maxWidth 与 minWidth

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': {'min': '640px', 'max': '767px'},
      'md': {'min': '768px', 'max': '1023px'},
      'lg': {'min': '1024px', 'max': '1279px'},
      'xl': {'min': '1280px', 'max': '1535px'},
      '2xl': {'min': '1536px'},
    },
  }
}
```

## 多范围断点

有时可能需要在多范围的断点展示不同样式，如侧边栏的显示范围为 2 个区间：

- 668 - 767

- >= 868

这时就可以配置 2 个范围：

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '500px',
      'md': [
        {'min': '668px', 'max': '767px'},
        {'min': '868px'}
      ],
      'lg': '1100px',
      'xl': '1400px',
    }
  }
}
```

## 自定义媒体查询

如果需要为断点设置自定义媒体查询，而非 minWidth, maxWidth，可以通过 raw 键对象实现：

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        'portrait': {'raw': '(orientation: portrait)'},
        // => @media (orientation: portrait) { ... }
      }
    }
  }
}
```

raw 还可以专门对打印应用不同风格：

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        'print': {'raw': 'print'}, // print:text-black
        // => @media print { ... }
      }
    }
  }
}
```