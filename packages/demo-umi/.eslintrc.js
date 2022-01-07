module.exports = {
    root: true,
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        '@react-native-community',
        'prettier', // 放后面的优先级高
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['react-hooks', '@typescript-eslint', 'simple-import-sort'],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'jsx-quotes': ['error', 'prefer-single'],
        'no-undef': [0], // types 里不一定需要引入 React 就可以作为类型
        '@typescript-eslint/no-var-requires': [0],
        curly: [2, 'multi-line'],
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/explicit-module-boundary-types': [0], // 函数不一定要自己写返回类型，又 TS 自动推导
        '@typescript-eslint/no-explicit-any': [0], // 有时需要用到 any，如函数 isFunction 的参数
        '@typescript-eslint/ban-types': [0], // 可以使用内置类型，如 isFunction 函数需要返回 is Function
        'react/react-in-jsx-scope': [0],
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    [
                        // Node.js builtins
                        '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
                        // Packages. `react` related packages come first.
                        '^react',
                        '^@?\\w',
                        '^(@kealm)(/.*|$)',
                        // Side effect imports.
                        // For example: import '@shared/normalize'
                        '^\\u0000',
                        // Internal packages.
                        '^(@shared)(/.*|$)',
                        '^(@components)(/.*|$)',
                        '^(@hooks)(/.*|$)',
                        '^(@views)(/.*|$)',
                        '^(@store)(/.*|$)',
                        '^(@router)(/.*|$)',
                        '^(@assets)(/.*|$)',
                        '^(@api)(/.*|$)',
                        '^(@)(/.*|$)',
                        // Parent imports. Put `..` last.
                        '^\\.\\.(?!/?$)',
                        '^\\.\\./?$',
                        // Other relative imports. Put same-folder imports and `.` last.
                        '^\\./(?=.*/)(?!/?$)',
                        '^\\.(?!/?$)',
                        '^\\./?$',
                        // Style imports.
                        '^.+\\.s?css$',
                    ],
                ],
            },
        ],
    },
};
