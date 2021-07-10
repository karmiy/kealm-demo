![logo](../../shared/static/imgs/logo-kealm.png)

# Jest

## Install 

- jest

- @types/jest: jest 的 typescript 声明文件

- ts-jest, @babel/preset-typescript: 让 jest 可以执行 ts 文件

- babel-jest, @babel/core, @babel/preset-env: 让 jest 使用 Babel 编译 JavaScript 代码

## Run

- npm run test

- npm run test XXX

    - npm run test base

    - npm run test react/link

- npm run test:u

- npm run test:w

- npm run test:c

## Example

- [基本测试](./src/__tests__/general/base.spec.ts)

- [异步测试](./src/__tests__/general/async.spec.ts)

- [独立测试](./src/__tests__/general/only.spec.ts)

- [Jest 执行顺序测试](./src/__tests__/general/describe-order.spec.ts)

- [Hooks 钩子测试](./src/__tests__/general/hooks.spec.ts)

- [snapshot 快照测试](./src/__tests__/general/snapshot.spec.tsx)

- [timer 定时器测试](./src/__tests__/general/timer.spec.ts)

- [mock 函数测试](./src/__tests__/general/mock-functions.spec.ts)

- [手动 mock 测试](./src/__tests__/general/manual-mocks.spec.ts)

- [es6 class mock 测试](./src/__tests__/general/es6-class-mocks.spec.ts)

- [jest.mock factory 参数测试](./src/__tests__/general/mock-factory.spec.ts)

- [引入原生 module 测试](./src/__tests__/general/require-actual-mocks.spec.ts)

- [模拟 webpack 引入资源测试](./src/__tests__/general/using-webpack.spec.ts)

## Globals

[Global Methods](https://jestjs.io/docs/zh-Hans/api)

- afterAll

- afterEach

- beforeAll

- beforeEach

- describe

- describe.each

- describe.only

- describe.only.each

- describe.skip

- describe.skip.each

- test / it

- test.each

- test.only

- test.only.each

- test.skip

- test.skip.each

- test.todo

## Expect

[Expect Methods](https://jestjs.io/docs/zh-Hans/expect)

```ts
// e.g
expect(...).toBe(...);
```
常用：

- not: 取反

- toBe: 是否相等，包括引用

- toEqual: 是否相等，不包括引用

- toBeNull: 是否为 null

- toBeUndefined: 是否为 undefined

- toBeDefined: 是否非 undefined

- toBeTruthy: 是否为真值，在 if 判断中为真即可

- toBeFalsy: 是否为假值，false 0 NaN '' undefined null

- toBeGreaterThan: 大于

- toBeGreaterThanOrEqual: 大于等于

- toBeLessThan: 小于

- toBeLessThanOrEqual: 小于等于

- toBeCloseTo: 比较浮点数近似相等，如 expect(0.1 + 0.2).toBeCloseTo(0.3)

- toContain: 是否是数组或迭代器(如 Set)中的项

- toThrow: 函数执行后是否抛出错误，toThrow(error?)

- resolves: Promise 的 resolve 值

- rejects: Promise 的 reject 值

- assertions(1): 必须且只能执行一个 expect

- toBeCalled: 是否被调用

- toHaveBeenCalled: 同 toBeCalled

- toHaveBeenCalledTimes: 被调用次数

- toHaveBeenCalledWith: 被调用接收到的参数

- toHaveBeenLastCalledWith: 最后一次被调用接收到的参数

- toMatchSnapshot: 生成快照

- any: 创建对应构造函数，一般用于创建类型

## Mock Functions

[Mock Functions API](https://jestjs.io/docs/zh-Hans/mock-function-api)

当 mock 模块时，内部的函数都会变成 mock function，会在函数上挂载如下属性：

- mockFn.getMockName()

- mockFn.mock.calls

- mockFn.mock.results

- mockFn.mock.instances

- mockFn.mockClear()

- mockFn.mockReset()

- mockFn.mockRestore()

- mockFn.mockImplementation(fn)

- mockFn.mockImplementationOnce(fn)

- mockFn.mockName(value)

- mockFn.mockReturnThis()

- mockFn.mockReturnValue(value)

- mockFn.mockReturnValueOnce(value)

- mockFn.mockResolvedValue(value)

- mockFn.mockResolvedValueOnce(value)

- mockFn.mockRejectedValue(value)

- mockFn.mockRejectedValueOnce(value)

## Jest Object

[Jest Object API](https://jestjs.io/docs/zh-Hans/jest-object)

常用：

- jest.fn: 创建 mock 函数

- jest.mock: mock 一个模块

- jest.requireActual: 加载原模块，而非 mock 模块

- jest.spyOn: 监视对象属性

- jest.useFakeTimers: 启动伪定时器

- jest.runAllTimers: 加速运转，直接让全部定时器执行完毕

- jest.runOnlyPendingTimers: 只加速运转当前 pending 的定时器

- jest.advanceTimersByTime: 提前结束掉 10s 内定时器创建的宏任务

- jest.clearAllTimers: 清除全部定时器

## Configuring Jest

[jest.config.js 配置](https://jestjs.io/docs/zh-Hans/configuration)

## Jest CLI Options

[Jest 命令行](https://jestjs.io/docs/zh-Hans/cli)

常用：

- jest --verbose: 显示信息更详细

- jest --updateSnapshot: 更新快照

- jest --watch: 启动监听状态

- jest --coverage: 生成覆盖率报告

## Testing React

测试选择:

- [react-dom/test-utils 官方库](http://react.caibaojian.com/docs/test-utils.html)

- [react-test-renderer 官方库](http://react.caibaojian.com/docs/test-renderer.html)

- [Enzyme](https://enzymejs.github.io/enzyme/)

- [@testing-library/react](https://testing-library.com/docs/intro)

示例:

- [Link Component](./src/__tests__/react/link.spec.tsx)

更多示例参考 [demo-karma-react](https://github.com/karmiy/demo-karma)

## Testing Vue

安装:

- vue-jest: transform .vue 文件

- vue-template-compiler: 兼容 vue-jest

- babel-core@^7.0.0-bridge.0: 兼容 @babel/core

- jest-serializer-vue: 快照美化

- vue-class-component: 使用 ts class 写法

- vue-property-decorator: 增加了 ts class 装饰器功能

测试选择：

- 原生 Vue 组件实例测试

- [@vue/test-utils 官方库](https://vue-test-utils.vuejs.org/zh/)

示例:

- [Link Component](./src/__tests__/vue/link.spec.ts)

更多示例参考 [demo-karma-vue](https://github.com/karmiy/demo-karma)