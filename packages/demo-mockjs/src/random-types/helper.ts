import { Random } from 'mockjs';
import { logTitle, logRandomExec, logEmptyLine } from '@utils/log';

/* Random.capitalize( word ) */
// 把字符串的第一个字母转换为大写
logTitle('Random.capitalize( word )');
logRandomExec(Random.capitalize, 'karmiy');
logEmptyLine();

/* Random.upper( str ) */
// 把字符串转换为大写
logTitle('Random.upper( str )');
logRandomExec(Random.upper, 'karmiy');
logEmptyLine();

/* Random.lower( str ) */
// 把字符串转换为小写
logTitle('Random.lower( str )');
logRandomExec(Random.lower, 'KARMIY');
logEmptyLine();

/* Random.pick( arr ) */
// 从数组中随机选取一个元素，并返回
logTitle('Random.pick( arr )');
logRandomExec(Random.pick, ['k', 'a', 'r', 'm', 'i', 'y']);
logEmptyLine();

/* Random.shuffle( arr ) */
// 打乱数组中元素的顺序，并返回
logTitle('Random.shuffle( arr )');
logRandomExec(Random.shuffle, ['k', 'a', 'r', 'm', 'i', 'y']);