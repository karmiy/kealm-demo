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