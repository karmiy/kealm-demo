![logo](../../shared/static/imgs/logo-kealm.png)

## 基本使用

```tsx
// main.js
function foo(id) {
    console.log(id);
}

console.log('foo');
foo(100);
```

打包 main.js 为 bundle.js，格式为 iife:

```tsx
// 打包 main.js 为 bundle.js，格式为:
// iife:
rollup ./main.js --file bundle.js --format iife

// commonjs:
rollup ./main.js --file bundle.js --format cjs

// umd，全局名称 myBundle
rollup ./main.js --file bundle.js --format umd --name 'myBundle'
```

## 命令行

参数

```tsx
-i, --input <filename>      要打包的文件（必须）
-o, --file <output>         输出的文件 (如果没有这个参数，则直接输出到控制台)
-f, --format <format>       输出的文件类型 (amd, cjs, esm, iife, umd)
-e, --external <ids>        将模块ID的逗号分隔列表排除
-g, --globals <pairs>       以`module ID:Global` 键值对的形式，用逗号分隔开 
                              任何定义在这里模块ID定义添加到外部依赖
-n, --name <name>           生成UMD模块的名字
-h, --help                  输出 help 信息
-m, --sourcemap             生成 sourcemap (`-m inline` for inline map)
-v, --version               打印已安装的Rollup版本号
-w, --watch                 监听源文件是否有改动，如果有改动，重新打包
--silent                    不要将警告打印到控制台
--amd.id                    AMD模块的ID，默认是个匿名函数
--amd.define                使用Function来代替`define`
--no-strict                 在生成的包中省略`"use strict";`
--no-conflict               对于UMD模块来说，给全局变量生成一个无冲突的方法
--intro                     在打包好的文件的块的内部(wrapper内部)的最顶部插入一段内容
--outro                     在打包好的文件的块的内部(wrapper内部)的最底部插入一段内容
--banner                    在打包好的文件的块的外部(wrapper外部)的最顶部插入一段内容
--footer                    在打包好的文件的块的外部(wrapper外部)的最底部插入一段内容
--interop                   包含公共的模块（这个选项是默认添加的）
```

## 配置文件

结构：

```tsx
// rollup.config.js
export default {
    // 核心选项
    input,     // 必须
    external,
    plugins,

    // 额外选项
    onwarn,

    // danger zone
    acorn,
    context,
    moduleContext,
    legacy

    output: {  // 必须 (如果要输出多个，可以是一个数组)
        // 核心选项
        file,    // 必须
        format,  // 必须
        name,
        globals,

        // 额外选项
        paths,
        banner,
        footer,
        intro,
        outro,
        sourcemap,
        sourcemapFile,
        interop,

        // 高危选项
        exports,
        amd,
        indent
        strict
    },
};
```

根目录下新建 **rollup.config.js**

```tsx
export default {
    input: './src/main.js',
    output: {
        file: 'dist/bundle.js',
        name: 'myBundle',
        format: 'umd',
    },
};
```

```tsx
// 缩写
rollup --c

// 默认使用 rollup.config.js
rollup --config

// 也可以自定义配置文件
rollup --config my.config.js
```

## rollup 的 JavaScript API

rollup 也可以单独导入用函数的形式去调用

[JavaScript API](https://www.rollupjs.com/guide/javascript-api)

## 继承其他工具

rollup 不知道如何去处理依赖

例如使用 lodash-es 包:

```tsx
npm i lodash-es --save
```

```tsx
import { debounce } from 'lodash-es';
console.log(debounce(() => console.log('debounce')));
```

打包后会出现警告:

```tsx
Unresolved dependencies
https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
lodash-es
```

这时需要使用 @rollup/plugin-node-resolve

```tsx
npm i @rollup/plugin-node-resolve --save-dev
```

```tsx
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: './src/main.js',
    output: {
        file: 'dist/bundle.js',
        name: 'myBundle',
        format: 'umd',
    },
    plugins: [resolve()],
};
```

## 外部引用 externals

同 webpack，可以指定哪些包不会你的库打包一起，而且保留引入

externals 可以接收模块名称的数组或接受模块名称的函数（返回 true）

```tsx
export default {
    // ...
    external: id => /lodash/.test(id)
}
```

```tsx
export default {
    // ...
    external: ['lodash']
}
```

这时如果代码中有引入 lodash 的语句，会发现打出的 bundle 保留了 require('lodash')

## Babel

```tsx
npm i -D @rollup/plugin-babel

npm i -D @babel/core @babel/preset-env
```

在 src 下新建 .babelrc.json

```tsx
{
    "presets": [
      "@babel/env"
    ]
}
```

rollup.config.js 引入:

```tsx
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    },
    plugins: [
        resolve(),
        babel({ babelHelpers: 'bundled' })
    ]
};
```
## 配置列表

[大选项列表](https://www.rollupjs.com/guide/big-list-of-options)

## 插件

[插件汇总](https://github.com/rollup/awesome)

- @rollup/plugin-commonjs 导入 commonjs 文件

- @rollup/plugin-json 可解析引入的 json 文件