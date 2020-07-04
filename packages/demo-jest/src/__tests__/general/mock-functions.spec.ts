import axios from 'axios';
import foo from '@utils/foo';
jest.mock('axios');
jest.mock('@utils/foo');

/**
 * 注: jest 提供了 mock 让我们将逻辑复杂的代码简单化
 * jest.mock('xxx') 的流程参考 manual-mock.spec.ts
 * jest.fn 返回的 mock 函数, jest.mock 的模块,都会在函数本身(如 axios 本来就是函数)与其函数属性(如 axios.get 也是函数)上挂载如下属性
 * _isMockFunction: boolean
 * getMockImplementation
 * mock
 * mockClear 清除自身的 mock 数据，如清空参数记录，被调用次数等，只能清除自身，X.mockClear 只能清除X，X.yy 的话需要 yy 自己 mockClear
 * mockReset
 * mockRestore
 * mockReturnValueOnce
 * mockReturnValue
 * mockResolvedValueOnce
 * mockRejectedValueOnce
 * mockResolvedValue
 * mockRejectedValue
 * mockResolvedValue 
 * mockImplementationOnce
 * mockImplementation 
 * mockReturnThis
 * mockName
 * getMockName
 */

/* mock function */
describe('mock function', () => {
    function forEach<T>(items: Array<T>, callback: (index: number, item: T) => any) {
        for (let index = 0; index < items.length; index++) {
            callback(index, items[index]);
        }
    }

    // 创建一个函数 mockCallback
    const mockCallback = jest.fn(x => 42 + x);

    forEach([10, 11], mockCallback);

    /* 测试函数被调用次数 */
    it('test calls length', () => {
        expect(mockCallback.mock.calls.length).toBe(2); // 回调被调用 2 次
        expect(mockCallback.mock.calls.length).toBeGreaterThan(1); // 回调被调用 > 1 次
    });

    /* 测试函数参数 params 接收 */
    it('test calls param', () => {
        expect(mockCallback.mock.calls[0]).toContain(10); // 回调第 1 次接收的参数包含 10 这个值
        expect(mockCallback.mock.calls[1]).toEqual([1, 11]); // 回调第 2 次接收的参数
        expect(mockCallback.mock.calls[mockCallback.mock.calls.length - 1]).toEqual([1, 11]); // 回调最后一次被调用接收的参数
    });

    /* 测试函数返回结果 return */
    it('test calls result', () => {
        expect(mockCallback.mock.results[1].value).toBe(43); // 回调返回结果
    });

    /* 测试为函数手动设置返回值 */
    // mockReturnValueOnce 为 mock 函数手动设置返回值
    it('test calls mockReturnValueOnce', () => {
        let myMock = jest.fn();
        // 手动设置每一次返回值
        myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);
        expect([myMock(), myMock(), myMock(), myMock()]).toEqual([10, 'x', true, true]);

        myMock = jest.fn();
        // 模拟 filter 过滤，手动设置第一次返回 true，第二次 false
        myMock.mockReturnValueOnce(true).mockReturnValueOnce(false);
        const result = [11, 12].filter((num, index) => myMock(num, index));
        // console.log(myMock.mock.calls); // [ [ 11, 0 ], [ 12, 1 ] ]
        expect(result).toEqual([11]); // 12 被过滤了
    });
});

/* mock instance */
describe('mock instance', () => {
    function User(this: { id: number }): any {
        this.id = 10;
    }
    
    const myMock = jest.fn(User);
    const a = new myMock();
    const b = {};
    const bound = myMock.bind(b);
    bound();

    /* 测试实例化次数 */
    it('test instances length', () => {
        expect(myMock.mock.instances.length).toBe(2); // 被实例化 2 次
    });

    /* 测试实例对象 id 是否匹配 */
    it('test instance id', () => {
        expect(myMock.mock.instances[0].id).toBe(10); // 实例对象的 id
    });
});

/* mock modules */
describe('mock modules', () => {
    /* 测试模拟 axios 请求 */
    // 模拟 axios，使得调用 axios 时返回手动设置的值，而不是真的调用 axios api
    // mockResolvedValue(xxx) 将调用者变为 () => Promise.resolved(xxx)
    it('test mock axios', () => {
        const users = [{ name: 'karmiy' }];
        const resp = { data: users };

        // 当我们调用 axios.get 时，返回 resp
        axios.get.mockResolvedValue(resp);
        // jest.spyOn(axios, 'get').mockResolvedValue(resp);

        return axios.get('/users.json').then(resp => expect(resp.data).toEqual(users));
    });
});

/* mock implementations */
describe('mock implementations', () => {
    /* 测试 mock 函数重置 */
    it('test mockImplementationOnce', () => {
        // 将 foo 函数重置为 () => 42
        // mockImplementation(xxx) 将调用者变为 xxx
        foo.mockImplementation(() => 42);
        expect(foo()).toBe(42);
    });

    /* 测试 mock 函数单次重置 */
    it('test mockImplementationOnce', () => {
        // 将函数分别重置为 () => 10 和 () => 20，执行 2 次后恢复
        const myMockFn = jest.fn(() => 1);
        myMockFn
            .mockImplementationOnce(() => 10)
            .mockImplementationOnce(() => 20);
        expect(foo()).toBe(42);

        expect(myMockFn()).toBe(10);
        expect(myMockFn()).toBe(20);
        expect(myMockFn()).toBe(1); // 恢复
    });
});

/* mock returnThis */
describe('mock returnThis', () => {
    /* 测试 mock 函数 return this */
    it('test mockReturnThis', () => {
        const myObj = {
            myMethod: jest.fn().mockReturnThis(), // 等价于 jest.fn(function() { return this; })
        };

        expect(myObj.myMethod()).toBe(myObj);
    });
});

/* mock names */
describe('mock returnThis', () => {
    /* 测试为 mock 函数取名 */
    // 给 mock 函数添加名称
    it('test mockName', () => {
        const myMockFn = jest
            .fn()
            .mockReturnValue('default')
            .mockImplementation(scalar => 42 + scalar)
            .mockName('add42');

        expect(myMockFn.getMockName()).toBe('add42');
    });
});

/* custom matchers*/
describe('custom matchers', () => {
    /* 测试 mock 函数被调用 */
    // 至少被调用一次
    it('test toBeCalled', () => {
        const myMockFn = jest.fn();
        myMockFn();
        expect(myMockFn).toBeCalled();
    });

    /* 测试 mock 函数被指定参数调用 */
    it('test toBeCalledWith', () => {
        const myMockFn = jest.fn();
        myMockFn(100, 200);
        myMockFn();
        expect(myMockFn).toBeCalledWith(100, 200);
    });

    /* 测试 mock 函数最后一次被调用是否使用了指定参数 */
    it('test lastCalledWith', () => {
        const myMockFn = jest.fn();
        myMockFn();
        myMockFn();
        myMockFn(100, 200); // 最后一次调用带有参数 100, 200
        expect(myMockFn).lastCalledWith(100, 200);
    });

    /* 测试 mock 函数快照 */
    // 把所有调用和 mock 作为 snapshot 写入到文件，执行后 __tests__ 下会出现 __snapshots__ 的文件夹，里面存有执行 snapshot
    // 执行一次后生成 snapshot 快照，第二次执行会去和快照内容比较看是否改变过，改变过会报错
    // 可以执行 jest --u 更新 snapshot 快照
    it('test toMatchSnapshot', () => {
        const myMockFn = jest.fn();
        myMockFn();
        myMockFn(100, 200);
        expect(myMockFn).toMatchSnapshot();
    });
});