import { Random } from 'mockjs';
import { logTitle, logRandomExec, logEmptyLine } from '@utils/log';

/* Random.guid() */
// 随机生成一个 GUID（全局唯一标识符）
logTitle('Random.guid()');
logRandomExec(Random.guid); // 如 "b3dBBBBF-d14e-5FD7-cB26-B16c1cC53323"
logEmptyLine();

/* Random.id() */
// 随机生成一个 18 位身份证
logTitle('Random.id()');
logRandomExec(Random.id);
logEmptyLine();

/* Random.increment( step? ) */
// 生成一个全局的自增整数
logTitle('Random.increment( step? )');
logRandomExec(Random.increment); // 返回 1
logRandomExec(Random.increment); // 返回 2
logRandomExec(Random.increment); // 返回 3
logRandomExec(Random.increment, 100); // 自增步长变为 100，返回 103
logRandomExec(Random.increment, 1000); // 自增步长变为 1000，返回 1103
