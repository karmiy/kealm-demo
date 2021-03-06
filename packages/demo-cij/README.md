![logo](../../shared/static/imgs/logo-kealm.png)

# CSS in JS

## 学习来源

学习自 [CSS-in-JS：一个充满争议的技术方案](https://zhuanlan.zhihu.com/p/165089496)

## 常规 CSS 的存在问题

- CSS 一旦生效就应用全局，难免可能出现选择器冲突

## 内联样式的解决方案

优点：

- 一定程度上实现了组件化封装

- 避免的样式冲突

缺点：

- 内联样式缺少许多特性，如伪类选择器，媒体查询

- 不支持预处理器，浏览器兼容性受限制

## 替代方案

- CSS 模块化：类似 Angular 的 viewEncapsulation 与 Vue 的 scoped，将模块内的选择器附上特殊的哈希字符串，以实现样式的局部作用域，通常这种方案已经足够

- 人为控制，命名模块区分：如 BEM，缺点是团队需要达到共识，有着思维负担和维护成本

- Shadow DOM：借助如 [direflow.io](https://direflow.io/) 将 React 组件输出为 Web Components，但很少有项目这样做

## CSS-in-JS 的出现

借助 JS 解决许多 CSS 的缺陷：

- 全局作用域

- 移除死代码

- 生效顺序依赖加载顺序

- 常量共享

不过这种方案一直存在争议：

- CIJ 是一种伪需求，若开发者足够理解 CSS，利用预处理工具 scss postcss 和 BEM 就够了

- CIJ 方案与工具很多，缺乏标准，很可能现在用的方案后续存在被遗弃的风险

- CIJ 运行时性能损耗

## 趋势、标准

虽然 CIJ 还没形成真正的标准，但在接口 API 设计、功能和使用体验，实现方案也越来越接近

比较受欢迎的解决方案：

- [emotion](https://emotion.sh/docs/introduction)

- [styled-components](https://styled-components.com/)

通过几年的竞争和开发者的需求贴合，结合社区反馈，它们渐渐具有了几乎相同的 API，只是内部实现不同

不管是现在的主流方案还是新出现的方案，几乎在接口上使用相同的设计：

- CSS Prop

- Styled Components

两种方案都可以：

- 享受语法检查、自动增加浏览器属性前缀，增强浏览器兼容性等

- 利用 vscode-styled-components、stylelint 等插件，在 JS 代码中增强对 CSS 语法高亮支持

## CSS Prop vs Styled Components

- CSS Prop

优点：内联样式的升级，作为 JSX 标签属性与组件 props 紧密相连，帮助快速迭代开发，快速定位问题

缺点：样式直接嵌在 JSX 中势必影响组件代码可读性（不能单纯的把 css() 移出去，因为如果放外面，那不管这个组件有没有使用，都会立即加载创建，对未使用的组件而言没有必要，个人认为可以考虑以函数的形式在外面，组件内执行函数的方式来做组件与样式的分离）

- Styled Components

优点：更贴合 CSS 组件化封装，样式从组件中分离出来，JSX 结构更干净。样式组件以更规范的接口提供给团队复用，适合有成熟确定的设计语言的组件库或是产品

缺点：不如内联样式更方便直接，而且需要给额外多出来的样式组件定义新的标签名，会在一定程度上影响开发效率


## 我的理解

思考：

- 浏览器兼容前缀等（@emotion/css/styled 都内置了）

- 组件的卸载和加载，是否也会伴随样式的卸载和生成，意味着同一份样式可能被生成多次（不会，CSS Prop 在 css() 构建时创建对应样式，后面不会删了，Styled Components 同样也在组件初始化时创建样式，后面也不会移除）

- hash 创建（根据 css 内容创建的 hash，这意味着如果 css() 里有判断，根据不同场景，是会生成 2 条 hash 不同的 css 的，这个就要考虑到，仅仅因为部分样式不定，导致生成的 2 份 hash css 包含的大量的相同属性，是不是合适）

- 相同的样式组件，是否会生成 2 份（如 Styled Components，2 个组件样式一致，只会生成一份样式，并不会生成 2 份 hash 相同的样式）

优点：

- CIJ 利用 JS 的灵活性，让 CSS 的复用和造轮子更有可能，且一定程度解决了 CSS 冲突的问题

- CSS 按需加载的可能性

- 摇树优化

- 复用得当，样式的资源大小会小很多

缺点：

- 相当于运行时，才生成 CSS style，原本 CSS 可以在 index.html 加载时和 JS 什么的资源并行去拉取，CSS in JS 也导致了失去了这种资源的并行加载

- 带来了性能损耗（解析样式，在需要时加前缀，并放到 CSS 类中；生成 hash；利用 CSSOM 创建和更新样式），CIJ 的运行时损耗有时是可感知的，可能对用户体验造成影响

## CSS 原子化

CSS 原子化是使用纯 CSS 的一种流行方案。这种方案中，用户使用库提供的功能性CSS 类修饰 DOM 结构，以 [tailwindcss](https://tailwindcss.com/) 为代表

```html
<button class='bg-blue-500 hover:bg-blue-700 rounded'>
</button>
```

优点：

- 减少 CSS 规则冲突可能性（Specificity）

- CSS 的大小恒定，不会跟随项目的增长而增长

- 可以直接修改 HTML 属性而不用修改 CSS，改变最终渲染的效果

缺点：

- 需要开发者自定义一系列原子级的功能类（工程化成本）

- 引入 Tailwind 方案（学习成本）

而 CIJ 给 CSS 原子化带来了一些新的可能性，社区正在探索利用 CIJ 完成自动化的原子化 CSS 的可能性