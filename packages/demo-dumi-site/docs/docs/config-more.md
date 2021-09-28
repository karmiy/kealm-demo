---
order: 5
---

# 更多配置

在项目根目录创建 [.umirc.ts](https://d.umijs.org/zh-CN/config) 或 config/config.ts 文件，都可对 dumi 进行配置

## 404

默认 true

约定式路由中 404 页面的生效规则，可通过设置为 false 关闭

## alias 

配置别名，对引用路径进行映射

```js
export default {
  alias: {
    foo: '/tmp/a/b/foo',
  },
};
```

Umi 内置了以下别名：

- @，项目 src 目录
- @@，临时目录，通常是 src/.umi 目录
- umi，当前所运行的 umi 仓库目录
- react-router 和 react-router-dom，底层路由库，锁定版本，打包时所有依赖了他们的地方使用同一个版本
- react 和 react-dom，默认使用 16.x 版本，但如果项目里有依赖，会优先使用项目中依赖的版本

## analyze

包模块结构分析工具，可以看到项目各模块的大小，按需优化

通过 ANALYZE=1 umi build 或 ANALYZE=1 umi dev 开启，默认 server 端口号为 8888，更多配置如下：

```js
{
  // 配置具体含义见：https://github.com/umijs/umi-webpack-bundle-analyzer#options-for-plugin
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  }
}
```

## autoprefixer

[autoprefixer 的配置项](https://github.com/postcss/autoprefixer#options)

默认 { flexbox: 'no-2009' }

不要设置 overrideBrowserslist，此配置被内部接管，通过 targets 配置项选择你要兼容的浏览器

## base

默认 /

设置路由前缀，通常用于部署到非根目录

如有路由 / 和 /users，然后设置了 base 为 /foo/，那么就可以通过 /foo/ 和 /foo/users 访问到之前的路由

## chainWebpack

通过 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 的 API 修改 webpack 配置

- memo，当前 webpack-chain 对象
- env，当前环境，development、production 或 test 等
- webpack，webpack 实例，用于获取其内部插件
- createCSSRule，用于扩展其他 CSS 实现，比如 sass, stylus
- type，当前 webpack 实例类型，默认走 csr，如果开启 ssr，会有 ssr 的 webpack 实例

```js
export default {
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    // 设置 alias
    memo.resolve.alias.set('foo', '/tmp/a/b/foo');

    // 删除 umi 内置插件
    memo.plugins.delete('progress');
    memo.plugins.delete('friendly-error');
    memo.plugins.delete('copy');
  },
};
```

支持异步

```js
export default {
  async chainWebpack(memo) {
    await delay(100);
    memo.resolve.alias.set('foo', '/tmp/a/b/foo');
  },
};
```
SSR 时，修改服务端构建配置

```js
import { BundlerConfigType } from 'umi';

export default {
  chainWebpack(memo, { type }) {
    // 对 ssr bundler config 的修改
    if (type === BundlerConfigType.ssr) {
      // 服务端渲染构建扩展
    }

    // 对 csr bundler config 的修改
    if (type === BundlerConfigType.csr) {
      // 客户端渲染构建扩展
    }

    // ssr 和 csr 都扩展
  },
};
```

## chunks

默认是 ['umi']

如做了 vendors 依赖提取之后，会需要在 umi.js 之前加载 vendors.js

```js
export default {
  chunks: ['vendors', 'umi'],
  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
          },
        },
      },
    });
  },
};
```

## cssLoader

设置 [css-loader](https://github.com/webpack-contrib/css-loader#options) 配置项

## cssnano

设置 [cssnano](https://cssnano.co/docs/optimisations/) 配置项，基于 default 的配置集合

## copy

设置要复制到输出目录的文件或文件夹

```js
export default {
  copy: ['foo.js', 'bar'],
};
```

```js
export default {
  copy: [
    {
      from: 'bar/bar.js',
      to: 'some/bar.js',
    },
  ],
};
```

## define

提供给代码中可用的变量

```js
// console.log(hello, FOO); 会被编译成 console.log(hello, 'bar')
export default {
  define: {
    FOO: 'bar',
  },
};
```

<div>
  <Alert type='info'>define 对象的属性值会经过一次 JSON.stringify 转换</Alert>
</div>

内置 define：

- process.env.NODE_ENV，值为 development 或 production 

## devServer

配置开发服务器

包含以下子配置项：

- port，端口号，默认 8000
- host，默认 0.0.0.0
- https，是否启用 https server，同时也会开启 HTTP/2
- writeToDisk，生成 assets 到文件系统

## devtool

用户配置 sourcemap 类型

默认 heap-module-source-map in dev, false in build

详见 [webpack#devtool 配置](https://webpack.js.org/configuration/devtool/#devtool)

常见的可选类型有：

- eval，最快的类型，但不支持低版本浏览器，如果编译慢，可以试试

- source-map，最慢最全的类型

## dynamicImport

是否启用按需加载，即是否把构建产物进行拆分，在需要的时候下载额外的 JS 再执行

默认 false，只生成一个 js 和一个 css，即 umi.js 和 umi.css。优点是省心，部署方便；缺点是对用户来说初次打开网站会比较慢

打包后通常结构：

```
+ dist
  - umi.js
  - umi.css
  - index.html
```

启用之后，需要考虑 publicPath 的配置，可能还需要考虑 runtimePublicPath，因为需要知道从哪里异步加载 JS、CSS 和图片等资源

```
+ dist
  - umi.js
  - umi.css
  - index.html
  - p__index.js
  - p__users__index.js
```

这里的 p__users_index.js 是路由组件所在路径 src/pages/users/index，其中 src 会被忽略，pages 被替换为 p

包含以下子配置项

- loading, 类型为字符串，指向 loading 组件文件

```js
export default {
  dynamicImport: {
    loading: '@/Loading',
  },
};
```

然后在 src 目录下新建 Loading.tsx：

```tsx
import React from 'react';

export default () => {
  return <div>加载中...</div>;
};
```

构建之后使用低网络模拟就能看到效

## dynamicImportSyntax

默认 false

如果你不需要路由按需加载，只需要支持 import() 语法的 code splitting，可使用此配置

```js
export default {
  dynamicImportSyntax: {},
};
```

## exportStatic

将所有路由输出为 HTML 目录结构，以免刷新页面时 404，具体见官网文档

## externals

设置哪些模块可以不被打包，同 webpack 等打包工具

```js
export default {
  // 可以理解为 import react from 'react' 会被替换为 const react = window.React
  externals: {
    react: 'window.React',
  },
  scripts: ['https://unpkg.com/react@17.0.1/umd/react.production.min.js'],
};
```

## extraBabelIncludes

配置额外需要做 babel 编译的 npm 包或目录

```js
export default {
  extraBabelIncludes: [
    // 支持绝对路径
    join(__dirname, '../../common'),

    // 支持 npm 包
    'react-monaco-editor',
  ],
};
```

## extraBabelPlugins

配置额外的 babel 插件

```js
export default {
  extraBabelPlugins: ['babel-plugin-react-require'],
};
```

## extraBabelPresets

配置额外的 babel 插件集

## extraPostCSSPlugins

配置额外的 [postcss 插件](https://github.com/postcss/postcss/blob/main/docs/plugins.md)

## favicon

配置 favicon 地址（href 属性）

<div>
  <Alert type='info'>如果要使用本地的图片，图片请放到 public 目录</Alert>
</div>

## fastRefresh

快速刷新（[Fast Refresh](https://umijs.org/docs/fast-refresh)），开发时可以保持组件状态，同时编辑提供即时反馈

## hash

默认 false

配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存

## headScripts

配置 \<head> 里的额外脚本，数组项为字符串或对象

```js
export default {
  headScripts: [`alert(1);`, `https://a.com/b.js`],
};
```

会生成 HTML：

```html
<head>
  <script>
    alert(1);
  </script>
  <script src="https://a.com/b.js"></script>
</head>
```

如果要使用额外属性，可以用对象的格式

```js
export default {
  headScripts: [
    { src: '/foo.js', defer: true },
    { content: `alert('你好');`, charset: 'utf-8' },
  ],
};
```

```html
<head>
  <script src="/foo.js" defer></script>
  <script charset="utf-8">
    alert('你好');
  </script>
</head>
```

## history

默认 { type: 'browser' }

配置 [history 类型和配置项](https://github.com/ReactTraining/history/blob/master/docs/getting-started.md)

配置项：

- type，可选 browser、hash 和 memory
- options，传给 create{{{ type }}}History 的配置项，每个类型器的配置项不同
  - getUserConfirmation 由于是函数的格式，暂不支持配置
  - basename 无需配置，通过 umi 的 base 配置指定

## ignoreMomentLocale

忽略 moment 的 locale 文件，用于减少尺寸

默认 false

## inlineLimit

配置图片文件是否走 base64 编译的阈值

默认是 10000 字节，少于它会被编译为 base64 编码，否则会生成单独的文件

## lessLoader

设置 [less-loader 配置项](https://github.com/webpack-contrib/less-loader)

## links

配置额外的 link 标签

## manifest

配置是否需要生成额外用于描述产物的 manifest 文件，具体见官网

只在 umi build 时会生成

## metas

配置额外的 meta 标签。数组中可以配置key:value形式的对象

```js
export default {
  metas: [
    {
      name: 'keywords',
      content: 'umi, umijs',
    },
    {
      name: 'description',
      content: '🍙 插件化的企业级前端应用框架。',
    },
    {
      bar: 'foo',
    },
  ],
};
```

```html
<meta name="keywords" content="umi, umijs" />
<meta name="description" content="🍙 插件化的企业级前端应用框架。" />
<meta bar="foo" />
```

## nodeModulesTransform

设置 node_modules 目录下依赖文件的编译方式

默认 { type: 'all' }

两种编译模式：

- 默认是 all，全部编译，然后可以通过 exclude 忽略不需要编译的依赖库

- 可切换为 none，默认值编译 [es5-imcompatible-versions](https://github.com/umijs/es5-imcompatible-versions) 里声明的依赖，可通过 exclude 配置添加额外需要编译的

## outputPath

默认 dist

指定输出路径

不允许设定为 src、public、pages、mock、config 等约定目录

## plugins

配置额外的 umi 插件

数组项为指向插件的路径，可以是：

- npm 依赖、
- 相对路径（会从项目根目录开始找）
- 绝对路径

```js
export default {
  plugins: [
    // npm 依赖
    'umi-plugin-hello',
    // 相对路径
    './plugin',
    // 绝对路径
    `${__dirname}/plugin.js`,
  ],
};
```

插件的参数平级的配置项声明，比如

```js
export default {
  plugins: ['umi-plugin-hello'],
  // 配置项的名字通常是插件名去掉 umi-plugin- 或 @umijs/plugin 前缀
  hello: {
    name: 'foo',
  },
};
```

## polyfill

设置按需引入 polyfill，对应 core-js 的[引入范围](https://github.com/zloirock/core-js#commonjs-api)，默认全量引入

```js
export default {
  polyfill: {
    imports: [
      'core-js/stable',
    ]
  }
}
```

<div>
  <Alert type='info'>设置 BABEL_POLYFILL=none 环境变量后，该配置失效，且无 polyfill 引入</Alert>
</div>

## postcssLoader

设置 [postcss-loader 配置项](https://github.com/postcss/postcss-loader#options)

## presets

同 plugins 配置，用于配置额外的 umi 插件集

## proxy

配置代理能力，同 webpack

```js
export default {
  proxy: {
    '/api': {
      'target': 'http://jsonplaceholder.typicode.com/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
}
```

## publicPath

默认 /

通常配置 cdn 前缀，同 webpack

## runtimeHistory

设置 runtimeHistory 后，可以在运行时动态修改 history 类型

```jsx
import { setCreateHistoryOptions } from 'umi';

setCreateHistoryOptions({
  type: 'memory',
});
```

## runtimePublicPath

配置是否启用运行时 publicPath

通常用于一套代码在不同环境有不同的 publicPath 需要，然后 publicPath 由服务器通过 HTML 的 window.publicPath 全局变量输出

启用后，打包时会额外加上这一段

```js
__webpack_public_path__ = window.resourceBaseUrl || window.publicPath;
```

webpack 在异步加载 JS 等资源文件时会从 window.resourceBaseUrl 或 window.publicPath 里开始找

## ssr

默认 false

配置是否开启服务端渲染，具体见官网

## scripts

同 headScripts，配置 <body> 里的额外脚本

## styleLoader

启用并设置 [style-loader 配置项](https://github.com/webpack-contrib/style-loader)，用于让 CSS 内联打包在 JS 中，不输出额外的 CSS 文件

## styles

配置额外 CSS

```js
export default {
  styles: [`body { color: red; }`, `https://a.com/b.css`],
};
```

会生成 HTML：

```html
<head>
  <style>
    body {
      color: red;
    }
  </style>
  <link rel="stylesheet" href="https://a.com/b.css" />
</head>
```

## targets

默认 { chrome: 49, firefox: 64, safari: 10, edge: 13, ios: 10 }

配置需要兼容的浏览器最低版本，会自动引入 polyfill 和做语法转换

如要兼容 ie11：

```js
export default {
  targets: {
    ie: 11,
  },
};
```

- 配置的 targets 会和合并到默认值，不需要重复配置
- 子项配置为 false 可删除默认配置的版本号

## terserOptions

配置压缩器 [terser 的配置项](https://github.com/terser/terser#minify-options)

默认 [terser 配置](https://github.com/umijs/umi/blob/master/packages/bundler-webpack/src/getConfig/terserOptions.ts)

## theme

配置主题，实际上是配 less 变量

```js
export default {
  theme: {
    '@primary-color': '#1DA57A',
  },
};
```

## webpack5

默认 false

使用 webpack 5 代替 webpack 4 进行构建

物理缓存功能默认开启，可通过设置环境变量 WEBPACK_FS_CACHE 为 none 来禁用

包含以下子配置项：

- lazyCompilation，是否启用基于路由的按需编译

## workerLoader

开启 worker-loader 功能

默认 false