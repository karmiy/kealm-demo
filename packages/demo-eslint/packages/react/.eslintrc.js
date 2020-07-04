module.exports = {
    extends: ['../../eslint-config/eslintrc.react.js', '../../eslint-config/eslintrc.javascript.js'].map(require.resolve),
    // extends: ['../../eslint-config/eslintrc.react.js'],

    // rules: { 'react/jsx-indent': [2, 4] },

    /** 该层级的文件不再使用该层父级以上的 eslintrc 配置 */
    root: true,
};
