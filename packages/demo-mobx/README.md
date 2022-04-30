![logo](../../shared/static/imgs/logo-kealm.png)

# Mobx

## 主旨

- State(状态)
- Actions(动作)
- Derivations(派生)：来源是 state，不需要进一步交互的东西都是 Derivation(派生)
  - computed values：纯函数方式从当前的可观测 State 中派生
  - reactions：state 改变时自动运行的副作用

## FAQ

### 使用 action 更新 state

严格模式下需要使用 action 更新 state，否则会有警告

### autorun 与 reaction

- autorun：接收一个副作用函数，会自动监听内部的响应式数据，初始会立即执行
- reaction：接收 2 个函数，第一个函数的返回值会被监听变化，第二个函数接收副作用函数，在前者返回值变化时回调，初始不会立即执行

### makeObservable 与 makeAutoObservable

makeObservable 可以理解为手动被成员进行注解（使用装饰器时注解会被忽略），makeAutoObservable 相当于加强版，默认情况下它将推断所有的属性