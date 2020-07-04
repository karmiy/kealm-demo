import { fetchData, fetchSuccess, fetchError } from '@utils/fetch';

describe('async', () => {
    /* 测试 Promise 成功状态 */
    it('test promise success', () => {
        return fetchSuccess().then(data => expect(data).toBe(1)); // return Promise
    });

    /* 测试 Promise 失败状态 */
    it('test promise error', () => {
        expect.assertions(1); // 必须且只能执行一个 expect
        
        return fetchError()
            .then(data => expect(data).toBe(1))
            .catch(err => expect(err).toBe(0));
    });

    /* 测试 Promise resolve 值是否匹配 */
    it('test promise resolves', () => {
        return expect(fetchSuccess()).resolves.toBe(1);
    });

    /* 测试 Promise reject 值是否匹配 */
    it('test promise rejects', () => {
        return expect(fetchError()).rejects.toBe(0);
    });

    /* 测试 Async Await */
    it('test promise async await', async () => {
        const data = await fetchSuccess();
        expect(data).toBe(1);
    });

    /* 测试 Async Await 的 resolve 值是否匹配 */
    it('test promise async await resolves', async () => {
        // return expect(fetchSuccess()).resolves.toBe(1); // √，return Promise
        await expect(fetchSuccess()).resolves.toBe(1); // √，return Promise
    });
});