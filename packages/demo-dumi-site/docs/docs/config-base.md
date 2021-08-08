---
order: 4
---

# 基本配置

在项目根目录创建 [.umirc.ts](https://d.umijs.org/zh-CN/config) 或 config/config.ts 文件，都可对 dumi 进行配置

## description

配置文档的介绍，会显示在侧边栏菜单标题的下方，仅 doc 模式下可用

## logo

需要是正方形的图片，不然会和 title 重叠

<div>
  <Alert type="info">如果是使用本地图片，比如：/public/images/xxx.png，那么配置 /images/xx.png 引入即可</Alert>
</div>

## mode

doc | site，文档或站点模式

## menus

自定义侧边菜单的展示，仅 site 模式下可用，分多语言模式和单语言模式

```js
// config/config.ts 或 .umirc.ts
export default {
  menus: {
    // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
    '/guide': [
      {
        title: '菜单项',
        path: '菜单路由（可选）',
        children: [
          // 菜单子项（可选）
          'guide/index.md', // 对应的 Markdown 文件，路径是相对于 resolve.includes 目录识别的
        ],
      },
    ],
    // 如果该路径有其他语言，需在前面加上语言前缀，需与 locales 配置中的路径一致
    '/zh-CN/guide': [
      // 省略，配置同上
    ],
  },
};
```

## navs

自定义导航栏的展示，仅 site 模式下可用，分多语言模式和单语言模式

```js
// config/config.ts 或 .umirc.ts
export default {
  // 单语言配置方式如下
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/umijs/dumi',
    },
    {
      title: '我有二级导航',
      path: '链接是可选的',
      // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
      children: [
        { title: '第一项', path: 'https://d.umijs.org' },
        { title: '第二项', path: '/guide' },
      ],
    },
  ],

  // 多语言配置方式如下
  navs: {
    // 多语言 key 值需与 locales 配置中的 key 一致
    'en-US': [
      null, // null 值代表保留约定式生成的导航，只做增量配置
      {
        title: 'GitHub',
        path: 'https://github.com/umijs/dumi',
      },
    ],
    'zh-CN': [
      null, // null 值代表保留约定式生成的导航，只做增量配置
      {
        title: 'GitHub',
        path: 'https://github.com/umijs/dumi',
      },
    ],
  },
};
```

## resolve

resolve 是一个 Object 类型，用于配置 dumi 的解析行为，包含如下配置

### includes

默认 ['docs', 'src'] or ['docs', 'packages/pkg/src']

dumi 会尝试在配置的目录中递归寻找 markdown 文件，默认值为 docs 目录、src 目录（普通项目）

环境为 lerna 项目，则 src 目录变为 packages/pkg/src 目录，通常不需要配置，除非自动嗅探出现了『误伤』

### excludes

需要排除的目录，会对 dumi 嗅探到的目录或文件进行过滤，规则同 gitignore 配置

### previewLangs

默认 ['jsx', 'tsx']

配置 dumi 默认会转换为 ReactComponent 组件渲染的代码块

如果不希望做任何转换，例如类似 Umi 官网的纯站点，那么将该项设置为空数组即可。

### passivePreview

默认 false

代码块被动渲染模式，当为 true 时，仅将属于 resolve.previewLangs 且具有 preview 修饰符的代码块渲染为 ReactComponent 代码块

用于仅希望渲染 resolve.previewLangs 中的少部分代码块，而不是全部

## title

默认 package.name

配置文档的名称，导航栏或侧边栏上

## themeConfig

用于配置当前使用的主题包，具体配置项取决于主题包提供哪些配置，可访问 [主题列表](https://d.umijs.org/zh-CN/theme) 查看目前可用的主题