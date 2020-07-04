module.exports = {
    parser: '@typescript-eslint/parser',

    /** 解析器配置 */
    /* parserOptions: {
        // https://stackoverflow.com/questions/61956555/why-is-typescript-eslint-parser-including-files-outside-of-those-configured-in

        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    }, */

    extends: ['./eslintrc.base.js', 'plugin:@typescript-eslint/recommended'],

    plugins: ['@typescript-eslint'],

    /** 规则 */
    rules: {
        /** eslint */
        'lines-between-class-members': 0, // 不要求类成员之间出现空行，此处配置 0，由 typescript 的 @typescript-eslint/lines-between-class-members 控制
        'no-dupe-class-members': 0, // 允许类成员重复名称，typescript 中会有重载这种操作

        /** typescript */
        /* rules: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
           plugin: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin */
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
        '@typescript-eslint/indent': [2, 4], // 与 eslint indent 对应
        '@typescript-eslint/type-annotation-spacing': 2, // 要求类型间隔一致，如 const a:number = 1; 应改为 const a: number = 1; type Geo = (name: string)=>string; 应改为 type Geo = (name: string) => string;
        /* '@typescript-eslint/no-unnecessary-boolean-literal-compare': 2, // 对 boolean 禁止不必要的比较，如 declare const a: boolean; if(a === true) 应改为 if(a)
           '@typescript-eslint/no-unnecessary-condition': 2, // 防止类型总是 true 或 false 的条件判断，如 if(true)
           '@typescript-eslint/prefer-nullish-coalescing': 2, // 使用 foo ?? 's' 替换 foo !== null && foo !== undefined ? foo : 's';
           '@typescript-eslint/switch-exhaustiveness-check': 2, // 要求 switch 包含所有 type 类型
        */
    },
};
