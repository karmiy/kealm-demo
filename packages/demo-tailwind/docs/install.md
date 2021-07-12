# 安装

```sh
npm install tailwindcss@latest
```

```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

```sh
# 初始化 tailwind 配置文件 tailwind.config.js
npx tailwindcss init
```

```js
// 在项目入口文件引入默认样式
// @tailwind base; // 重置浏览器样式，即 normalize，可以不用
// @tailwind components; // 组件类，目前只有 container 类，可以不用
// @tailwind utilities; // 核心，需要引入才会生成对应属性类
import 'tailwindcss/tailwind.css';

or

// 不想注入 base 和 components，可以只引入 utilities
// 一般会全部注入，base 那的样式只会保留标签样式（如 h1），其他没用的会 tree shaking 掉
import 'tailwindcss/utilities.css';
```

> 如果引入了 tailwindcss/tailwind.css，就不要在其他 css 文件有类似 @tailwind base 的注入操作，这会使得 base 打包时有 2 份（打包后的样式 base 在我们代码前或后，取决于我们引入顺序，如 app.tsx 在 tailwindcss/tailwind.css 之前，打包后的代码 app.tsx 里的样式 app.scss 的内容就在 base 之前）

## 注意事项先行了解

- @tailwind base 作用：注入 Tailwind base 样式 + plugin 注册的 base 样式，**没有在 CSS 里加入指令 @tailwind base，即使 plugin 部分有注册样式，也无效，不会被打入包中**，且值得注意的是 **@layer 不受这个指令是否存在影响**，且 **base 中的标签样式 h1、h2 这类不管是否使用到，都会被打入包中（见生产优化小节）**

- @tailwind components 作用：注入 Tailwind components 样式 + plugin 注册的 components 样式，**没有在 CSS 里加入指令 @tailwind components，即使 plugin 部分有注册样式，也无效，不会被打入包中**，且值得注意的是 **@layer 不受这个指令是否存在影响**

- @tailwind utilities 作用：注入 Tailwind utilities 样式 + plugin 注册的 utilities 样式，**没有在 CSS 里加入指令 @tailwind utilities，即使 plugin 部分有注册样式，也无效，不会被打入包中**，且值得注意的是 **@layer 不受这个指令是否存在影响**

- 没有使用 @layer 包装的样式，不会被 tree shaking 优化，即使没用到