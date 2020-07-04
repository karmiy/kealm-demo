const a: number = 1;
type Geo = (name: string) => string;

export function add(x: number, y: number) {
    return x + y;
}

type Wrap = number | string;

interface User {
    id: number;
    name: string;
}

const b: Wrap = 1;

const u: User = {
    id: 1,
    name: '123',
};

console.log(a, b, u);

export function test(a: boolean) {
    if (a) console.log(2);
    console.log(1);
}

export function foo(s: string): void;
export function foo(n: number): void;
export function foo(s: string | number) {
    console.log(s);
}

async function f() {
    await 1;
}

f();

const foo2: { bar?: number } = {};
foo2.bar!.toFixed(2);

interface Foos {
    id: number;
    fn?: {
        name: string;
    };
}

const foos: Foos = { id: 123 };

foos.id = 2;
console.log(foos.fn?.name);

declare const some: boolean;

if (some) {
    console.log(1);
}

async function returnsPromise() {
    await 1;
    return 'value';
}

const arr: Array<number> = [1, 2, 3, 4];

Object.keys(arr).forEach(key => {
    console.log(key);
});

returnsPromise().then(() => {
    console.log(1);
});

const obj: { id: number } = { id: 1 };
const str = 'foo';
const str2 = `15${10}`;


console.log(obj, str, foo2, str2);

class Mx {
    public readonly myField11 = 1;

    private get myField1() {
        return `hello world${this.myField2}`;
    }

    // not a literal
    public readonly myField2 = [1, 2, 3];

    private readonly ['myField3'] = 'hello world';

    public get myField4() {
        console.log(this);
        return `hello from ${window.location.href}`;
    }

    public bar1(a: string): void;
    public bar1(a: number): void;
    public bar1(a: string | number) {
        console.log(a, this);
    }
}

const mx = new Mx();
console.log(mx.myField4);


/* type Day =
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday'; */

enum Day {
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
}

declare const day: Day;

switch (day) {
    case Day.Monday:
    case Day.Thursday:
        console.log(1);
        break;

    default:
        break;
}
