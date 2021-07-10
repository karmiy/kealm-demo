![logo](../../shared/static/imgs/logo-kealm.png)

# Stylelint

## VSCode 配置

```json
"css.validate": true,
"scss.validate": true,
"editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
},
```

## 核心

- [stylelint](https://stylelint.io)

## CSS

### plugins

- [stylelint-order](https://github.com/hudochenkov/stylelint-order#readme): 为 stylelint 扩展样式书写顺序的规则

- [stylelint-declaration-block-no-ignored-properties](https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties): 避免会被忽略的样式

```scss
a { 
    display: inline;
    width: 100px; // inline 下 width 是无意义的会被浏览器忽略
}
```

### extends

- [stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended#readme): css 推荐规则

- [stylelint-config-rational-order](https://github.com/constverum/stylelint-config-rational-order): 样式顺序符合如下规则

```
1. Positioning
2. Box Model
3. Typography
4. Visual
5. Animation
6. Misc
```

```scss
.declaration-order {
    /* Positioning */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;

    /* Box Model */
    display: block;
    float: right;
    width: 100px;
    height: 100px;
    margin: 10px;
    padding: 10px;

    /* Typography */
    color: #888;
    font: normal 16px Helvetica, sans-serif;
    line-height: 1.3;
    text-align: center;

    /* Visual */
    background-color: #eee;
    border: 1px solid #888;
    border-radius: 4px;
    opacity: 1;

    /* Animation */
    transition: all 1s;

    /* Misc */
    user-select: none;
}
```

## SCSS

### plugins

- [stylelint-scss](stylelint-scss): 为 stylelint 扩展 scss 规则

### extends

- [stylelint-config-recommended-scss](https://github.com/kristerkari/stylelint-config-recommended-scss#readme): scss 的推荐规则

## 命令

```json
{
    "scripts": {
        "lint:css": "stylelint ./**/*.{css,scss}",
        "lint:style": "stylelint ./**/*.{html,vue}"
    }
}
```