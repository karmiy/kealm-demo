---
order: 7
toc: menu
---

# 插件

安装插件 npm 包到项目的 devDependencies 即可启用该插件

umi 生态绝大部分[插件](https://umijs.org/plugins)都能和 dumi 一起工作

如果插件有提供配置项，请在 config/config.ts 或者 .umirc.ts 中进行配置

```js
export default {
  // 其他配置项
  field: {},
};
```

## 插件列表

### @umijs/plugin-analytics

为文档启用 [Google Analytics](https://analytics.google.com/analytics/web) 或 [百度统计](https://analytics.google.com/analytics/web)

```js
export default {
  analytics: {
    // Google Analytics 代码，配置后会启用
    ga: 'google analytics code',
    // 百度统计代码，配置后会启用
    baidu: '5a66cxxxxxxxxxx9e13',
  },
};
```

[更多配置](https://umijs.org/zh-CN/plugins/plugin-analytics)

### @umijs/plugin-sass

启用组件库开发期间的 Sass 编译支持

<div>
  <Alert type='info'>该插件启用与否与组件库构建工具（father-build）无关，组件库自己用到 scss 需要自己启动对应的 Sass 编译</Alert>
</div>

```js
export default {
  sass: {
    // 默认值 Dart Sass，如果要改用 Node Sass，可安装 node-sass 依赖，然后使用该配置项
    implementation: require('node-sass'),
    // 传递给 Dart Sass 或 Node Sass 的配置项，可以是一个 Function
    sassOptions: {},
  },
};
```

[更多配置](https://umijs.org/zh-CN/plugins/plugin-sass)

### @umijs/plugin-esbuild

使用 esbuild 作为文档站点产物的压缩器

试验性功能，可能有坑，但压缩提速效果拔群

```js
export default {
  esbuild: {}, // 启用 esbuild 压缩
};
```
[更多配置](https://umijs.org/zh-CN/plugins/plugin-esbuild)

## 插件开发

如果现有的插件无法满足需求，或者你希望定制 dumi 的一些行为，则可以开发一个自己的插件来实现

在项目中创建一个 plugin.ts

```js
// /path/to/plugin.ts
import { IApi } from 'dumi';

export default (api: IApi) => {
  // 编写插件内容
};
```

```js
export default {
  plugins: ['/path/to/plugin.ts'],
};
```

## 插件 API

见官网