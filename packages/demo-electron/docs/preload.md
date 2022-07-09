# Preload

preload 的脚步虽运行于渲染器的环境中，却因能**访问 Node.js API** 而拥有了更多的权限

> 虽然 preload 与渲染进程共享全局 window，但不能往 window 上加属性，如 window.a = 1; 这是 Context Isolation，以避免泄漏任何具特权的 API 到您的网页内容代码中

取而代之是用 contextBridge 来向 render 进程暴露 API

```ts
// preload.ts
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true
});

// render.ts
console.log(window.myAPI);
```

## 暴露限制

值得注意的是，暴露的数据是有限制的，例如：**对象实例不会包含原型**

[contextBridge 参数 / 错误 / 返回类型支持](https://www.electronjs.org/zh/docs/latest/api/context-bridge#api-functions)

由于这个特性，当需要抛出 class 实例时，我们定义的 class 如果使用 extends 继承，需要注意：

- 要给 render 使用的方法，应该以箭头函数定义，确保其在实例上而非原型链
- 如果只是实例内部使用，非 contextBridge 抛出给 render 使用的方法，可以在原型链上，实例内部可调用不会 lose
- 注意被 extends 的 class 中的方法，如果需要被重写并使用 super.xxx() 调用，只能挂原型链上
