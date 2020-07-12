/**
 * @description 判断是否是函数
 * @param {any} value 被判断项
 * @param {object} [option] 配置
 * @returns {boolean} 函数返回 true，反之 false
 */
export const isFunction = function(value, option) {
    return toString.call(value) === '[object Function]';
}