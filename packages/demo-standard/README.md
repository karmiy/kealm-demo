![logo](../../shared/static/imgs/logo-kealm.png)

## 规范

### JavaScript 命名规范

- 变量：小驼峰命名

```js
// bad
const is_login = true;

// good
const isLogin = true;
```

- 对象属性：小驼峰命名

```js
// bad
const person = {
    first_name: 'kar',
    last_name: 'miy',
};

// good
const person = {
    firstName: 'kar',
    lastName: 'miy',
};
```

- 类名：大驼峰命名

```js
// bad
class person {
    ...
}

function user {
    ...
}

// good
class Person {
    ...
}

function User {
    ...
}
```

- 常量：全大写字符下划线分割

```js
// bad
const animation_type = {
    enter: 'km-fade-enter',
    leave: 'km-fade-leave',
}

// good
const ANIMATION_TYPE = {
    enter: 'km-fade-enter',
    leave: 'km-fade-leave',
}
```
typescript 中使用 enum 枚举类型定义

```ts
enum ANIMATION_TYPE {
    enter = 'km-fade-enter',
    leave = 'km-fade-leave'
}
```

- 私有变量/方法：下划线 + 小驼峰

```js
// bad
class Person {
    id = 0;
    openIndex = 0;

    say() {
        ...
    }

    store() {
        ...
    }
}

// good
class Person {
    id = 0;
    _openIndex = 0;

    say() {
        ...
    }

    _store() {
        ...
    }
}
```

### 函数命名规范

- can: 判断是否可执行某个动作，返回布尔值

- has: 判断是否含有某个值， 返回布尔值

- is: 判断是否为某个值，返回布尔值

- get: 获取某个值

- set: 设置某个值

```js
function canScroll() {}
function hasChildren() {}
function isIOS() {}
function getClassName() {}
function setStyle() {}
```

### 代码注释规范

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

### React 命名规范

- 组件名：大驼峰命名

```jsx
class Drawer extends React.Component {
    ...
}

function Drawer(props) {
    ...
}
```

- 接口类型定义：I 字母开头 + 大驼峰 + Props / State

```tsx
interface IDrawerProps {
    ...
}

interface IDrawerState {
    ...
}

class Drawer extends React.Component<IDrawerProps, IDrawerState> {
    ...
}
```