import { sum } from '@utils/math';

/* DOC: https://jestjs.io/docs/en/expect */
describe('base', () => {
    /* 测试 1 + 2 = 3 */
    it('test add 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });

    /* 测试对象是否相同(非同引用地址) */
    it('test object is equal', () => {
        expect({ id: 1 }).toEqual({ id: 1 }); // toEqual 不会匹配引用地址
    });

    /* 测试真实性 */
    it('test truthiness', () => {
        expect(null).toBeNull();
        expect(undefined).toBeUndefined();
        expect(1).toBeDefined();
        expect(1).toBeTruthy(); // if true
        expect(1).not.toBeFalsy(); // false 0 NaN '' undefined null
    });

    /** 测试 number  */
    it('test numbers', () => {
        expect(4).toBeGreaterThan(3);
        expect(4).toBeGreaterThanOrEqual(4);
        expect(1).toBeLessThan(2);
        expect(1).toBeLessThanOrEqual(1);
        expect(0.1 + 0.2).toBeCloseTo(0.3);
    });

    /** 测试数组与迭代器 */
    it('test arrays and iterables', () => {
        const users = [
            'karmiy',
            'karloy',
        ];
        expect(users).toContain('karmiy');
        expect(new Set(users)).toContain('karmiy');
    });

    /* 测试 Error */
    it('test exceptions', () => {
        function compileAndroidCode() {
            throw new Error('you are using the wrong JDK');
        }
        expect(compileAndroidCode).toThrow();
        expect(compileAndroidCode).toThrow(Error);
        expect(compileAndroidCode).toThrow('you are using the wrong JDK');
        expect(compileAndroidCode).toThrow(/JDK/);
    });
});