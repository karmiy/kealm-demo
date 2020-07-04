module.exports = {
    // extends: ['./eslintrc.base.js', 'plugin:react/recommended'],
    extends: ['./eslintrc.base.js', 'airbnb', 'plugin:react-hooks/recommended'],

    parser: 'babel-eslint',

    /** 解析器配置 */
    parserOptions: {
        ecmaFeatures: { // 额外语言特性
            jsx: true,
        },
    },

    plugins: ['react', 'react-hooks'],

    /** 规则 */
    rules: {
        /** React */
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.tsx'] }],
        'react/prop-types': [2, { 'ignore': ['children'] }],

        /** React Hooks */
        // https://github.com/facebook/react/blob/c11015ff4f610ac2924d1fc6d569a17657a404fd/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js
        'react-hooks/rules-of-hooks': 'error',
        // Verify the list of the dependencies for Hooks like useEffect and similar
        // https://github.com/facebook/react/blob/1204c789776cb01fbaf3e9f032e7e2ba85a44137/packages/eslint-plugin-react-hooks/src/ExhaustiveDeps.js
        'react-hooks/exhaustive-deps': 'error',
    },
};
