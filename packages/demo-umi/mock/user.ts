import mockjs from 'mockjs';
import { Request, Response } from 'umi';
import { sleep } from '../src/utils/base';

const USER_LIST: Array<ApiNS.User> = [
    {
        name: 'karmiy',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userId: '00000001',
        email: '532981481@qq.com',
        age: 18,
        signature: 'core',
        title: 'developer',
        group: 'omc',
        tags: [
            {
                key: '0',
                label: '很有想法的',
            },
            {
                key: '1',
                label: '专注设计',
            },
        ],
        access: 'admin',
        address: '厦门市思明区',
        phone: '18888888888',
        introduction: '16 年毕业于 XX 大学，而后从事 Java 开发，于 18 年转型专注前端。技术领域：HTML、CSS、JavaScript、React、Vue。'.repeat(
            4,
        ),
    },
    {
        name: 'karloy',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userId: '00000002',
        email: '532981481@qq.com',
        age: 18,
        signature: 'core',
        title: 'developer',
        group: 'omc',
        tags: [
            {
                key: '0',
                label: '很听话',
            },
            {
                key: '1',
                label: '很懂事',
            },
        ],
        access: 'admin',
        address: '厦门市思明区',
        phone: '19999999999',
    },
    {
        name: 'test',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userId: '00000003',
        email: '123456789@qq.com',
        age: 18,
        signature: 'core',
        title: 'developer',
        group: 'omc',
        tags: [
            {
                key: '0',
                label: '游客',
            },
        ],
        access: 'guest',
        address: '厦门市思明区',
        phone: '16666666666',
    },
];

/* let access = '';

const getAccess = () => {
    return access;
}; */
let currentUser: ApiNS.User | null = null;

// 支持值为 Object 和 Array（GET 可忽略）
// 支持自定义函数
export default {
    'GET /api/user/list': mockjs.mock({
        'list|100': [{ 'id|1-100': 50, name: '@name', 'type|0-2': 1 }],
    }),

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

    // 获取登录状态
    'GET /api/currentUser': async (req: Request, res: Response) => {
        // await sleep(2000);
        if (!currentUser) {
            res.status(401).send({
                success: true,
                data: {
                    isLogin: false,
                },
                errorCode: '401',
                errorMessage: '请先登录！',
            });
            return;
        }
        res.send({
            success: true,
            data: currentUser,
        });
    },

    // 登录
    'POST /api/login/account': async (req: Request, res: Response) => {
        const { password, username, mobile, type } = req.body;
        await sleep(2000);

        if (username && password === '123456') {
            const user = USER_LIST.find(item => item.name === username);

            if (user) {
                res.send({
                    status: 'ok',
                    type,
                    currentAuthority: user.access,
                    message: '登录成功',
                });
                currentUser = user;
                return;
            }
        }
        if (type === 'mobile') {
            const user = USER_LIST.find(item => item.phone === mobile);

            if (user) {
                res.send({
                    status: 'ok',
                    type,
                    currentAuthority: user?.access,
                    message: '登录成功',
                });
                currentUser = user;
                return;
            }
        }

        res.send({
            status: 'error',
            type,
            currentAuthority: 'guest',
            message: '登录失败，请重试！',
        });
        // access = 'guest';
    },

    // 登出
    'POST /api/login/outLogin': (req: Request, res: Response) => {
        // access = '';
        currentUser = null;
        res.send({ data: {}, success: true });
    },
};
