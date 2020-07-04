const path = require('path');

/**
 * 当启动 npm run test:w 时会执行这个 watch-plugin
 */
class MyWatchPlugin {
    runnerTest = ['base', 'using-webpack'];

    /* hooks */
    apply(jestHooks) {
        /* 每个要被执行的 test 都会执行这个回调，返回该 test 是否被执行 */
        jestHooks.shouldRunTestSuite(testSuiteInfo => {
            const testPath = testSuiteInfo.testPath; // 全路径, C://xxx/xxx/xxx/xxx.spec.ts
            const extName = path.extname(testPath); // 拓展名，.ts
            const fileName = path.basename(testPath, '.spec' + extName);
            // console.log(fileName, this.runnerTest.includes(fileName));
            return this.runnerTest.includes(fileName); // 只 run 指定的 spec.ts 测试文件
            // return Promise.resolve(this.runnerTest.includes(fileName)); // 也可以返回 promise
        });

        /* test 执行后触发 */
        jestHooks.onTestRunComplete(results => {
            console.log('complete...');
        });

        /* 文件改变时触发 */
        jestHooks.onFileChange(({ projects }) => {
            console.log('change...');
        });
    }

    /* hooks */
    getUsageInfo(globalConfig) {
        // 添加一个 Watch usage，在 watch 时会出现 Press s to do something.
        return {
            key: 's',
            prompt: 'do something',
        };
    }

    /* hooks */
    run(globalConfig, updateConfigAndRun) {
        // 用于 getUsageInfo
        console.log('run...');
        return Promise.resolve(true);
    }
}

module.exports = MyWatchPlugin;