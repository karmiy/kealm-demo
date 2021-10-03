# Module Federation 模块联邦 Demo

## 动态 remote vendor 实现共享应用

此例中有 5 个独立的项目

主应用：

- `app1`: 使用基于 Promise 的动态 Remote 方式，引用 app2、app3 暴露的模块

- `app4`: 同 app1，为了测试模块联邦的实现原理，能否实现状态共享（结论：否）

- `app5`: 使用在 ModuleFederationPlugin 中指定 remotes 的方式引用 app2 暴露的模块

子应用

- `app2`

- `app3`

## 运行 Demo

项目以 lerna monorepo 的结构

### 安装依赖

- npm install 安装根目录依赖

- npm run bootstrap 安装 app1-5 应用的依赖

### 启动开发环境服务

- npm run start

### 启动生成环境服务

- npm run build 打包

- npm run serve 启动本地服务

### 访问

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)
- [localhost:3003](http://localhost:3003/) (STANDALONE REMOTE)
- [localhost:3004](http://localhost:3004/) (HOST)
- [localhost:3005](http://localhost:3005/) (HOST)

## 加载分析

以 app1 为例

- 创建 script 标签加载 app2 的 remoteEntry.js

- app2 的 remoteEntry.js 在 window 上挂载 app2 变量，抛出 init、get 方法

- 调用 app2.init 进行初始化，复用 shared 共用的资源（app1、app2 都配置了 shared，双方条件一致的模块加载过一次，就不会再加载了，如 app1 加载了 react，app2 的 react 与其条件相同，那么 app2 会复用 app1 的 react）

- 调用 app2.get 获取需要的模块，返回一个 factory

- factory 执行后将返回我们需要的 Module 

## shared 配置

配置后，对应的模块将会被打包出一个独立的 js，在各项目加载应用时，置于共享池中

当代码引入此模块时，会去共享池中获取

### eager

默认情况下，shared 下的模块都是异步加载的

可以看到如 app1 中主逻辑是放在 bootstrap.js 中，且在 index.js 中 import() 异步加载

因为如果 bootstrap.js 里的逻辑是同步加载，那 react、react-dom 都被作为 shared 模块异步获取了，主逻辑里的 import React 将拿不到react 代码，导致报错

eager: true 允许 webpack 直接包含这个 shared 模块，而非异步请求

在 app1 中的 shared.react 配置并 build 后可以看到，若 eager: true，这个模块的代码会被直接打进 main.js 里，而不是独立一个 vendors-node_modules_react_index_js.js

### import

代表该模块应该放在 shared 模块中，以备当在 shared 模块找不到可用共享资源时可以备用

默认值是属性名（如 shared: { react: xx }，它的 import 为 'react'）

在 app2 中的 shared.react 配置并 build 可以看到，若 import: false，打包后将不会出现 vendors-node_modules_react_index_js.js 文件

### packageName

配置包名，一般只有这个包名在请求中无法被推导出来才需要配置

通常不用配

### singleton

允许共享范围内的共享模块用同一个版本，即单例

通常在 React、Vue 这种要开启，因为它们需要项目里只能存在一个实例

默认 false，开启后 requiredVersion、version 会失效从而进行尽可能的复用

### requiredVersion

该项目此包要求的版本

经过测试，没有配置 requiredVersion 时，默认取 package.json 该包的版本

### version

指定改包的版本，该值影响着打包后，被 registry 注册到共享域中的版本号

没有配置时，默认去该项目 node_modules 安装该包的版本

#### requiredVersion 与 version 相互关系

app1（HOST）
app2（STANDALONE REMOTE）

配置 react 共享模块，经测试：

- app1 version.16.12.0 + requiredVersion.^16.12.0，app2 version.16.12.0 + requiredVersion.^16.11.0

结果：app2 可复用 app1 的 react

分析：主应用 app1 初始判断 requiredVersion 版本是 ^16.12.0，它自己的 shared 包版本是 16.12.0，满足条件，加载此包（会在 scope 里标记 loaded: 1）。remote app2，app2 判断 requiredVersion 是 ^16.11.0，发现 app2 的 16.12.0 包满足条件，且已 loaded 过，复用

- app1 version.16.12.0 + requiredVersion.^16.13.0，app2 version.16.12.0 + requiredVersion.^16.11.0

结果：app2 不可复用 app1 的 react

分析：主应用 app1 初始判断 requiredVersion 版本是 ^16.13.0，它自己的 shared 包版本是 16.12.0，不满足条件，不会加载，这时使用 import 的备份资源，即自己的本地文件（这意味着这时 app1 的 react 打包后的 js 文件虽然被请求了，但是并没有被标记 loaded: 1，因为它是作为备用资源而加载的）。remote app2，app2 的 react 共享模块被 registry 注册，由于 app2 的版本也是 16.12.0，且当前 16.12.0 并没有被 loaded，会覆盖，app2 判断 requiredVersion 是 ^16.11.0，发现满足条件，调用 get 方法请求获取

- app1 version.16.12.1 + requiredVersion.^16.13.0，app2 version.16.12.0 + requiredVersion.^16.11.0

结果：app2 可复用 app1 的 react

分析：主应用 app1 初始判断 requiredVersion 版本是 ^16.13.0，它自己的 shared 包版本是 16.12.1，不满足条件，不会加载，这时使用 import 的备份资源，即自己的本地文件（这意味着这时 app1 的 react 打包后的 js 文件虽然被请求了，但是并没有被标记 loaded: 1，因为它是作为备用资源而加载的）。remote app2，app2 判断 requiredVersion 是 ^16.11.0，发现 app1 的 16.12.1 相比自己的 16.12.0 更满足条件，调用 get 方法请求获取（但因为之前 16.12.1 已经作为 app1 备用资源加载过了，所以在 devTools 不会看到请求）

- app1 version.16.12.1 + requiredVersion.^16.13.0，app2 version.16.12.0 + requiredVersion.^16.13.0

结果：app2 不可复用 app1 的 react

分析：主应用 app1 初始判断 requiredVersion 版本是 ^16.13.0，它自己的 shared 包版本是 16.12.1，不满足条件，不会加载，这时使用 import 的备份资源，即自己的本地文件（这意味着这时 app1 的 react 打包后的 js 文件虽然被请求了，但是并没有被标记 loaded: 1，因为它是作为备用资源而加载的）。remote app2，app2 的 react 共享模块 16.12.0 被 registry 注册，app2 判断 requiredVersion 是 ^16.13.0，没有包满足条件，使用自己的 import 备份资源，调用 get 方法请求获取

### strictVersion

允许 webpack 在版本无效不匹配的情况下拒绝共享模块

当本地备用模块可用且共享模块不是 singleton 单例时，默认为 true，否则 false

如果没有指定所需的版本，则无效

### shareKey

该共享模块，在 shared scope 共享域中的键

如 app1 react 和 app2 react 的 shareKey 不一样，它们则不会共享

因为注册 registry 是以 register(shareKey, version, factory) 的形式注册的，如 register("react", "16.14.0", () => ...)

shareKey 不一样则被划分在不同的区域

### shareScope

共享域的名称，默认是 'default'

比 shareKey 更上级，shareKey 是模块在域中的区域，shareScope 不同，则是 2 个不同的 scope 域了