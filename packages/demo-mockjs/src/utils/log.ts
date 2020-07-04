import Mock from 'mockjs';
const { log } = console;

type Param = number | string | boolean;

/**
 * 优化参数显示
 * @param param 参数
 */
function prettierParam(param: Param) {
    return typeof param === 'string' ? `'${param}'` : param.toString();
}

/**
 * 打印 title
 * @param {string} title 标题
 */
export function logTitle(title: string) {
    log(`--- ${title} ---`);
}

/**
 * 打印并执行 Mock.Random 函数
 * @param {function} func Random 下方法
 * @param  {...any} params 参数
 */
export function logRandomExec<T extends Array<any>>(func: (...args: T) => any, ...params: T) {
    const expression = 
        'Random.' + 
        func.name + 
        '(' + 
        params.map(item => prettierParam(item)).join(', ') +
        ')';
    log(expression + ':', func.call(Mock.Random, ...params));
}

/**
 * 打印空行
 */
export function logEmptyLine() {
    log('');
}