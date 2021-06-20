## CSS in JS

学习至 [CSS-in-JS：一个充满争议的技术方案](https://zhuanlan.zhihu.com/p/165089496)

### 常规 CSS 的存在问题

- CSS 一旦生效就应用全局，难免可能出现选择器冲突

### 内联样式的解决方案

优点：

- 一定程度上实现了组件化封装

- 避免的样式冲突

缺点：

- 内联样式缺少许多特性，如伪类选择器，媒体查询

- 不支持预处理器，浏览器兼容性受限制

### 替代方案

- CSS 模块化：类似 Angular 的 viewEncapsulation 与 Vue 的 scoped，将模块内的选择器附上特殊的哈希字符串，以实现样式的局部作用域，通常这种方案已经足够

- 人为控制，命名模块区分：如 BEM，缺点是团队需要达到共识，有着思维负担和维护成本

- Shadow DOM：借助如 [direflow.io](https://direflow.io/) 将 React 组件输出为 Web Components，但很少有项目这样做

### CSS-in-JS 的出现

借助 JS 解决许多 CSS 的缺陷：

- 全局作用域

- 移除死代码

- 生效顺序依赖加载顺序

- 常量共享

不过这种方案一直存在争议：

- CIJ 是一种伪需求，若开发者足够理解 CSS，利用预处理工具 scss postcss 和 BEM 就够了

- CIJ 方案与工具很多，缺乏标准，很可能现在用的方案后续存在被遗弃的风险

- CIJ 运行时性能损耗

### 趋势、标准

虽然 CIJ 还没形成真正的标准，但在接口 API 设计、功能和使用体验，实现方案也越来越接近

比较受欢迎的解决方案：

- [emotion](https://emotion.sh/docs/introduction)

- [styled-components](https://styled-components.com/)

通过几年的竞争和开发者的需求贴合，结合社区反馈，它们渐渐具有了几乎相同的 API，只是内部实现不同

不管是现在的主流方案还是新出现的方案，几乎在接口上使用相同的设计：

- CSS Prop

- 样式组件

以 emotion 为例：

```tsx
// CSS Prop
```

### 我的理解

优点：

- CIJ 利用 JS 的灵活性，让 CSS 的复用和造轮子更有可能，且一定程度解决了 CSS 冲突的问题

- CSS 按需加载的可能性

缺点：

- 相当于运行时，才生成 CSS style，原本 CSS 可以在 index.html 加载时和 JS 什么的资源并行去拉取，CSS in JS 也导致了失去了这种资源的并行加载，且带来了一些性能损耗

- （TODO）组件的卸载和加载，也会伴随样式的卸载和生成，意味着同一份样式可能被生成多次