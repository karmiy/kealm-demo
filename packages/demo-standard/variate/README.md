## 变量命名规范

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