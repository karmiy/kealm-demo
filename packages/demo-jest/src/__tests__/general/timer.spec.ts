import { timerGame, infiniteTimerGame } from '@utils/timer-game';

// 启动伪定时器
// 会覆盖原生定时器 setTimeout, setInterval, clearTimeout, clearInterval 
// jest.useFakeTimers();

describe('timer mocks', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    /* 测试 setTimeout 被执行、设置的 timeout 值 */
    it('test setTimeout fn be called and duration', () => {
        timerGame();

        expect(setTimeout).toHaveBeenCalledTimes(1); // setTimeout 函数被执行 1 次
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000); // 最后会在 1s 后被作为函数执行，此时还没有执行定时器，只是校验定时器设置的 timeout
        
        // 其实定时器也是有启动的，只是等 1s 后我们的 test 已经测试结束，不会在打印在控制台了，并且底部设置 afterEach 清除定时器
    });

    /* 测试 setTimeout 回调被调用 */
    it('test setTimeout with callback', () => {
        const callback = jest.fn();
        timerGame(callback);

        expect(callback).not.toBeCalled();

        jest.runAllTimers(); // 加速运转，直接让全部定时器执行完毕

        expect(callback).toBeCalled();
        expect(callback).toHaveBeenCalledTimes(1); // callback 函数被执行了 1 次
    });
    
    /* 测试递归定时器 */
    it('test recursive timer', () => {
        const callback = jest.fn();
        infiniteTimerGame(callback);

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

        // 只加速运转当前 pending 的定时器，因为 runAllTimers 会将定时器里的定时器一起过掉，不可取
        jest.runOnlyPendingTimers();

        expect(callback).toBeCalled();

        expect(setTimeout).toHaveBeenCalledTimes(2); // 加速运转前一阶段定时器后，里面又创建新的 10s 定时器
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
    });

    /* 测试提前终止指定时间内的定时器 */
    it('test advanceTimersByTime', () => {
        const callback = jest.fn();
        infiniteTimerGame(callback);

        expect(callback).not.toBeCalled();
        
        // 直接提前结束掉 10s 内定时器创建的宏任务，如果定时器里又创建新的宏任务，也是一直执行，直到规定时间
        jest.advanceTimersByTime(20000);
        
        expect(callback).toBeCalled();
        expect(callback).toHaveBeenCalledTimes(2);
    });

    afterEach(() => {
        jest.clearAllTimers(); // 清除所有定时器
    });
});