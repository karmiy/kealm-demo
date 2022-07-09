![logo](../../shared/static/imgs/logo-kealm.png)

# 项目启动

```shell
# 主应用 base-vue
# vue 子应用 micro-vue
# react 子应用 micro-react

# 批量启动应用
npm run start

# 访问主应用
localhost:8080

# 访问 vue 子应用
localhost:10000

# 访问 react 子应用
localhost:20000
```

# 微前端

## What 是微前端

将不同功能按不同维度拆分成多个子应用

通过主应用来加载这些子应用

核心在于**拆**，而后再**合**

## Why 使用微前端

解决：

- 不同团队开发同一应用却使用不同技术栈
- 不同团队独立开发却无法独立部署，每次发布都需要整个应用代码进行部署
- 项目中保留着原有的老代码，不希望重构，又想引入新技术框架

价值：

- 技术栈无关
- 独立开发、独立部署
- 增量升级
- 独立运行时（每个微应用状态隔离不共享）

## How 落地微前端

现有方案：

- single-spa 是一个用于前端微服务化的 JavaScript 前端解决方案，实现了路由劫持和应用加载（不包含样式隔离、JS 隔离等）

- qiankun 基于 single-spa，提供了开箱即用的 API（single-spa + sandbox + import-html-entry），做到了技术栈无关

### 为什么不用 iframe

- 完全的硬隔离性也成了其弊端，JS 变量、样式共享困难
- 父子之间网页链接不同步，浏览器一刷新，iframe 里状态就没了，后退前进按钮也无法使用
- 每次进入子应用，浏览器都要重新加载资源

### 通讯方式

- url 进行数据传递（如带 ?a=xxx），但传递性很弱
- JS CustomEvent 实现通讯
- props 主子应用通信
- 全局变量
- Redux 通信

### 公共依赖复用

- CDN + webpack externals
- webpack5 模块联邦

### CSS 样式隔离

- BEM 约定式项目前缀
- CSS Modules 打包生成不冲突的选择器名
- Shadow DOM 真正意义上的隔离（但是子应用如果有弹框挂载到 body 这种操作，样式就作用不到了）
- CSS-IN-JS
- 为子应用添加 CSS hash 前缀

### JS 隔离

- 快照沙箱（子应用接入时先把 window 拷一份，移除子应用时再恢复，但是多子应用不太适用）
- proxy 沙箱