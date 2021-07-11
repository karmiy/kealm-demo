# 状态变体

> Tailwind 默认了一些核心插件（如 backgroundColor） 启用变体（如 hover），具体见官网

可以在 tailwind.config.js 的 variants 部分控制是否未某个插件启用某变体，如为 padding 启用 hover 变体：

```js
// tailwind.config.js
module.exports = {
  // ...
  variants: {
    extend: {
      padding: ['hover'],
    }
  },
}
```

## hover

hover: 前缀

```html
<button class="hover:bg-red-700">
  Hover me
</button>
```

## focus

focus: 前缀

```html
<input class="focus:ring-2 focus:ring-blue-600">
```

## active

active: 前缀

```html
<button class="bg-green-500 active:bg-green-700">
  Click me
</button>
```

## group-hover（父 hover 子变化）

标悬停在一个指定的父元素上时对其子元素设置样式

父元素添加 group 类

子元素的功能类添加 group-hover: 前缀

```html
<div class="group">
    <p class="text-indigo-600 group-hover:text-gray-900">New Project</p>
    <p class="text-indigo-500 group-hover:text-gray-500">
        Create a new project from a variety of starting templates.
    </p>
</div>
```

## group-focus（父 focus 子变化）

同 group-hover

默认情况下，所有核心插件都没有启用该 group-focus 变体

可以在 tailwind.config.js 文件中的 variants 部分控制是否为某个插件启用 group-focus 变体：

```js
// tailwind.config.js
module.exports = {
  // ...
  variants: {
    extend: {
      backgroundColor: ['group-focus'],
    }
  },
}
```

## focus-within（子 focus 父生效）

focus-within: 前缀

仅在一个子元素获得焦点时才应用功能类

```html
<div class="text-gray-400 focus-within:text-gray-600">
    <svg fill="currentColor"></svg>
    <input class="focus:ring-2 focus:ring-gray-300">
  </div>
```

## disabled

disabled: 前缀

默认情况下，所有核心插件都没有启用该 disabled 变体

```html
<button class="disabled:opacity-50" disabled>
  Submit
</button>
```

## visited

visited: 前缀

默认情况下，所有核心插件都没有启用该 visited 变体

```html
<a href="#" class="text-blue-600 visited:text-purple-600">Link</a>
```

## checked

checked: 前缀

默认情况下，所有核心插件都没有启用该 checked 变体

```html
<input type="checkbox" class="appearance-none checked:bg-blue-600 checked:border-transparent">
```

## first-child

first: 前缀

> 应该将 first: 功能类添加到子元素上，而不是父元素

默认情况下，所有核心插件都没有启用该 first-child 变体

```html
<div class="...">
  <div v-for="item in items" class="transform first:rotate-45 ...">
    {{ item }}
  </div>
</div>
```

## last-child

last: 前缀

> 应该将 last: 功能类添加到子元素上，而不是父元素

默认情况下，所有核心插件都没有启用该 last-child 变体

```html
<div class="...">
  <div v-for="item in items" class="transform last:rotate-45 ...">
    {{ item }}
  </div>
</div>
```

## odd-child

odd: 前缀

> 应该将 odd: 功能类添加到子元素上，而不是父元素

默认情况下，所有核心插件都没有启用该 odd-child 变体

```html
<div class="...">
  <div v-for="item in items" class="transform odd:rotate-45 ...">
    {{ item }}
  </div>
</div>
```

## even-child

even: 前缀

> 应该将 even: 功能类添加到子元素上，而不是父元素

默认情况下，所有核心插件都没有启用该 even-child 变体

```html
<div class="...">
  <div v-for="item in items" class="transform even:rotate-45 ...">
    {{ item }}
  </div>
</div>
```

## 与响应式结合

形如 sm:hover: 前缀

```html
<button class="... hover:bg-green-500 sm:hover:bg-blue-500">
  <!-- ... -->
</button>
```

## 为自定义功能类生成变体

@variants 指令包裹自定义 CSS 类，为它生成状态变体

```css
/* Input: */
@variants group-hover, hover, focus {
  .banana {
    color: yellow;
  }
}

/* Output: */
.banana {
  color: yellow;
}
.group:hover .group-hover\:banana {
  color: yellow;
}
.hover\:banana:hover {
  color: yellow;
}
.focus\:banana:focus {
  color: yellow;
}
```

```html
<!-- 使用: group-hover -->
<div class="group">
    <p class="group-hover:banana">New Project</p>
</div>
```

## 创建自定义变体

例如增加 required 伪类变体：

```js
// tailwind.config.js
const plugin = require('tailwindcss/plugin')

// .required\:bg-purple-700:required
module.exports = {
  plugins: [
    plugin(function({ addVariant, e }) {
      addVariant('required', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`required${separator}${className}`)}:required`
        })
      })
    })
  ]
}
```

> 开启后应该还需要配置对应的核心插件启用