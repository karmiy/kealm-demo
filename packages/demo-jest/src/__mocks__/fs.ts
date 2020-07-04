import path = require('path');

export interface IFiles {
    [dir: string]: string;
}

export interface IMockFiles {
    [dir: string]: Array<string>;
}

interface IFs {
    __setMockFiles(files: IFiles): IMockFiles;
    readdirSync(path: string): Array<string>;
}

// .genMockFromModule 是 mock 一份原模块
// 即获得的 fs 也拥有 readdirSync, readdir 等等方法
// 只是都是 mock 函数，不是真实的，可以再调用 mock functions 的 API 如 fs.readdir.mockReturnValueOnce(10) 来做其他操作
// 不可以在这 import fs from 'fs'; 因为 jest.mock('fs') 后 import fs from 'fs' 就会去找 __mocks__/fs.ts 了，这里又 import 的话会无限循环
const fs: IFs = jest.genMockFromModule('fs');

let mockFiles: IMockFiles = Object.create(null);

function __setMockFiles(newMockFiles: IFiles) {
    mockFiles = Object.create(null);
    for (const file in newMockFiles) {
        const dir = path.dirname(file);

        if (!mockFiles[dir]) {
            mockFiles[dir] = [];
        }
        mockFiles[dir].push(path.basename(file));
    }

    return mockFiles;
}

// 重置 fs 的 readdirSync 方法
function readdirSync(directoryPath: string) {
    return mockFiles[directoryPath] || [];
}

fs.__setMockFiles = __setMockFiles;
(fs as any).readdirSync = readdirSync;

export default fs;