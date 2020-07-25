module.exports = {
    extends: ['plugin:react/recommended'],

    parser: 'babel-eslint',

    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },

    plugins: ['react'],

    rules: {
        /* https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/ */
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.tsx'] }],
        'react/prop-types': [2, { 'ignore': ['children'] }],
        'react/display-name': 0,
        'react/no-find-dom-node': 0,
    },

    settings: {
        react: {
            version: 'detect',
        },
    },
};