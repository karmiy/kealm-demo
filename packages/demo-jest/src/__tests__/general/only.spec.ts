describe('only', () => {
    /* 测试 only */
    
    // 只会执行这个 test，下面的 sum test 不会执行
    // 当运行报错时，想通过分别执行每一个 test，来查找问题所在时非常有用
    it.only('this will be the only test that runs', () => {
        expect(true).toBe(true);
    });
    
    it('sum', () => {
        console.log(4);
        expect(1 + 2).toBe(3);
    });
});