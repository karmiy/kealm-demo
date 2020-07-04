module.exports = {
    extends: ['../../eslint-config/eslintrc.javascript.js', '../../eslint-config/eslintrc.vue.js'].map(require.resolve),

    /** 该层级的文件不再使用该层父级以上的 eslintrc 配置 */
    root: true,
};
