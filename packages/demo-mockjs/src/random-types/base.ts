import { Random } from 'mockjs';
import { logTitle, logRandomExec, logEmptyLine } from '@utils/log';

/* Random.boolean( min?, max?, current? )  */
// 返回一个随机的布尔值
logTitle('Random.boolean( min?, max?, current? )');
logRandomExec(Random.boolean); // 各50%
logRandomExec(Random.boolean, 1, 9); // 各 50%
logRandomExec(Random.boolean, 1, 9, true); // true: 10% / false: 90%
logEmptyLine();

/* Random.natural( min?, max? ) */
// 返回一个随机的自然数（大于等于 0 的整数）
logTitle('Random.natural( min?, max? )');
logRandomExec(Random.natural); // 随机自然数
logRandomExec(Random.natural, 10); // >= 10 的自然数
logRandomExec(Random.natural, 10, 20); // 10 - 20 的自然数
logEmptyLine();

/* Random.integer( min?, max? ) */
// 返回一个随机的整数
logTitle('Random.integer( min?, max? )');
logRandomExec(Random.integer); // 随机整数
logRandomExec(Random.integer, 10); // >= 10 的整数
logRandomExec(Random.integer, -10, 10); // -10 - 10 的整数
logEmptyLine();

/* Random.float( min?, max?, dmin?, dmax? ) */
// 返回一个随机的浮点数
logTitle('Random.float( min?, max?, dmin?, dmax? )');
logRandomExec(Random.float); // 随机浮点数
logRandomExec(Random.float, 10); // 整数部分最小 10 的浮点数
logRandomExec(Random.float, 10, 20); // 整数部分 10 - 20 的浮点数
logRandomExec(Random.float, 10, 20, 2); // 小数位数最小 2 的浮点数
logRandomExec(Random.float, 10, 20, 2, 4); // 小数位数 2 - 4 的浮点数
logEmptyLine();

/* Random.character( pool? ) */
// 返回一个随机字符
logTitle('Random.character( pool? )');
logRandomExec(Random.character); // 从下方 lower + upper + number + symbol 池中随机取字符
logRandomExec(Random.character, 'lower'); // 从 abcdefghijklmnopqrstuvwxyz 随机取一个字符
logRandomExec(Random.character, 'upper'); // 从 ABCDEFGHIJKLMNOPQRSTUVWXYZ 随机取一个字符
logRandomExec(Random.character, 'number'); // 从 0123456789 随机取一个字符
logRandomExec(Random.character, 'symbol'); // 从 !@#$%^&*()[] 随机取一个字符
logEmptyLine();

/* Random.string( pool?, min?, max? ) */
// 返回一个随机字符串
// *注：每个字符皆可重复，如下方 Random.string('小猪佩奇', 2, 4) 可以得到 '猪猪猪'
logTitle('Random.string( pool?, min?, max? )');
logRandomExec(Random.string); // 从 lower + upper + number + symbol 池中随机选取一些字符拼为字符串
logRandomExec(Random.string, 3); // 从 lower + upper + number + symbol 池中随机选取一些字符拼为长度 3 的字符串
logRandomExec(Random.string, 'lower', 3); // 从 lower 池中随机选取一些字符拼为长度 3 的字符串
logRandomExec(Random.string, 3, 5); // 从 lower + upper + number + symbol 池中随机选取一些字符拼为长度 3-5 的字符串
logRandomExec(Random.string, 'karmiy', 1, 3); // 从 'karmiy' 5 个字符中随机选取一些字符拼为长度 1-3 的字符串
logRandomExec(Random.string, '小猪佩奇', 2, 4); // 从 '小猪佩奇' 4 个字符中随机选取一些字符拼为长度 2-4 的字符串
logEmptyLine();

/* Random.range( start?, stop, step? ) */
// 返回一个整型数组
logTitle('Random.range( start?, stop, step? )');
logRandomExec(Random.range, 10); // 以 10 为数组中整数的结束值，不包括 10
logRandomExec(Random.range, 3, 7); // 以 3 为数组中整数的起始值，包括 3，并以 7 为结束之，不包括 7
logRandomExec(Random.range, 1, 10, 3); // 以 3 为步长，默认 1