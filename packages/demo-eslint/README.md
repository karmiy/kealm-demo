![logo](../../shared/static/imgs/logo-kealm.png)

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

### 命令

```js
// --ext 命令行选项指定一个逗号分隔的扩展名列表
eslint ./ --ext .js --ext .jsx 

// --fix 自动修复
eslint ./ --ext .jsx --fix
```