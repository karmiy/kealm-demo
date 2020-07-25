module.exports = {
    env: {
        browser: true,
        es6: true, // ES6 环境
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
    },
    extends: ['./eslint-config/eslintrc.typescript-react.js'].map(require.resolve),
};
