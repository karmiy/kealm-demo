![logo](../../shared/static/imgs/logo-kealm.png)

# Esling

## VSCode 配置

### 安装

- ESLint

- Vetur

### 配置 settings.jon

```json
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
},
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue",
    "typescript",
    "typescriptreact"
]
```

## 命令

```js
// --ext 命令行选项指定一个逗号分隔的扩展名列表
eslint ./ --ext .js --ext .jsx 

// --fix 自动修复
eslint ./ --ext .jsx --fix
```

## 常见问题

### VSCode 打开的工作目录为项目父文件夹时，eslint 报错 Cannot find module eslint-plugin-xxx

配置 VScode 的 setting.json

```json
{
    "eslint.workingDirectories": [{ "mode": "auto" }],
}
```