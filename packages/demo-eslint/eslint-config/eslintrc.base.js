module.exports = {
    /** 环境 */
    env: {
        browser: true,
        es6: true, // ES6 环境
        node: true,
    },

    /** 解析器配置 */
    parserOptions: {
        ecmaVersion: 2020, // ES 版本
        sourceType: 'module', // ES 模块
    },

    /** 定义全局变量 */
    globals: {
        // '$': 'readonly',
        'd3': 'readonly',
    },

    /* settings: {
        'import/resolver': {
            webpack: {
                config: '../build/webpack.base.conf.js', // 需 eslint-import-resolver-webpack
            },
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules'],
            },
        },
    }, */

    /** 重写 */
    /* overrides: [
        // 重写一组文件中规则
        {
            files: ['*-test.js', '*.spec.js', '.eslintrc.js'],
            rules: {
                'no-unused-expressions': 2,
                'quotes': 0,
            },
        }
    ], */

    /** 该层级的文件不再使用该层父级以上的 eslintrc 配置 */
    // root: true,
};
