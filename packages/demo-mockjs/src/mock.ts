import Mock from 'mockjs';
import axios from 'axios';

/* Mock.mock( template ) */
const data_1 = Mock.mock('karmiy');
const data_2 = Mock.mock({
    // string
    'string_1|2-4': 'kar',
    'string_2|3': 'kar',

    // number
    'number_1|2': [{
        'id|+1': 10,
    }],
    'number_2|1-10': 100,
    'number_3|1-100.1-10': 999,

    // boolean
    'boolean_1|1': true,
    'boolean_2|1-3': true,

    // object
    'object_1|2': {
        key: 1,
        name: 'k',
        code: 'k09123',
        age: 18,
    },
    'object_2|1-3': {
        key: 1,
        name: 'k',
        code: 'k09123',
        age: 18,
    },
    // array
    'array_1|1': [10, 20, 30],
    'array_2|2': [{
        'item|+1': [10, 20, 30],
    }],
    'array_3|2-4': [10, 20, 30],
    'array_4|3': [10, 20, 30],

    // function
    'function_1': function() {
        // console.log(this);
        return '999';
    },
    
    // regexp
    'regexp_1': /[a-z][A-Z][0-9]/,
    'regexp_2': /\w\W\s\S\d\D/,
    'regexp_3': /\d{5,10}/,
});

console.log(data_1);
console.log(data_2);

/* Mock.mock( rurl, template ) */
Mock.mock('/test', {
    'dataSource|10': [{
        'id|+1': 1,
        'name|1': ['karmiy', 'karloy', 'qiuqiu'], 
    }],
});

axios.get('/test').then((res) => {
    console.log(res.data.dataSource);
});

/* Mock.mock( rurl, function( options ) ) */
Mock.mock('/test_2', function(options) {
    // console.log(options); // url type body
    return [100, 200, 300];
});
axios.get('/test_2').then((res) => {
    console.log(res.data);
});

/* Mock.mock( rurl, rtype, template ) */
Mock.mock(/\/test_3(\?)?.*/, 'get', function(options) {
    return [100, 200, 300];
});
axios.get('/test_3', { params: { id: 10 } }).then((res) => {
    console.log(res.data);
});

/* Mock.mock( rurl, rtype, function( options ) ) */
Mock.mock('/test_4', 'post', function(options) {
    return [100, 200, 300];
});
axios.post('/test_4', { id: 20 }).then((res) => {
    console.log(res.data);
});