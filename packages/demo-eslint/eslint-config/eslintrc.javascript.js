module.exports = {
    extends: ['./eslintrc.base.js', 'airbnb-base'],

    /** 规则 */
    rules: {
        /** Possible Errors */
        'for-direction': 2, // ---- RECOMMENDED ---- 禁止 for(let i = 0; i < 10, i--) 这种计数器方向错误
        'getter-return': 2, // ---- RECOMMENDED ---- Getter 函数需要 return
        'no-async-promise-executor': 2, // ---- RECOMMENDED ---- 禁止 new Promise(async () => {})
        'no-compare-neg-zero': 2, // ---- RECOMMENDED ---- 禁止 if(x === -0) 判断 -0，改用 Object(x, -0)
        'no-cond-assign': [2, 'except-parens'], // ---- RECOMMENDED ---- 禁止 if、for、while 和 do...while 出现赋值运算符，如 if(x = 1)，除非被括起来，如 if((x = 1))
        'no-constant-condition': 2, // ---- RECOMMENDED ---- 禁止条件中用常量表达式，如 if(true)、true ? 1 : 2
        'no-control-regex': 2, // ---- RECOMMENDED ---- 禁止正则中使用控制字符
        'no-dupe-args': 2, // ---- RECOMMENDED ---- 禁止 function(a, b, a) 参数重名
        'no-dupe-keys': 2, // ---- RECOMMENDED ---- 禁止 const obj = { id: 1, id: 2 } 键重名
        'no-duplicate-case': 2, // ---- RECOMMENDED ---- 禁止 switch 中重复的 case
        'no-empty': 2, // ---- RECOMMENDED ---- 禁止 try、catch、finally、if、while、switch 里空语句块，如 if() {}，可只含注释 if() {/** 1 */}
        'no-empty-character-class': 2, // ---- RECOMMENDED ---- 禁止正则里出现空字符集，如 /^abc[]/
        'no-ex-assign': 2, // ---- RECOMMENDED ---- 禁止对 catch 参数赋值
        'no-extra-boolean-cast': 2, // ---- RECOMMENDED ---- 禁止不必要的 bool 转换，如 const flag = !!x 已转换，又多余的 !!flag
        'no-extra-semi': 2, // ---- RECOMMENDED ---- 禁止不必要的分号，如 const x = 1;; function fn() {};
        'no-func-assign': 2, // ---- RECOMMENDED ---- 禁止 function 声明重复赋值
        'no-inner-declarations': 2, // ---- RECOMMENDED ---- 禁止嵌套语句块中(if、while、for)出现 function，如 if() { function a() {} }
        'no-invalid-regexp': 2, // ---- RECOMMENDED ---- 禁止 RegExp 构造函数中存在无效的正则表达式字符串
        'no-irregular-whitespace': 2, // ---- RECOMMENDED ---- 禁止不规则的空白
        'no-misleading-character-class': 2, // ---- RECOMMENDED ---- 不允许在字符类语法中出现由多个代码点组成的字符，如 /^[👍]$/，应改为 /^[👍]$/u
        'no-obj-calls': 2, // ---- RECOMMENDED ---- 禁止将全局对象当作函数进行调用，如 const math = Math();
        'no-prototype-builtins': 2, // ---- RECOMMENDED ---- 禁止直接调用 Object.prototypes 的内置属性，如 foo.hasOwnProperty("bar") 应改为 Object.prototype.hasOwnProperty.call(foo, "bar")
        'no-regex-spaces': 2, // ---- RECOMMENDED ---- 禁止正则字面量出现多空格，如 const re = /foo   bar/，应改为 const re = /foo {3}bar/
        'no-sparse-arrays': 2, // ---- RECOMMENDED ---- 禁止稀疏数组，即 , 前无元素，如 const arr = [1, , 3]
        'no-template-curly-in-string': 2, // 禁止常规字符串用模板字符串语法，如 'HHH, ${a}'
        'no-unexpected-multiline': 2, // ---- RECOMMENDED ---- 禁止使用令人困惑的多行表达式，如 let x = function() {} `hello`，应改为 let x = function() {}; `hello`
        'no-unreachable': 2, // ---- RECOMMENDED ---- 禁止在 return、throw、continue 和 break 后出现执行不到的代码，如 return 3; console.log(1);
        'no-unsafe-finally': 2, // ---- RECOMMENDED ---- 禁止 finally 中出现控制流语句，如 try {} catch(err) {} finally { return 3 }
        'no-unsafe-negation': 2, // ---- RECOMMENDED ---- 禁止对关系运算符的左操作数使用 ! 操作符，如 if (!key in object) 应改为 if (!(key in object))
        'require-atomic-updates': 2, // ---- RECOMMENDED ---- 禁止 await、yield 可能导致出现竞态条件的赋值，如 x += await getPageLength()，异步返回前单独更新 x 效果，会在异步返回后丢失
        'use-isnan': 2, // ---- RECOMMENDED ---- 要求调用 Number.isNaN 或全局 isNaN 来判断 NaN
        'valid-typeof': [2, { 'requireStringLiterals': true }], // ---- RECOMMENDED ---- 要求 typeof 与有效的字符串或其他 typeof 表达式进行比较
        /** Best Practices */
        'array-callback-return': 2, // 强制数组方法回调有 return 语句，含：from、prototype.every/filter/find/findIndex/map/reduce/reduceRight/some/sort
        'block-scoped-var': 2, // 把 var 语句看作是在块级作用域范围内，如不能 if(...) { var x = 1 } console.log(x);
        'class-methods-use-this': 2, // 强制 class 类方法使用 this，没有 this 可以改为静态方法
        'complexity': [2, { 'max': 5 }], // 函数内限制圈复杂度，此处配置最多 4 次 if、else if、else if、else
        'consistent-return': 2, // 要求函数要么都有 return 值，要么没有返回值，不能 if 内 return，外面又 return true;
        'curly': [2, 'multi-line'], // if() 后需要大括号 {}，此处配置单语句且单行时大括号可省略
        'default-case': [2, { 'commentPattern': '^skip\\sdefault' }], // 要求 switch 里有 default 分支，此处配置可以注释 skip default 来忽略 default 分支
        'dot-location': [2, 'property'], // 强制在点号之前或之后换行，此处配置 . 与属性在同一行
        'eqeqeq': 2, // 要求使用全等 === 与 !==
        'guard-for-in': 2, // For 循环里需要 if 语句，if(Object.prototype.hasOwnProperty.call(obj, key))
        'no-caller': 2, // 禁用 arguments.caller 和 arguments.callee
        'no-case-declarations': 2, // ---- RECOMMENDED ---- 禁止在 case、default 子句中出现词法声明，如 case 1: let x = 1; break; 应改为 case 1: { let x = 1; break; }
        'no-else-return': 2, // 禁止 if 中 return 语句后有 else 块，因为是多余的
        'no-empty-pattern': 2, // ---- RECOMMENDED ---- 禁止使用空解构模式，如 const { a: {} } = obj; 这样 a 是没意义的
        'no-eq-null': 2, // 禁止用 == 与 != 比较 null，应使用 === 与 !==
        'no-eval': 2, // 禁用 eval，可能受到注入攻击
        'no-extra-bind': 2, // 禁止不必要的 bind，如函数中没有 this 调用，bind 显然是不需要的，除非是用 bind 传参
        'no-fallthrough': 2, // ---- RECOMMENDED ---- 禁止 case 语句落空，即 case 中没有 break 结尾
        'no-global-assign': 2, // ---- RECOMMENDED ---- 禁止对原生对象或只读全局对象赋值，如 window = 2;
        'no-implied-eval': 2, // 禁用隐式 eval，如 setTimeout('alert("Hi!");', 100);
        'no-multi-spaces': 2, // 禁止出现多个空格，如 if(foo  === 'bar')，foo 与 === 之间 2 个空格
        'no-multi-str': 2, // 禁止多行字符串，如 const x = 'line 1 \' line 2'; 应改为 const x = 'line 1\n' + 'line 2';
        'no-new': 2, // 禁止使用 new 不存储，如 new Person(); 应改为 const person = new Person(); 也不能单纯 new Promise，需要后面跟内容如 .then
        'no-new-wrappers': 2, // 禁止对 String，Number 和 Boolean 使用 new 操作符，应使用字面量
        'no-octal': 2, // ---- RECOMMENDED ---- 禁止八进制字面量，ECMAScript 5 已弃用
        'no-param-reassign': 2, // 禁止对函数参数再赋值，可能误导读者，也会改变 arguments 对象，建议纯函数
        'no-redeclare': 2, // ---- RECOMMENDED ---- 禁止重新声明变量
        'no-self-assign': 2, // ---- RECOMMENDED ---- 禁止自身赋值，如 foo = foo;
        'no-self-compare': 2, // 禁止自身比较
        'no-unused-expressions': 2, // 禁止出现未使用过的表达式，如 obj.id，这个语句什么都没做
        'no-useless-call': 2, // 禁止不必要的 call、apply
        'no-useless-catch': 2, // ---- RECOMMENDED ---- 禁止不必要的 catch 语句，如只抛出原始错误的 catch(e) { throw e; } 是冗余里，应改为 { doSomething(); throw e }
        'no-useless-concat': 2, // 禁止不必要的字符拼接，如 'a' + 'b'，应改为 'ab'，这个拼接过程是不必要的
        'no-useless-escape': 2, // ---- RECOMMENDED ---- 禁用不必要的转义，如 "\'" 是没意义的，直接 "'" 即可
        'no-useless-return': 2, // 禁止多余的 return 语句，如 function foo() { return; }
        'no-with': 2, // ---- RECOMMENDED ---- 禁用 with 语句
        'require-await': 2, // 禁止使用不带 await 表达式的 async 函数
        'yoda': 2, // 禁止Yoda条件，如 if('red' === color)，应改为 if(color === 'red')
        /** Variables */
        'no-delete-var': 0, // ---- RECOMMENDED ---- 禁止 delete 语句，此处配置 delete 可用不报错，不适用推荐配置
        'no-shadow': 0, // 禁止变量声明与外层作用域的变量同名，此处配置可同名
        'no-shadow-restricted-names': 2, // ---- RECOMMENDED ---- 禁止将标识符定义为受限名字，如 const undefined = 'foo';
        'no-undef': 2, // ---- RECOMMENDED ---- 禁用未定义变量，如 const a = 1; b = 10; 此处 b 未声明，需在 global 配置
        'no-undef-init': 2, // 禁止初始化未 undefined，如 let a = undefined; 应改为 let a = undefined
        'no-undefined': 2, // 禁止使用 undefined 变量，如 const undefined = "hi";
        'no-unused-vars': 2, // ---- RECOMMENDED ---- 禁止定义变量未使用
        /** Stylistic Issues */
        'array-bracket-newline': [2, { 'multiline': true }], // 配置数组元素内或元素间有换行，则要求开闭括号 [] 换行
        'array-bracket-spacing': [2, 'never'], // 禁止数组括号前后空格，如 [ 1, 2 ] 应改为 [1, 2]
        'block-spacing': [2, 'always'], // 强制代码块中括号前后有空格，如 if (foo) {i = 0;} 应改为 if (foo) { i = 0; }
        'brace-style': [2, '1tbs'], // 大括号风格，需要是 if() { \n}不能是 if() \n{}
        'camelcase': 2, // 要求驼峰命名，如 myFavoriteColor、_myFavoriteColor、myFavoriteColor_、MY_FAVORITE_COLOR
        'comma-dangle': [2, { 'objects': 'always-multiline', 'imports': 'always-multiline', 'exports': 'always-multiline' }], // 要求对象最后一个元素与 } 不同行时使用拖尾逗号，在同行时禁止拖尾逗号
        'comma-spacing': [2, { 'before': false, 'after': true }], // 禁止逗号前空格，要求逗号后空格，如 const a = 1 ,b = 2; 应改为 const a = 1, b = 2;
        'comma-style': [2, 'last'], // 要求逗号放在数组元素、对象属性或变量声明之后，且在同一行，如 const a = 1\n,b = 2; 应改为 const a = 1,\nb=2;
        'computed-property-spacing': 2, // 禁止在计算属性中使用空格，如 obj[ 'id' ]、const recordName = { [ key ]: 123 }; 应改为 obj['id']、const recordName = { [key]: 123 };
        'consistent-this': [2, 'self'], // This 别名用 self
        'func-call-spacing': 2, // 禁止函数操作符与其调用间有空格，如 fn (1); 应改为 fn(1);
        'function-paren-newline': [2, 'multiline'], // 如果函数任一参数有换行，则要求函数括号内换行，否则禁止换行，如 function fn(a, \nb, c)，应改为 function fn(a, b, c)
        'implicit-arrow-linebreak': [2, 'beside'], // 禁止在箭头函数体之前出现换行，如 const fn = () => \n10; 应改为 const fn = () => 10;
        'indent': [2, 4, { 'SwitchCase': 1 }], // 强制 4 个空格缩进
        'jsx-quotes': [2, 'prefer-single'], // JSX 属性用单引号
        'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }], // 要求对象字面量键值之间使用一致空格，此处配置 : 前无后有，如 { id :1 } 应改为 { id: 1 }
        'keyword-spacing': [2, { 'before': true, 'after': true }], // 强制关键字周围空格一致性，如 if(x === 1) 应改为 if (x === 1)
        'lines-around-comment': [2, { 'beforeBlockComment': true, 'allowBlockStart': true, 'allowObjectStart': true, 'allowArrayStart': true, 'allowClassStart': true }], // 配置块级注释 /** */ 之前有空行，允许在块语句、对象字面量、数组、类的开始位置
        'lines-between-class-members': [2, 'always'], // 要求类成员之间出现空行
        'max-depth': [2, { 'max': 4 }], // 强制块语句最大可嵌套深度
        'max-nested-callbacks': [2, { 'max': 5 }], // 强制回调函数最大可嵌套深度
        'max-params': [2, { 'max': 5 }], // 限制函数参数最大个数
        'multiline-comment-style': [2, 'bare-block'], // 多行注释使用 /*  */
        'multiline-ternary': [2, 'always-multiline'], // 三目运算中，如果表达式跨越多行，则操作数之间强制换行。即 ? 后换行了，: 前后也要换行
        'new-cap': [2, { 'properties': false }], // 要求构造函数首字母大写，class 与 function，此处配置不包括对象属性，如 const o = { Hash() {} }; o.Hash 可以正常运行不检测 Hash 大小写开头
        'new-parens': 2, // 调用无参构造函数时带括号，如 new Person; 应改为 new Person();
        'newline-per-chained-call': [2, { 'ignoreChainWithDepth': 2 }], // 要求方法链中每个调用都有换行符，如 d3.select('body')\n.selectAll('p')\n.data([1, 2, 3]);
        'no-array-constructor': 2, // 禁用 Array 构造函数，只能 Array(10)、new Array(10)
        'no-lonely-if': 2, // 禁止 if 语句作为唯一语句出现在 else 块中，如 if() { ... } else { if() { ... } }
        'no-mixed-spaces-and-tabs': 2, // ---- RECOMMENDED ---- 禁止空格和 tab 混合缩进
        'no-multiple-empty-lines': [2, { 'max': 2 }], // 禁止多个空行，最多 2 空行
        'no-nested-ternary': 2, // 禁止嵌套的三目运算，会使代码难以理解
        'no-new-object': 2, // 禁用 Object 构造函数，如 const o = new Object(); 应该为 const o = {};
        'no-trailing-spaces': 2, // 禁止行尾空白，如 const a = 1;\s应改为 const a = 1;
        'no-unneeded-ternary': 2, // 禁止可表达为更简单结构的三目运算，如 const flag = id ? true : false; 应改为 const flag = !!id;
        'no-whitespace-before-property': 2, // 禁止属性前有空白，如 obj. id 应改为 obj.id
        'nonblock-statement-body-position': [2, 'beside'], // 强制 if、while、for 等语句，单语句时强制单行，如 if()\n console.log(1); 应改为 if() console.log(1);
        'object-curly-newline': [2, { 'multiline': true }], // 强制对象花括号内使用一致换行符，此处配置属性内或属性间有换行符，则要求有换行符，即要么都不换行 const obj = { id: 1, name: 'k' } 要么都换行 const obj = { \nid: 1,\nname: 'k'\n }
        'object-curly-spacing': [2, 'always'], // 强制对象花括号中使用一致空格，此处配置需要空格，如 const {id, name} = obj; 应改为 const { id, name } = obj;
        'operator-assignment': 2, // 要求尽可能简化赋值操作，如 i = i + 10; 应改为 i += 10;
        'operator-linebreak': [2, 'after'], // 强绘操作符使用一致换行符风格，此处配置操作符后换行，如 const s = a \n+b; 应改为 const s = a +\n b;
        'quote-props': [2, 'consistent'], // 要求对象字面量属性名使用一致引号，此类配置要么属性名都有引号要么都没有，即不能 { id: 1, 'name': 'kk' }
        'quotes': [2, 'single'], // 单引号
        'semi': 2, // 行尾必须使用分号，防止压缩代码意外出错
        'semi-spacing': [2, { 'before': false }], // 强制分号前有空格，如 const a = 1 ; 应改为 const a = 1;
        'semi-style': [2, 'last'], // 强制分号出出现在句子末尾
        'space-before-blocks': [2, 'always'], // 要求语句块之前的空格，不包括 =>、关键字与块之间的空格，如 if(){ ... } 应改为 if() { ... }
        'space-before-function-paren': [2, { 'anonymous': 'never', 'named': 'never', 'asyncArrow': 'always' }], // 强制在 function 左括号前使用一致空格，此处配置去除空格，只有 async () 需要空格
        'space-in-parens': [2, 'never'], // 禁止圆括号内的空格，如 log( 1 ) 应改为 log(1)
        'space-infix-ops': 2, // 要求中缀操作符周围有空格，如 1+2 应改为 1 + 2，const a=1; 应改为 const a = 1;
        'space-unary-ops': 2, // 在一元操作符之前或之后存在空格，默认需要空格的如 typeof、delete、new、void，不能 typeof!obj.id; 不需要加空格如 ++i，不能 ++ i;
        'spaced-comment': 2, // 要求注释前有空白（space 或 tab）
        'switch-colon-spacing': [2, { 'before': false }], // 强制 switch case 冒号左侧无空格
        'template-tag-spacing': 2, // 禁止模板标记和它们的字面量之间有空格，如 const hello = func `Hello world`; 应改为 const hello = func`Hello world`;
        /** ECMAScript 6 */
        'arrow-parens': [2, 'as-needed'], // 要求箭头函数使用圆括号将参数括起，此处配置在单参数时强制不使用括号，如 (a) => 10; 应改为 a => 10;
        'arrow-spacing': [2, { 'before': true, 'after': true }], // 要求箭头函数的箭头前后有空格，如 a=>10 应改为 a => 10
        'constructor-super': 2, // ---- RECOMMENDED ---- 验证构造函数中的 super 调用
        'generator-star-spacing': [2, 'after'], // 强制 generator 函数中 * 号后有空格
        'no-class-assign': 2, // ---- RECOMMENDED ---- 禁止修改类声明的变量，如 class User {} User = 10;
        'no-const-assign': 2, // ---- RECOMMENDED ---- 禁止修改 const 声明的变量，如 const a = 1; a = 2;
        'no-dupe-class-members': 2, // ---- RECOMMENDED ---- 禁止类成员重复名称，如 class User { bar() {} bar() {} }
        'no-duplicate-imports': 2, // 禁止重复导入，如 import { zf } from 'jquery'; import { zb } from 'jquery'; 应改为 import { zf, zb } from 'jquery';
        'no-new-symbol': 2, // ---- RECOMMENDED ---- 禁止 Symbol 与 new 一起使用，new Symbol() 是错误的，Symbol 是函数
        'no-this-before-super': 2, // ---- RECOMMENDED ---- 禁止在 super() 前调用 this 或 super
        'no-useless-computed-key': 2, // 禁止在对象中使用不必要的计算属性，如 { ['v']: 10 } 应改为 { v: 10 }
        'no-useless-constructor': 2, // 禁止不必要的构造函数，如空的 constructor() {} 是没有意义的
        'no-useless-rename': 2, // 禁止 import/export 解构赋值时将引用重命名为相同名字，如 import { create as create } from 'XXX';
        'no-var': 2, // 禁用 var，应使用 let const
        'object-shorthand': 2, // 要求对象字面量简写语法，如 { x: x } 应改为 { x }
        'prefer-const': 2, // 要求声明后不再被修改的变量，使用 const 声明，如 let i = 0; 之后未对 i 进行修改，应该改为 const i = 0;
        'prefer-rest-params': 2, // 要求使用剩余参数 (...args) 代替 arguments
        'require-yield': 2, // ---- RECOMMENDED ---- 要求 generator 函数中有 yield
        'rest-spread-spacing': [2, 'never'], // 强制剩余参数和扩展运算符及其表达式之间无空格，如 ... a 应改为 ...a
        'symbol-description': 2, // 要求 symbol 描述
        'template-curly-spacing': [2, 'never'], // 禁止模板字符串中的空格，如 `${ obj.id }` 应改为 `${obj.id}`
        'yield-star-spacing': [2, { 'before': false, 'after': true }], // 强制在 yield* 表达式中 * 周围使用空格，此处配置格式应为 yield* fn();
        
        /** conflict-javascript-airbnb */
        'eol-last': 0, // 文件结尾不需要多余换行
        'linebreak-style': 0, // 换行符配置不校验
        'max-classes-per-file': 0, // 一个文件配置不一定只能一个 class 类型
        'no-console': 0, // 配置可以使用 console
        'no-underscore-dangle': 0, // 配置可以使用 _ 给变量命名
        'no-empty-function': 0, // 配置可以空函数，可能需要在组件如 onChange 这类 props 默认值是空函数
        'func-names': 0, // 配置函数表达式的 name 非必须

        /** import */
        'import/prefer-default-export': 0, // 文件 export default 配置非必要

        /** miss in recommended */
        // 'no-debugger': 2, // 禁用 debugger
        // 'no-unused-labels': 2, // 禁用未使用过的标签
    },
};
