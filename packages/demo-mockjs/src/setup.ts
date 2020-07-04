import Mock from 'mockjs';
import axios from 'axios';

// 延迟 2s - 3s
Mock.setup({
    timeout: '2000-3000',
});

Mock.mock('/setup_1', {
    'dataSource|5': [{
        'id|+1': 1,
    }],
});

axios.get('/setup_1').then(res => {
    console.log(res.data.dataSource);
});