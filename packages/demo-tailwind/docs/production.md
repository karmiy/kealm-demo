# 生产优化

## 可清除原理

Purge 清除功能原理是在整个文件中查找符合正则的字符串

```js
// 基本上可以匹配任何由空格、引号或角括号分隔的字符串，包括 HTML 标签、属性、类，甚至是您标记中的实际书面内容
/[^<>"'`\s]*[^<>"'`\s:]/g
```

> 这意味着不能用动态创建类名如 `text-${isActive ? 'green' : 'red'}`，应该调整为 `isActive ? 'text-green' : 'text-red'`

> 值得注意的是，因为是正则匹配整个文件，**即使是被注释的样式，也会被 Tailwind 认为是有效的，不会被 purge 清除**，所以不需要的元素记得要去掉不要仅仅注释

## purge 配置

为所有的模板文件提供一个路径数组，告知 Tailwind 哪些文件应该被检测：

```js
// tailwind.config.js
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  ...
}
```

> 例如项目是 .tsx，需要配置 './src/**/*.tsx'，否则打包后将丢失样式，因为 Tailwind 不会去检测 tsx 文件进行正则匹配

## 手动启用 purge

如果想手动控制是否应该删除未使用的样式，需要使用对象的格式配置：

```js
// tailwind.config.js
module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.tsx'],
  },
  // ...
}
```

## 保留基本的 html 元素样式

默认情况下，Tailwind 将保留所有基本的 HTML 元素样式在您的 CSS 中，如 html，body，p，h1 等标签的样式

> 打包项目后可以看到自带了一些基础标签样式（tailwindcss/dist/base.css 里），如下：

```css
h1,h2,h3,h4,h5,h6 { font-size:inherit; font-weight:inherit }
```

这是为了防止过度清理（如使用 markdown 语法 # 会转换为 h1，这类隐式转换）

> 经过测试，@layer base 下定义的 h1 这类标签样式，也一样会被保留，即使没有用到

如果想禁止，可以配置 preserveHtmlElements 为 false：

```js
// tailwind.config.js
module.exports = {
  purge: {
    preserveHtmlElements: false,
    content: ['./src/**/*.html'],
  },
  // ...
}
```

## 清理特定层 layer

默认情况下，Tailwind 将清除 base，components 和 utilities 层中的所有样式

> base 清除的是非标签样式，如 @layer base 里的 h1 不会被清除（原因即上述的 保留基本的 html 元素样式），而 @layer base .k1 这种没用到就会被清除

可以指定 layer 手动指定想清除的层

```js
// tailwind.config.js
module.exports = {
  purge: {
    layers: ['components', 'utilities'],
    content: ['./src/**/*.html'],
  },
  // ...
}
```

## 移除所有未使用的 styles

默认 Tailwind 将只删除它自己生成的未使用的类，或者被明确地包裹在 @layer 指令中

不会移除第三方库 css 未使用的样式，如果想让第三方样式也有 purge 效果，可以进行配置：

```js
// tailwind.config.js
module.exports = {
  purge: {
    mode: 'all',
    preserveHtmlElements: false,
    content: [
      './src/**/*.js',
      './node_modules/flatpickr/**/*.js',
    ],
  },
  // ...
}
```