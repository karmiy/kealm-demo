// 全文件规则
/* eslint eqeqeq: 2 */

// 全文件禁用规则
/* /eslint-disable no-console, quotes */
import $ from 'jquery';
import add from './utils';

add();

const a = 1;

function* huj() {
    yield 1;
}

const obj = {
    id: 1,
    get name() {
        return 'karmiy';
    },
    vvv() {
        console.log(1);
    },
    categoryId: 'kkk',
    itemName: `kkk${13}`,
    * x() {
        console.log(1);
        yield* huj();
    },
};

const obnj = { id: 1, name: 2 };

console.log(a + 1, obnj);

async function fn() {
    const v = await 1;
    console.log(obj.id, v);
    if (obj.id === 'b') return 2;
    console.log(obj.id === 'A');
    const self = this;

    // 取消该行规则
    /* eslint-disable-next-line */
    var _that = this;

    const _self = this; // eslint-disable-line consistent-this, no-unused-vars

    document.body.onclick = function() {
        console.log(self);
    };
    return 1;
}
fn();
$.ajax();

const idStatus = !!obj.id;

if (idStatus) {
    try {
        console.log(1);
    } catch (error) {
    /** 123 */
    }
}

const promise = new Promise(() => { });

promise.then(() => { })
    .then(() => { })
    .then(() => { })
    .then(() => { })
    .then(() => { })
    .then(() => { });

d3.select('body').selectAll('p')
    .data([1, 2, 3]);

/**
 * 312
 * @param {number} a
 * @param {string} b
 * @param {boolean} c
 * @param {Symbol} d
 * @param {Bigint} e
 */
function thing(a, b, c, d, e) {
    console.log(1);
    console.log(a, b, c, d, e);
    switch (obj.id) {
        case 1:
            console.log(1);
            break;
        default:
            console.log(1);
            break;
    }
}

thing();
console.log(/^[👍]$/u);

if (!('id' in obj)) console.log(1);

if (obj.id === 1) console.log(1);

Object.keys(obj).forEach(key => {
    if (obj.id) {
        console.log(key);
    }
});

const { name: _name } = obj;
console.log(_name);

const add1 = function(a) {
    try {
        console.log(1);
    } catch (error) {
        console.log(1);
        throw error;
    }
    return a + 1 + 20;
};
// 123
add1();

let i;
i = 3;
console.log(i);

if (obj.id === 5) {
    const ii = 0;
    console.log(ii);
}

const arr = [1, { id: 1 }];
const k = 10;
arr.forEach(item => {
    console.log(item, k);
});

const arr2 = [1, 2, 3];
console.log(arr2, [10, 11, 12, ...arr2]);

const key = 'key';
const recordName = { [key]: 123 };
console.log(recordName);

const foo = () => thing();
if (foo) {
    i = 0;
}
foo();

/** 123 */
if (obj.id === 1) {
    console.log(11);
} else if (obj.id === 2) {
    console.log(1);
} else {
    console.log(1);
}

class User {
    bar() {
        console.log(1, this);
    }

    foo() {
        console.log(11, this);
    }
}

class IUser extends User {
    constructor() {
        super();
        console.log(this.id);
    }
}

console.log(new User(), new IUser());

function Person() {
    this.name = 'k';
}
console.log(new Person());

const vz = obj.id ? 4 : 2;
console.log(vz);

new Array(10).fill('')
    .map(item => item);

document.body.onclick = function() {
    console.log(111);
};

const fcv = async () => {
    await 1;
    console.log(123);
};
fcv();

delete (obj.id);

function* saga() {

}
saga();

Symbol('k5');


const Yu = {
    id: 1,
    Hash() {

    },
};

Yu.Hash();
