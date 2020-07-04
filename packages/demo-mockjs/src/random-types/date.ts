import { Random } from 'mockjs';
import { logTitle, logRandomExec, logEmptyLine } from '@utils/log';

/* Random.date( format? ) */
// 返回一个随机的日期字符串
// format 默认 yyyy-MM-dd，可选参考: https://github.com/nuysoft/Mock/wiki/Date
logTitle('Random.date( format? )');
logRandomExec(Random.date); // 返回随机 yyyy-MM-dd 格式的日期
logRandomExec(Random.date, 'yy-MM-dd'); // 返回随机 yy-MM-dd 格式的日期
logRandomExec(Random.date, 'yyyy-MM-dd HH:mm:ss'); // 返回随机 yyyy-MM-dd HH:mm:ss 格式的日期
logEmptyLine();

/* Random.time( format? ) */
// 返回一个随机的时间字符串
// format 默认 HH:mm:ss
logTitle('Random.time( format? )');
logRandomExec(Random.time); // 返回随机 HH:mm:ss 格式的时间
logRandomExec(Random.time, 'A HH:mm:ss'); // 返回随机 A HH:mm:ss 格式的时间
logRandomExec(Random.time, 'a HH:mm:ss'); // 返回随机 a HH:mm:ss 格式的时间
logEmptyLine();

/* Random.datetime( format? ) */
// 返回一个随机的日期和时间字符串
// format 默认 yyyy-MM-dd HH:mm:ss
logTitle('Random.datetime( format? )');
logRandomExec(Random.datetime); // 返回随机 yyyy-MM-dd HH:mm:ss 格式的日期
logRandomExec(Random.datetime, 'yyyy-MM-dd A HH:mm:ss'); // 返回随机 yyyy-MM-dd A HH:mm:ss 格式的日期
logEmptyLine();

/* Random.now( unit?, format? ) */
// 返回当前的日期和时间字符串
// unit: 时间单位，可选：year、month、week、day、hour、minute、second、week
// format 默认 yyyy-MM-dd HH:mm:ss
logTitle('Random.now( unit?, format? )');
logRandomExec(Random.now); // 返回 yyyy-MM-dd HH:mm:ss 格式的当前日期
logRandomExec(Random.now, 'day'); // 返回的日期精确到天，时分秒为 0
logRandomExec(Random.now, 'day', 'yyyy-MM-dd HH'); // 返回的日期精确到天，时分秒为 0
logRandomExec(Random.now, 'month'); // 返回的日期精确到月，时分秒为 0，天为 1
logRandomExec(Random.now, 'year'); // 返回的日期精确到年，时分秒为 0，月天为 1
logRandomExec(Random.now, 'week'); // 返回的日期精确到本周，注意周的第一天为周日而不是周一
