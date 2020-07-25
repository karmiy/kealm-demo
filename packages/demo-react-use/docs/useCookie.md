## useCookie

管理 cookie

### 结构

```ts
function useCookie(cookieName: string): [string | null, (newValue: string, options?: Cookies.CookieAttributes) => void, () => void];
```
### 参数与返回值

- Params:

    - cookieName: cookie 名词

- Return:

    - value: cookie 值

    - updateCookie: 更新 cookie 的函数

    - deleteCookie: 删除 cookie 的函数

### 作用

- 管理 cookie 值

### 何时使用

- 希望对相应的 cookie 进行获取、修改和删除

### 应用场景

- cookie 操作相关

### 源码细节

[useCookie 源码地址](https://github.com/streamich/react-use/blob/master/src/useCookie.ts)

- 使用 [js-cookie](https://www.npmjs.com/package/js-cookie) 为核心管理 cookie

### 示例

```tsx
function App() {
    const [value, updateCookie, deleteCookie] = useCookie('language');

    return (
        <div className='app'>
            <p>Value: {value}</p>
            <button onClick={() => updateCookie('en')}>Update Cookie</button>
            <br />
            <button onClick={deleteCookie}>Delete Cookie</button>
        </div>
    )
}
```
