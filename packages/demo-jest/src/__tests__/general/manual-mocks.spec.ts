import manualMockFn from '@utils/manual-mock-fn';
// import fs = require('fs'); // ✔
// const fs = require('fs'); // ✔，这 2 种引入方式，需要 fs.default 才是 fs 对象本身，而 import fs from 'fs' 可以直接拿到 fs 本身
import fs from 'fs';

/* 手动 mock 模块 */

/**
 * 流程：当我们 jest.mock('xxx') 时，会先去找对应 __mocks__/xxx，找到则直接用此文件作为我们 import xxx 是值，找不到则 mock 原模块，在函数上添加 API
 * mock function 即上面找不到 __mocks__ 的情况，会 mock 一份原模块(模块所有函数，包括如果自身也是函数都会变成 mock 函数)，然后在所有 mock 函数上添加如 mockReturnValue 的 API
 * manual mock 会去 mock 的文件处查找 __mocks__ 文件夹，找到里面的同名文件进行替换，使我们执行的是 __mock_/xxx 而非原本的 xxx
 * __mocks__ 文件夹需要建立在要被 mock 的文件旁，如 utils/foo.ts，需要放置 utils/__mocks__/foo.ts
 * 如果是 node_modules 的库，需要把 __mocks__ 放在根目录下即 node_modules 旁，条件 jest.config.js 是没有配置 rootDir 影响到根路径
 * 如果 jest.config.js 配置了 rootDir，如指向 src，则 node_modules 的库对应 __mocks__ 要放在 src 下
 * 从流程可知 manual mock 比 mock function 优先级高，存在 __mocks__ 会去使用下面的对应文件
 */
jest.mock('@utils/manual-mock-fn');
jest.mock('fs');

import summarizeFilesInDirectorySync from '@utils/file-summarizer';

describe('manual mocks', () => {
    /* 测试手动 mock 自定义函数 */
    it('test manual mock fn', () => {
        expect(manualMockFn()).toBe('This fn will be called');

        // 恢复加载原模块
        const actualFn = jest.requireActual('@utils/manual-mock-fn');
        expect(actualFn.default()).toBe('This fn will not be called');
    });

    /* 测试手动 mock node_modules 的库 */
    it('test manual mock module', () => {
        const MOCK_FILE_INFO = {
            '/path/to/file1.js': 'console.log("file1 contents");',
            '/path/to/file2.txt': 'file2 contents',
        };
        // console.log((fs as any).readFileSync.mockReturnValueOnce, (fs as any).__setMockFiles);

        fs.__setMockFiles(MOCK_FILE_INFO); // { '/path/to': [ 'file1.js', 'file2.txt' }

        const fileSummary = summarizeFilesInDirectorySync('/path/to'); // [{ directory: '/path/to', fileName: 'file1.js' }, { directory: '/path/to', fileName: 'file2.txt' }]

        expect(fileSummary.length).toBe(2);
    });

    /* 测试未实现的方法 */
    // window.matchMedia 在测试中调用是 undefined，需要先利用 mock function 定义，防止使用时报错
    it('test mocking methods which are not implemented in JSDOM', () => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // deprecated
                removeListener: jest.fn(), // deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });

        expect(window.matchMedia('k').media).toBe('k');
    });
});