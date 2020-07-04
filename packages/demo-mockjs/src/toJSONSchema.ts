import Mock from 'mockjs';

const template = {
    'key|1-10': '★'
}

console.log(Mock.toJSONSchema(template));