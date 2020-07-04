![logo](../../shared/static/imgs/logo-kealm.png)

## Lerna

Monorepo 模式下统一管理 package，可以统一的安装包、添加依赖、执行脚本、移除 node_modules、发布等

[GitHub Lerna](https://github.com/lerna/lerna/)

- lerna.json 配置

```js
{
    "version": "1.1.3",
    "npmClient": "npm",
    "command": {
        "publish": {
            "ignoreChanges": ["ignored-file", "*.md"], // 不包括在 lerna changed/publish
            "message": "chore(release): publish", // 提交消息
            "registry": "https://npm.pkg.github.com" // 发布到 npmjs.org 外的 url
        },
        "bootstrap": {
            "ignore": "module-*", // 当执行 lerna bootstrap 时不包含的包
            "npmClientArgs": ["--no-package-lock"] // 作为参数传递给 npm install
        }
    },
    "packages": ["packages/*"]
}
```

- 初始化项目结构

```js
npx lerna init

npx lerna init --independent // 各个包之间独立

// independent 生成的 lerna.json 里 version 是 independent，非 independent 是 0.0.0 各个包共享版本
```

- 新增 package

```js
npx lerna create module-3
```

- 为 packages 新增包

```js
npx lerna add jquery // 为所有 packages 安装 jquery

npx lerna add url-loader --dev // 为所有 packages 安装 url-loader 在 devDependencies 下

npx lerna add lodash-es --scope=module-1 // 为 module-1 添加 lodash-es

npx lerna add lodash --scope=module-* // 为 module- 为前缀的 package 添加 lodash
```

- 为 packages 安装依赖

```js
npx lerna bootstrap // 为全部 package 执行 npm install
```

- 列出所有包

```js
npx lerna list
```

- 执行 packages 下的 script 命令

```js
npx lerna run test // 执行全部 packges 下的 test 这个 script

npx lerna run --scope module-1 test // 执行 module-1 下的 test script
```

- 移除全部 packages 下的 node_modules

```js
npx lerna clean
```

- 发布 packages

```js
npx lerna publish

// 项目需要先有 git origin
// git remote -v 查看
// 并且项目有更改要先提交，如提交到 GitHub
```

```json
// scope 包需要在 package.json 添加配置
"publishConfig": {
    "access": "public"
},
```