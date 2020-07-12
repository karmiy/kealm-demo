
/**
 * @description 判断是否是函数
 * @param value 被判断项
 * @param option 配置
 * @returns 函数返回 true，反之 false
 */
export const isFunction = function(value: any, option?: object): value is Function {
    return toString.call(value) === '[object Function]';
}