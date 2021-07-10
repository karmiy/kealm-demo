![logo](../../shared/static/imgs/logo-kealm.png)

## Cli 命令行 bin

### 本地测试

```sh
# 进入本项目 demo-cli 下执行以下命令 link 到全局
npm link
```

```sh
# 需要创建项目的位置，执行命令即可
@kealm/demo-cli
```

### 发布更新

```sh
npm login
npm publish --access public
```

### 使用

```sh
# 局部安装
npm install --save-dev @kealm/demo-cli
npx @kealm/demo-cli

# 全局安装
npm install -g @kealm/demo-cli
@kealm/demo-cli
```