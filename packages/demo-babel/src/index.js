// import '@babel/polyfill';
// 箭头函数，语法类 @babel/preset-env 转换
/* const fn = () => {
    console.log(123);
};
fn(); */

// 新的内置函数，构造方法，polyfill 为其加垫片
// @babel/plugin-transform-runtime 沙盒环境
const isInner = [1, 2, 3].includes(2);

const p = new Promise(resolve => {
    resolve(100);
});

console.log(isInner, p);

// @babel/plugin-transform-runtime 提供辅助函数，减少代码体积
/* class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getX() {
        return this.x;
    }
} */

