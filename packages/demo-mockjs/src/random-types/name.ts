import { Random } from 'mockjs';
import { logTitle, logRandomExec, logEmptyLine } from '@utils/log';

/* Random.first() */
// 随机生成一个常见的英文名
logTitle('Random.first()');
logRandomExec(Random.first);
logEmptyLine();

/* Random.last() */
// 随机生成一个常见的英文姓
logTitle('Random.last()');
logRandomExec(Random.last);

/* Random.name( middle? ) */
// 随机生成一个常见的英文姓名
logTitle('Random.name( middle? )');
logRandomExec(Random.name); // 随机生成一个常见的英文姓名，如 Larry Wilson
logRandomExec(Random.name, true); // 会生成中间名，即名字是 3 个单词组成的，如 Helen Carol Martinez
logEmptyLine();

/* Random.cfirst() */
// 随机生成一个常见的中文姓
logTitle('Random.cfirst()');
logRandomExec(Random.cfirst); // 只有一个汉字，如 "佩奇" 中的 "佩"
logEmptyLine();

/* Random.clast() */
// 随机生成一个常见的中文名
logTitle('Random.clast()');
logRandomExec(Random.clast); // 如 "佩奇" 中的 "奇"
logEmptyLine();

/* Random.cname() */
// 随机生成一个常见的中文姓名
logTitle('Random.cname()');
logRandomExec(Random.cname);