/* my-library version 1.0.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var version = "1.0.0";

var foo = function foo(id) {
  console.log(id);
};
var p = new Promise(function (r) {
  return r(10);
});
p.then(function () {
  console.log('100');
});
console.log(version);
console.log(foo(100));
/* import { a } from './a';
import { b } from './b';
import { debounce } from 'lodash-es';

console.log(a);
console.log(b);
console.log(debounce(() => console.log('debounce'))); */

exports.foo = foo;
/* follow me on Twitter! @rich_harris */
