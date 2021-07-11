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
// @tailwind base;
// @tailwind components;
// @tailwind utilities;
import 'tailwindcss/tailwind.css';
```

> 如果引入了 tailwindcss/tailwind.css，就不要在其他 css 文件有类似 @tailwind base 的注入操作，这会使得 base 打包时有 2 份（打包后的样式 base 在我们代码前或后，取决于我们引入顺序，如 app.tsx 在 tailwindcss/tailwind.css 之前，打包后的代码 app.tsx 里的样式 app.scss 的内容就在 base 之前）