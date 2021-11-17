module.exports = {
    env: {
        browser: true,
        es6: true, // ES6 环境
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2020, // ES 版本
        sourceType: 'module', // ES 模块
        parser: '@typescript-eslint/parser',
    },
    // parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/recommended',
        '@vue/prettier',
    ],
    plugins: ['@typescript-eslint', 'vue', 'simple-import-sort'],
    rules: {
        indent: [2, 4], // 4 格缩进
        semi: 2, // 行尾分号
        'no-unused-vars': 1, // 未使用警告即可
        /** prettier */
        'prettier/prettier': 2,
        /** ts */
        '@typescript-eslint/explicit-function-return-type': 0, // 不需要函数明确返回值，ts 自动类型推导
        '@typescript-eslint/no-var-requires': 0, // 不需要 import xx = require('')，HMR 需要操作
        '@typescript-eslint/ban-types': 0, // 可以空 {} props
        '@typescript-eslint/no-explicit-any': 0, // 有些场景需要 any
        '@typescript-eslint/class-literal-property-style': 2, // 确保类上文字以一致样式公开，如 public get myField() { return 10 }，这样没有特定意义，应改为 public readonly myField = 1;
        '@typescript-eslint/consistent-type-assertions': 2, // 强制类型断言一致使用，如 const x = { ... } as T; 应改为 const x: T = { ... };
        '@typescript-eslint/consistent-type-definitions': [2, 'interface'], // 使用接口定义对象类型，如 type T = { id: number }; 应改为 interface T { id: number };
        '@typescript-eslint/explicit-member-accessibility': 2, // 要求类属性方法有访问修饰符，如 id = 10; 应改为 public id = 10;
        '@typescript-eslint/explicit-module-boundary-types': 0, // 配置 export 导出的函数和类方法可以不反悔类型，可以利用类型推导
        '@typescript-eslint/lines-between-class-members': 2, // 要求类成员间由空行间隙，除了重载方法
        '@typescript-eslint/member-delimiter-style': 2, // 要求对象类型用 ; 间隔，如 interface Foo { id: number; name: string }
        '@typescript-eslint/no-inferrable-types': 0, // 配置可以为 number、string、 boolean 配置类型如 const a: number = 1;
        '@typescript-eslint/no-non-null-assertion': 0, // 配置可以使用赋值断言，如 foo!.bar.toFixed(2);
        '@typescript-eslint/prefer-optional-chain': 2, // 使用可选链 foo?.a?.b?.c 替换 foo && foo.a && foo.a.b && foo.a.b.c;
        '@typescript-eslint/prefer-ts-expect-error': 2, // 使用 @ts-expect-error over 替代 @ts-ignore
        // '@typescript-eslint/indent': [2, 4], // 与 eslint indent 对应
        '@typescript-eslint/type-annotation-spacing': 2, // 要求类型间隔一致，如 const a:number = 1; 应改为 const a: number = 1; type Geo = (name: string)=>string; 应改为 type Geo = (name: string) => string;
        /** Vue */
        'vue/html-indent': [2, 4], // Vue 缩进 4 格
        'vue/script-indent': [2, 4], // Vue 缩进 4 格
        // 'vue/html-quotes': [2, 'single'], // Vue 模板内属性单引号
        'vue/max-attributes-per-line': [0, { singleline: 3, multiline: { max: 1 } }], // （去除，和 prettier 冲突）强制每行最大属性数，此处配置一行最多三个属性，多行每行只能有一个属性
        'vue/no-multiple-template-root': 0, // vue3 不一定只有一个根元素
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
