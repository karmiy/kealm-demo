describe('outer', () => {
    /* 测试 jest 执行顺序 */

    // 执行顺序 1、2、3、4、5、6
    // describe 里相当于 Promise 构造函数，是同步执行的，it 内部相当于 Promise.then

    console.log(1);

    describe('describe inner-a', () => {
        console.log(2);
        it('sum', () => {
            console.log(4);
            expect(1 + 2).toBe(3);
        });
    });
    
    it('sum', () => {
        console.log(5);
        expect(1 + 2).toBe(3);
        describe('describe inner-a', () => {
            console.log(6);
        });
    });

    describe('describe inner-a', () => {
        console.log(3);
    });
});