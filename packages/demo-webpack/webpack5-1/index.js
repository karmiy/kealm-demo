// import './index.css';

/* -------------------- wasm -------------------- */
/* import { sum } from './program.wasm';
console.log(sum(10, 20)); */

/* -------------------- nodejs polyfill -------------------- */
/* const a = 100;

console.log(a, process.env); */

/* -------------------- assets -------------------- */
/* const img = document.createElement('img');
img.src = require('./assets/images/add-circle.png');
document.body.append(img); */

/* -------------------- web worker -------------------- */
// import.meta.url 是 index.js 这个文件的地址
// 此处打印 file:///F:/github/kealm-demo/packages/demo-webpack/webpack5-1/index.js
/* console.log('import.meta.url', import.meta.url);
const worker = new Worker(new URL('./calc.worker.js', import.meta.url), {
    name: 'calc',
    // webpackEntryOptions: { filename: 'workers/[name].js' }
});
worker.onmessage = e => {
  console.log('onmessage', e.data.value);
}; */

/* -------------------- prepack -------------------- */
/* const hello = () => 'hello';
const world = () => 'world';

const a = hello() + ' ' + 'world';
console.log(a); */

/* -------------------- tree shaking -------------------- */
// nest
/* import * as module from './src/module';

console.log(module.inner.a); */

// commonjs
/* import { c } from './src/cjs';

console.log(c); */

// commonjs + node_modules
/* import { t1 } from 'aaa';
console.log(t1); */

/* const c = require('./src/cjs').c;
console.log(c); */

/* -------------------- library bundle -------------------- */
/* import { t1 } from 'aaa';
const main = 12345;

console.log(main, t1); */
