![logo](../../shared/static/imgs/logo-kealm.png)

# Babel

## 学习来源

学习自掘金小册 [不容错过的 Babel7 知识](https://juejin.im/post/5ddff3abe51d4502d56bd143)

## Babel 作用

将 ES2015+ 版本的代码转换为向后兼容的 JavaScript 语法

它可以：

- 语法转换

- Polyfill 方式在目标环境中添加缺失的特性（@babel/polyfill）

- 源码转换

## 项目环境

新建项目文件夹 demo-babel

npm init -y 初始化项目

## @babel/core

babel 的核心功能都在 @babel/core 中，没有它，babel 无法进行编译

## @babel/cli

命令行工具，主要提供 babel 这个命令，适合安装在项目中

@babel/node 提供了 babel-node 命令，但它更适合全局安装，不适合安装在项目里

    npm install --save-dev @babel/core @babel/cli

这样就可以在项目里使用 babel 进行编译

在 package.json 添加 scripts 脚本：

    "scripts": {
        "compiler": "babel src --out-dir lib --watch"
    }

新建文件：

    // src/index.js
    const fn = () => {
        console.log(123);
    };
    fn();

使用 npm run compiler 执行编译，会编译 src 下的文件，输出到 lib 文件夹中

现在生成的 lib/index.js 内容与 src/index.js 代码是一致的，因为现在我们没有配置任何插件

babel 虽然开箱即用，但是什么动作也不做，想要它做一些实际工作，就需要为其添加 plugin 插件

## 基本编译

不需要配置 webpack，即可进入某些，利用终端如下语句对代码进行编译打包

```
npx babel src/index.js -d dist
npx babel src/* -d dist
```

## 插件

babel 构建在插件之上，使用现有的或自己编写的插件可以组成一个转换通道

babel 插件分类：

- 语法插件

- 转换插件

### 语法插件

这些插件只允许 babel **解析**特性类型的语法（不是转换），可在 AST 转换时使用，以支持解析新语法：

    import * as babel from "@babel/core";const code = babel.transformFromAstSync(ast, {
        // 支持可选链
        plugins: ["@babel/plugin-proposal-optional-chaining"],
        babelrc: false
    }).code;

### 转换插件

转换插件会启动相应的语法插件（因此不需要同时指定这两种插件）

这很容易理解，不启用相应的语法插件，意味着无法解析，都不能解析还怎么转换？

### 插件使用

如果插件发布在 npm 上，可以直接填写插件的名称

babel 会自动检查它是否被安装在 node_modules 下

在根目录下新建 **.babelrc** 文件：

    // .babelrc
    {
        "plugins": ["@babel/plugin-transform-arrow-functions"]
    }

也可以指定插件的相对/绝对路径

    // .babelrc
    {
        "plugins": ["./node_modules/@babel/plugin-transform-arrow-functions"]
    }

再重新编译 npm run compiler

可以看到，生成的 lib/index.js 箭头函数被转换了：

    // lib/index.js
    const fn = function () {
        console.log(123);
    };

    fn();

## 预设

现在我们仅支持箭头函数的转换，如果想转换其他新的特性，就需要使用其他对应的 plugin

而一一配置显然是非常繁琐且不切实际

babel 提供了 preset 预设来简化这个配置

通过使用或创建一个 preset 即可轻松使用**一组插件**

官方 preset：

- @babel/preset-env

- @babel/preset-flow

- @babel/preset-react

- @babel/preset-typescript

> 注：从 Babel v7 开始，所有针对标准提案阶段功能所编写的预设（stage preset）都已弃用，官方已移除 @babel/preset-stage-x

### @babel/preset-env

@babel/preset-env 主要作用是对我们所使用的，并且目标浏览器中缺少的功能进行代码转换和加载 polyfill

在不进行任何配置的情况下，@babel/preset-env 所包含的插件将**支持所有最新的 JS 特性（ES2015、ES2016 等，不包含 stage 阶段）**，将其转换为 ES5 代码

如果代码中使用了仍在 stage 阶段的语法，那么只配置 @babel/preset-env 转换是会抛出错误的，需要另外安装想要插件

@babel/preset-env 的使用：
    
    // .babelrc
    {
        "presets": ["@babel/preset-env"]
    }

**@babel/preset-env 会根据配置的目标环境，生成插件列表来编译**

对基于浏览器或 Electron 的项目，官方推荐使用 **.browserslistrc** 文件来指定目标环境

**默认情况下**，如果没有在 babel 配置文件（如 .babelrc）中设置 targets 或 ignoreBrowserslistConfig，**@babel/preset-env 会使用 .browserslistrc 配置源**

如果不是要兼容所有浏览器和环境，推荐指定目标环境，保证编译代码保持最小

### .browserslistrc

例如，仅包含浏览器市场份额超过 0.25% 的用户所需的 polyfill 和代码转换（忽略没有安全更新的浏览器，如 IE10 和 BlackBerry）

    //.browserslistrc
    > 0.25%
    not dead

更多配置 [.browserslistrc](https://github.com/browserslist/browserslist)

例如，我们将 .browserslistrc 配置为：

    //.browserslistrc
    last 2 Chrome versions

在执行 npm run compiler 会发现箭头函数并没有被转换

因为 chrome 最新 2 个版本都能支持箭头函数，不需要转换

## Polyfill

到目前为止，当前的配置似乎已经足够了？

我们修改下文件代码：

    const isInner = [1, 2, 3].includes(2);
    const p = new Promise(resolve => {
        resolve(100);
    });

编译后的结果：


    var isInner = [1, 2, 3].includes(2);
    var p = new Promise(function (resolve) {
    resolve(100);
    });

这个编译结果在低版本浏览器中使用显然是有问题的

低版本浏览器的 Array.prototype 上没有 includes 方法，也没有 Promise 构造函数

这是为什么？

语法转换只是将高版本的语法转换为低版本

内置函数、实例方法无法转换

这时就需要 **polyfill** 垫片，所谓垫片就是垫平不同浏览器或不同环境下的差异，让新的内置函数、实例方法等在低版本浏览器中也可使用

**@babel/polyfill** 模块包含 **core-js** 和一个自定义的 regenerator runtime 模块，可以模拟完整的 ES2015+ 环境（不包含第4阶段前的提议）

这意味这可以使用诸如 Promise、WeakMap 之类的新内置组件、Array.from、Object.assign 之类的静态方法，Array.prototype.includes 之类的实例方法以及生成器函数（前提是使用了 @babel/plugin-transform-regenerator 插件）

为了添加这些功能，polyfill 将添加到**全局**范围和类似 String 这样的内置原型中（会对全局环境造成污染）

> 注：V7.4.0 开始，@babel/polyfill 已被废弃，需要单独安装 core-js 和 regenerator-runtime

首先安装 @babel/polyfill：

    npm install --save @babel/polyfill

> 注：不使用 --save-dev，这是个需要在源码之前运行的垫片

我们需要将完整的 polyfill 在代码之前加载，修改 src/index.js

    // src/index.js
    import '@babel/polyfill';

    const isInner = [1, 2, 3].includes(2);

    const p = new Promise(resolve => {
        resolve(100);
    });

如果在 webpack 中使用 babel，也可以在入口中配置：

    // webpack.base.conf.js
    entry: [
        '@babel/polyfill',
        './src/index.js'
    ]

## 按需引入 polyfill

现在代码不管在低版本还是高版本浏览器都能正常运行

但是很多时候我们未必需要完整的 @babel/polyfill，这会导致构建出来的包体积过大

我们更期望的是，**按需引入**对应的 polyfill，避免无用代码

@babel/preset-env 提供了 **useBuiltIns** 参数，设置值为 usage 时，就只会包含代码中需要的 polyfill

> 注：配置此参数值为 usage，必须同时设置 corejs，如果不设置，会给出警告，默认使用的是 corejs 2。且注意，仍然需要安装 @babel/polyfill，当前 @babel/polyfill 版本会默认安装 corejs 2

我们需要设置使用 core-js@3，因为 core-js@2 分支已经不会再添加新特性，新特性都会添加到 3 中。例如 Array.prototype.flat()，在 core-js@2 是不包含此特性的

[core-js](https://github.com/zloirock/core-js)，是 JavaScript 模块化标准库，包含 Promise、Symbol、Iterator 和许多其他特性，它可以让你仅加载必须的功能

安装依赖：

    npm install --save core-js@3

修改配置：

    // .babelrc
    {
        "presets": [
            [
                "@babel/preset-env",
                {   
                    "useBuiltIns": "usage",
                    "corejs": 3
                }
            ]
        ]
    }

执行 npm run compiler 编译结果：

    "use strict";

    require("core-js/modules/es.array.includes");

    require("core-js/modules/es.object.to-string");

    require("core-js/modules/es.promise");

    var isInner = [1, 2, 3].includes(2);
    var p = new Promise(function (resolve) {
    resolve(100);
    });
    console.log(isInner, p);

可以看到，现在新特性做到了按需引入的效果，如果使用 webpack 打包，最后生成的包大小也会小很多

前面有提到，在 useBuiltIns 值为 usage 时，让人需要安装 @babel/polyfill，虽然上面的代码看起来似乎没有用到，但是如果使用了 async/await，就会用到了：

    // src/index.js
    async function request() {}

编译后会包含：

    // lib/index.js
    ...
    require("regenerator-runtime/runtime");
    ...

regenerator-runtime/runtime 在 @babel/polyfill 依赖中

当然也可以只安装 regenerator-runtime/runtime 取代安装 @babel/polyfill

## @babel/plugin-transform-runtime

到这似乎已经非常到位，但是还存在一些可以优化的地方

修改文件：

    // src/index.js
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        getX() {
            return this.x;
        }
    }


编译后的文件：

    // lib/index.js
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

    var Point =
    /*#__PURE__*/
    function () {
    function Point(x, y) {
        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    _createClass(Point, [{
        key: "getX",
        value: function getX() {
        return this.x;
        }
    }]);

    return Point;
    }();

可以看到 babel 创建了辅助函数 _classCallCheck、_defineProperties、_createClass

这似乎没什么问题，但是如果 10 个文件都使用了 class，是否意味着这些辅助函数会被 inject 10 次， 这显然会导致包体积的增大

这时就要用到 **@babel/plugin-transform-runtime** 插件

**@babel/plugin-transform-runtime 的作用：**

- 避免重复的帮助程序，减少代码体积：

使用 @babel/plugin-transform-runtime，**所有帮助程序都将引用模块 @babel/runtime**，这样就可以避免编译后的代码中出现重复的帮助程度，有效减少包体积

> 注：诸如 Array.prototype.flat() 等实例方法将不起作用，因为这需要修改现有的内置函数（可以使用 @babel/polyfill 来解决这个问题）。对此需要说明的是如果你配置的是 corejs3，core-js@3 现在已经支持原型方法，同时不污染原型

另外，@babel/plugin-transform-runtime 需要和 **@babel/runtime 配合使用**

@babel/plugin-transform-runtime 通常仅在开发时使用，运行时最终代码需要依赖 @babel/runtime，所以 @babel/runtime 需要作为生产依赖被安装：

    npm install --save-dev @babel/plugin-transform-runtime
    npm install --save @babel/runtime

修改配置：

    // .babelrc
    {
        "presets": [
            [
                "@babel/preset-env",
                {   
                    "useBuiltIns": "usage",
                    "corejs": 3
                }
            ]
        ],
        "plugins": [
            [
                "@babel/plugin-transform-runtime"
            ]
        ]
    }
    
重新编译 npm run compiler 结果：

    "use strict";

    var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

    var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

    var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

    var Point =
    /*#__PURE__*/
    function () {
        function Point(x, y) {
            (0, _classCallCheck2.default)(this, Point);
            this.x = x;
            this.y = y;
        }

        (0, _createClass2.default)(Point, [{
            key: "getX",
            value: function getX() {
            return this.x;
            }
        }]);
        return Point;
    }();

可以看到现在辅助函数如 createClass 已经是从 @babel/runtime 中引入的，而不是直接 inject 到代码中

- 创建沙盒环境：

@babel/plugin-transform-runtime 除了减少编译后代码体积，还可以创建沙盒环境

@babel/polyfill 会污染全局环境，添加全局的如 Promise、Set、Map 等，这在项目开发中是可行的

但是如何我们开发的是要发布到 npm 的库，如开发组件库供他人使用，这将是个问题

而 @babel/plugin-transform-runtime 会将这些内置别名作为 core-js 的别名，因此可以无缝使用它们，而无需 polyfill

如果我们希望 @babel/plugin-transform-runtime 不仅处理帮助函数，同时还能加载 polyfill，我们需要给 @babel/plugin-transform-runtime 增加配置信息

首先新增依赖：

    npm install @babel/runtime-corejs3 --save

修改配置问题：

    // .babelrc
    {
        "presets": [
            [
                "@babel/preset-env"
            ]
        ],
        "plugins": [
            [
                "@babel/plugin-transform-runtime",
                {
                    "corejs": 3
                }
            ]
        ]
    }

修改代码内容：

    // src/index.js
    const isInner = [1, 2, 3].includes(2);

    const p = new Promise(resolve => {
        resolve(100);
    });

    console.log(isInner, p);

编译 npm run compiler 结果：

    "use strict";

    var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

    var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

    var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

    var _context;

    var isInner = (0, _includes.default)(_context = [1, 2, 3]).call(_context, 2);
    var p = new _promise.default(function (resolve) {
    resolve(100);
    });
    console.log(isInner, p);

可以看到，没有在 Array.prototype 上添加新方法，也没有构造全局 Promise，避免了全局污染

> 如果配置的是 corejs 2，其中不包含实例的 polyfill 需要单独引入，如果配置的 corejs 是 3 版本，那么不管是实例方法还是全局方法，都不再污染全局环境

> 如果不是开发 library 库，而是开发项目，建议还是直接使用全局 polyfill，因为可能引用的第三方包存在没打包或打包后某些语法不兼容的情况，所以开发项目的话，全局 polyfill 可能通常是更好的选择

## 插件/预设 补充

### 执行顺序

如果 2 个转换插件都将处理程序的某个代码，则将根据 plugins 或 presets 的排列顺序依次执行

- plugins 在 presets 前执行

- plugins 顺序是从前往后

`````````
{
    "plugins": [
        "@babel/plugin-proposal-class-properties", 
        "@babel/plugin-syntax-dynamic-import"
    ]
}
`````````

先执行 @babel/plugin-proposal-class-properties，再执行 @babel/plugin-syntax-dynamic-import

- presets 顺序是从后往前

`````````
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
`````````

先执行 @babel/preset-react，再执行 @babel/preset-env

### 参数

plugins 和 presets 都可以接收参数

参数由**参数名**和**参数对象**组成一个**数组**

    {
        "plugins": [
            [
                "@babel/plugin-proposal-class-properties", 
                { "loose": true }
            ]
        ]
    }

### 插件短名称

如果插件名为 @babel/plugin-XXX，可以使用短名称 @babel/XXX

    {
        "plugins": [
            "@babel/transform-arrow-functions" //同 "@babel/plugin-transform-arrow-functions"
        ]
    }

如果插件名为 babel-plugin-XXX，可以使用短名称 XXX，该规则同样适用于带有 scope 的插件：

    {
        "plugins": [
            "newPlugin", //同 "babel-plugin-newPlugin"
            "@scp/myPlugin" //同 "@scp/babel-plugin-myPlugin"
        ]
    }
### 创建 Preset

可以简单返回一个插件数组：

    module.exports = function() {
        return {
            plugins: [
                "A",
                "B",
                "C"
            ]
        }
    }

preset 中也可以包含其他的 preset，以及带有参数的插件

    module.exports = function() {
        return {
            presets: [
                require("@babel/preset-env")
            ],
            plugins: [
                 [require("@babel/plugin-proposal-class-properties"), { loose: true }],
                 require("@babel/plugin-proposal-object-rest-spread")
            ]
        }
    }

## 配置文件

Babel 支持多种格式的配置文件

如果希望以编程的方式创建配置文件或希望编译 node_modules 目录下的模块，可以用 babel.config.js

如果只是需要一个简单且用于单个软件包的配置，可以使用 .babelrc

### babel.config.js

在项目根目录下创建 babel.config.js 文件：

    module.exports = function(api) {
        api.cache(true);

        const presets = [...];
        const plugins = [...];

        return {
            presets,
            plugins
        };
    }

具体配置可以查看 [babel.config.js 文档](https://www.babeljs.cn/docs/config-files#project-wide-configuration)

### .babelrc

在项目根目录下创建 .babelrc 文件：

    {
        "presets": [],
        "plugins": []
    }

具体配置可以查看 [.babelrc 文档](https://www.babeljs.cn/docs/config-files#file-relative-configuration)

### package.json

可以不在根目录下创建配置文件，而是将 .babelrc 的配置信息放到到 package.json 中：

    {
        "name": "my-package",
        "babel": {
            "presets": [],
            "plugins": []
        }
    }

### .babelrc.js

与 .babelrc 配置相同，但可以用 js 编写：

    //可以在其中调用 Node.js 的API
    const presets = [];
    const plugins = [];

    module.exports = { presets, plugins };

## 编译 node_modules

默认情况下，babel 是不会编译 node_modules 下的文件的

但是不排除有些第三方包没有编译打包就发布了，这会导致打包后我们在项目中的代码是可行的，但是引用的第三方包代码运行环境出现问题

如果希望指定编译 node_modules 下的文件，可以这样配置：

- 将 .babelrc 替换为 js 文件，如 babelrc.js

- babel-loader 配置 **configFile**

- exclude 配置排除时不包含指定包

```js
{
    rules: [
        {
            test: /\.(t|j)s(x?)$/, // 使用正则来匹配 js 文件
            exclude: /node_modules\/(?!my-library)/, // 排除 node_modules 下的包，但不包括 my-library
            loader: 'babel-loader',
            options: {
                configFile: path.resolve(__dirname, '..', '.babelrc.js')
            },
        },
    ]
}
```
如果 babel 配置是用 happypack 加载的，可以改为如下配置：

```js
{
    rules: [
        {
            test: /\.(t|j)s(x?)$/, // 使用正则来匹配 js 文件
            use: [{
                loader: 'happypack/loader?id=hpBabel'
            }]
        },
    ]
}
```

```js
{
    plugins: [
        new HappyPack({
            // 用唯一的标识符id，来代表当前的HappyPack是用来处理一类特定的文件
            id:'hpBabel',
            // 如何处理.js文件，用法和Loader配置中一样
            loaders:[
                'cache-loader', 
                {
                    exclude: /node_modules\/(?!my-library)/, // 排除 node_modules 下的包，但不包括 my-library
                    loader: 'babel-loader',
                    options: {
                        configFile: path.resolve(__dirname, '..', '.babelrc.js')
                    },
                }
            ],
            threadPool: HappyPackThreadPool,
        }),
    ]
}
```