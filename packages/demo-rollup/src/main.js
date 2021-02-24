const foo = (id) =>  {
    console.log(id);
}

import { version } from '../package.json';

const p = new Promise(r => r(10));
p.then(() => {
    console.log('100');
});

console.log(version);
console.log(foo(100));

export {
    foo,
}
/* import { a } from './a';
import { b } from './b';
import { debounce } from 'lodash-es';

console.log(a);
console.log(b);
console.log(debounce(() => console.log('debounce'))); */