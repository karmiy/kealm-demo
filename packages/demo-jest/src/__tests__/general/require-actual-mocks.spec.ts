import fetch from 'node-fetch';
import { createUser } from '@utils/create-user';

jest.mock('@utils/music-player');
jest.mock('node-fetch'); // jest.mock('node-fetch'); 后模块内全部函数都会被 mock，意味着 Response 也被 mock 掉了，response.text 无法返回正常的值
const { Response } = jest.requireActual('node-fetch'); // requireActual 取原模块

describe('es6 class mocks of mock factory ', () => {
    /* 测试 createUser 调用 fetch 的参数与返回值 */
    it('test createUser calls fetch with the right args and returns the user id', async () => {
        (fetch as any).mockReturnValue(Promise.resolve(new Response('4')));

        const userId = await createUser();
        expect(fetch).toHaveBeenCalledTimes(1);

        expect(fetch).toHaveBeenCalledWith('http://website.com/users', {
            method: 'POST',
        });
        expect(userId).toBe('4');
    });
});