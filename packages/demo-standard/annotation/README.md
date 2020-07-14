## 代码注释规范

- 方法注释(js / ts)

利用 @description, @param, @returns 注释函数描述、参数、返回值

js 中参数与返回值类型使用 {XXX} 表示

ts 中不需要类型前缀，因为 ts 编写会带上类型声明

js 中可选参数用 \[XXX] 表示

ts 中不需要 \[XXX] 表示可选，参数 ? 标识即可选

```js
/**
 * @description 判断是否是函数
 * @param {any} value 被判断项
 * @param {object} [option] 配置
 * @returns {boolean} 函数返回 true，反之 false
 */
export const isFunction = function(value, option) {
    return toString.call(value) === '[object Function]';
}
```

```ts
/**
 * @description 判断是否是函数
 * @param value 被判断项
 * @param option 配置
 * @returns 函数返回 true，反之 false
 */
export const isFunction = function(value: any, option?: object): value is Function {
    return toString.call(value) === '[object Function]';
}
```

- 代码块注释

行级注释使用 // 注释，描述下方单行代码的操作信息

块级注释使用 /**/ 注释，描述下方一系列操作的总说明

```js
// 判断 value 是否为 number 类型
isNumber(value) && value++;
```

```js
/* 显示弹框功能 */
const modal = new Modal();

// 初始化弹框
modal.init();

// 判断 value 是否为 number 类型
isNumber(value) && value++;

...
```

- CSS 注释

```css
/* 头部区域 */
.header {
    width: 100%;
}

/* ------ START 产品块 ------ */
/* 展示区 */
.main {
    height: 100%;
    overflow: hidden;
    /* color: #1394ff; */
}

.content {
    display: flex;
    /* 控制产品列表水平居中 */
    justify-content: center;
}
/* ------ END ------ */
```

- HTML 注释

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- START 产品块 -->
    <div>123</div>
    <!-- END -->
</body>
</html>
```