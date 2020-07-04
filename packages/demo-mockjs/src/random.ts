import Mock, { Random } from 'mockjs';
// import './random-types/base';
// import './random-types/date';
// import './random-types/image';
// import './random-types/color';
// import './random-types/text';
// import './random-types/name';
// import './random-types/web';
// import './random-types/address';
// import './random-types/helper';
// import './random-types/miscellaneous';

/* 占位符 */
const data = Mock.mock({
    'id|1-10': 100,
    email: '@email("qq.com")',
    url: '@url("https", "taobao.com")',
});

console.log(data);

/* 扩展 Random 方法 */
Random.extend({
    constellation() {
        const constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
        return this.pick(constellations);
    },
});

console.log(Random.constellation());

