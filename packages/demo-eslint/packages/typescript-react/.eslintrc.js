module.exports = {
    extends: [
        '../../eslint-config/eslintrc.typescript-react.js',
        '../../eslint-config/eslintrc.javascript.js'
    ].map(require.resolve),

    /** 该层级的文件不再使用该层父级以上的 eslintrc 配置 */
    root: true,
};
