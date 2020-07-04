module.exports = {
    parserOptions: { parser: 'babel-eslint' },

    extends: ['./eslintrc.base.js', 'plugin:vue/recommended'],

    plugins: ['vue'],

    /** 规则 */
    rules: {
        /** Vue */
        'vue/html-indent': [2, 4], // Vue 缩进 4 格
        'vue/html-quotes': [2, 'single'], // Vue 模板内属性单引号
        'vue/max-attributes-per-line': [2, { 'singleline': 3, 'multiline': { 'max': 1 } }], // 强制每行最大属性数，此处配置一行最多三个属性，多行每行只能有一个属性
    },
};
