describe('hooks', () => {
    /** 测试 hooks 钩子 */
    beforeEach(() => {
        console.log('--- before each ---');
    });

    afterEach(() => {
        console.log('--- after each ---');
    });

    beforeAll(() => {
        console.log('--- before all ---');
    });

    afterAll(() => {
        console.log('--- after all ---');
    });

    it('sum', () => {
        expect(1 + 2).toBe(3);
    });

    it('xiamen', () => {
        expect('xiamen').toBe('xiamen');
    });
});