/* import './index.css';

const a = 100;

console.log(a, process.env); */

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