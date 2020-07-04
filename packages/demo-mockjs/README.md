![logo](../../shared/static/imgs/logo-kealm.png)

## 启动项目

```js
npm run dev
```

根据对 mockjs api 测试需求打开 src/index.ts 相应注释块即可

## MockJs

[官方 GitHub 地址](https://github.com/nuysoft/Mock/wiki)

### 数据模板定义规范

```js
// 属性名|生成规则: 属性值
'name|rule': value
```

### 生成规则

- 'name|min-max': value

- 'name|count': value

- 'name|min-max.dmin-dmax': value

- 'name|min-max.dcount': value

- 'name|count.dmin-dmax': value

- 'name|count.dcount': value

- 'name|+step': value

**生成规则的含义依赖属性值类型：**

- value is string

    - 'name|min-max': string
    ```js
    // 随机生成 1-4 次字符串
    'name|1-4': 'wrap',
    =>
    name: 'wrapwrap...', // 重复 1-4次 wrap
    ```

    - 'name|count': string
    ```js
    // 重复指定次数
    ```

- value is number

    - 'name|+1': number
    ```js
    // 属性值自动 +1，初始值为 value
    'list|2': [{
        'id|+1': 10,
    }],
    =>
    list: [{ id: 10 }, { id: 11 }],
    ```

    - 'name|min-max': number
    ```js
    // 生成 min <= x <= max 整数，value 只用来确认类型
    'id|1-10': 100,
    => 
    id: 6,
    ```

    - 'name|min-max.dmin-dmax': number
    ```js
    // 生成浮点数，整数部分 min <= x <= max，小数部分保留 dmin-dmax 位，value 只用来确认类型
    'id|1-100.1-10': 999,
    => 
    id: 36.849,
    ```

- value is boolean

    - 'name|1': boolean
    ```js
    // 生成布尔值，true false 概率都是 .5
    'pending|1': true,
    => 
    pending: true,
    ```

    - 'name|min-max': boolean
    ```js
    // 生成布尔值，value 概率 min / (min + max)，!value 为 max / (min + max)
    ```

- value is object

    - 'name|count': object
    ```js
    // 从 value 随机取出 count 个属性
    'option|2': {
        key: 1,
        name: 'k',
        code: 'k09123',
        age: 18,
    },
    => 
    option: {
        name: 'k',
        age: 18,
    },
    ```

    - 'name|min-max': object
    ```js
    // 从 value 种随机取出 min - max 个属性
    ```

- value is array

    - 'name|1': array
    ```js
    // 从 value 随机取出 1 个元素
    'group|1': [10, 20, 30],
    => 
    group: 20,
    ```

    - 'name|+1': array
    ```js
    // 从 value 中顺序取出一个元素
    'list|2': [{
        'item|+1': [10, 20, 30],
    }],
    =>
    list: [{ item: 10 }, { item: 20 }]
    ```

    - 'name|min-max': array
    ```js
    // 重复 value 生成新数组，重复次数 min - max 次
    'group|2-4': [10, 20, 30],
    =>
    group: [10, 20, 30, 10, 20, 30, 10, 20, 30],
    ```

    - 'name|count': array
    ```js
    // 重复 value 生成新数据，重复次数 count 次
    ```

- value is function

     - 'name': function
    ```js
    // 函数返回值作为属性值，函数内 this 为所在对象本身
    'option': function() {
        console.log(this);
        return '999';
    },
    => 
    option: '999',
    ```

- value is regexp

    - 'name': regexp
    ```js
    // 根据正则表达式反向生成匹配的字符串
    {
        'regexp1': /[a-z][A-Z][0-9]/,
        'regexp2': /\w\W\s\S\d\D/,
        'regexp3': /\d{5,10}/,
    }
    =>
    {
        "regexp1": "pJ7",
        "regexp2": "F)\fp1G",
        "regexp3": "561659409",
    }
    ```

### Mock.mock()

Mock.mock( rurl?, rtype?, template|function( options ) )

根据数据模板生成模拟数据

mock 方法有如下几种参数：

- rurl：可选，需要拦截的 URL，可以是**字符串**或**正则**（**通常在后端接口尚未完成前，利用 mockjs 返回请求数据**）

- rtype：可选，需要拦截的 Ajax 请求类型，get、post 等,不配置时各种类型皆可拦截

- template：可选，数据模板，可以是对象或字符串

- function(options)：可选，生成响应数据的函数，options 为 Ajax 选项集，含有 url、type、body 3 个属性

mock 方法有如下几种用法：

- Mock.mock( template )

- Mock.mock( rurl, template )

- Mock.mock( rurl, function( options ) )

- Mock.mock( rurl, rtype, template )

- Mock.mock( rurl, rtype, function( options ) )

[示例用法](./src/mock.js)

### Mock.setup()

配置拦截 Ajax 请求时的行为

当前支持配置 timeout：

```js
Mock.setup({
    timeout: 400, // 400ms 返回数据
});

Mock.setup({
    timeout: '200-600', // 200-600ms 返回数据
});
```
[示例用法](./src/setup.js)

### Mock.Random

Mock.Random 是工具类，用于生成各种随机数据

Mock.Random 在数据模板中称为**占位符**，格式为 **@占位符(参数 [, 参数)**

```js
const data = Mock.mock({
    'id|1-10': 100,
    email: '@email("qq.com")',
    url: '@url("https", "taobao.com")',
});

// 其中
// @email('qq.com') 等价于 Mock.Random.email('qq.com')
// @url('https', 'taobao.com') 等价于 Mock.Random.url('https', 'taobao.com')
```

Mock.Random 提供如下方法：

- Basic：[boolean, natural, integer, float, character, string, range](./src/random-types/base.ts)

- Date：[date, time, datetime, now](./src/random-types/date.ts)

- Image：[image, dataImage](./src/random-types/image.ts)

- Color：[color, hex, rgb, rgba, hsl](./src/random-types/color.ts)

- Text：[paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle](./src/random-types/text.ts)

- Name：[first, last, name, cfirst, clast, cname](./src/random-types/name.ts)

- Web：[url, protocol, domain, email, ip, tld](./src/random-types/web.ts)

- Address：[region, province, city, county, zip](./src/random-types/address.ts)

- Helper：[capitalize, upper, lower, pick, shuffle](./src/random-types/helper.ts)

- Miscellaneous：[guid, id, increment](./src/random-types/miscellaneous.ts)

除此之外，也可以为 Mock.Random 扩展方法：

```js
Mock.Random.extend({
    constellation() {
        const constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
        return this.pick(constellations);
    },
});

console.log(Random.constellation()); // 水瓶座
```

### Mock.valid()

校验真实数据 data 是否与数据模板 template 匹配

- template：数据模板，可以是对象或字符串

- data：真实数据

```js
const template = {
    name: 'value1',
};

const data = {
    name: 'value2',
};

console.log(Mock.valid(template, data));

// =>

[
    {
        action: "is equal to",
        actual: "value2",
        expected: "value1",
        message: "[VALUE] Expect ROOT.name'value is equal to value1, but is value2",
        path: ["ROOT", "name"],
        type: "value",
    }
]
```

### Mock.toJSONSchema()

把 Mock.js 风格的数据模板 template 转换成 [JSON Schema](http://json-schema.org/)

- template：表示数据模板，可以是对象或字符串

```js
const template = {
    'key|1-10': '★'
}

console.log(Mock.toJSONSchema(template));

// =>

{
    "name": undefined,
    "path": [
        "ROOT"
    ],
    "type": "object",
    "template": {
        "key|1-10": "★"
    },
    "rule": {},
    "properties": [{
        "name": "key",
        "path": [
            "ROOT",
            "key"
        ],
        "type": "string",
        "template": "★",
        "rule": {
            "parameters": ["key|1-10", "key", null, "1-10", null],
            "range": ["1-10", "1", "10"],
            "min": 1,
            "max": 10,
            "count": 3,
            "decimal": undefined,
            "dmin": undefined,
            "dmax": undefined,
            "dcount": undefined
        }
    }]
}
```