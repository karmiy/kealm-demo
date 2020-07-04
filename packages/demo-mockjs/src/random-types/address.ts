import { Random } from 'mockjs';
import { logTitle, logRandomExec, logEmptyLine } from '@utils/log';

/* Random.region() */
// 随机生成一个（中国）大区
logTitle('Random.region()');
logRandomExec(Random.region); // 如 "华北"
logEmptyLine();

/* Random.province() */
// 随机生成一个（中国）省（或直辖市、自治区、特别行政区）
logTitle('Random.province()');
logRandomExec(Random.province); // 如 "福建省"
logEmptyLine();

/* Random.city( prefix? ) */
// 随机生成一个（中国）市
logTitle('Random.city( prefix? )');
logRandomExec(Random.city); // 如 "厦门市"
logRandomExec(Random.city, true); // 所属的省一起生成，如 "福建省 厦门市"
logEmptyLine();

/* Random.county( prefix? ) */
// 随机生成一个（中国）县
logTitle('Random.county( prefix? )');
logRandomExec(Random.county); // 如 "上杭县"
logRandomExec(Random.county, true); // 所属的省、市一起生成，如 "甘肃省 天水市 清水县"
logEmptyLine();

/* Random.zip() */
// 随机生成一个邮政编码（六位数字）
logTitle('Random.zip()');
logRandomExec(Random.zip); // 如 "361000"