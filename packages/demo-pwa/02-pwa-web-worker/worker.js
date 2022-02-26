// web worker 是独立线程，适合做大运算
// 不能操作 DOM BOM
let total = 0;
for (let i = 0; i < 100000000; i++) {
    total += i;
}

self.postMessage({ total });