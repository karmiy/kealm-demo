import mockjs from 'mockjs';
import { Request, Response } from 'umi';

export default {
    // 支持值为 Object 和 Array（GET 可忽略）
    'GET /api/user/list': mockjs.mock({
        'list|100': [{ 'id|1-100': 50, name: '@name', 'type|0-2': 1 }],
    }),

    // 支持自定义函数
    'GET /api/user/get': (req: Request, res: Response) => {
        const id = req.query.id;
        // 添加跨域请求头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(
            JSON.stringify({
                id: id ?? 0,
                name: 'karmiy',
            }),
        );
    },
};
