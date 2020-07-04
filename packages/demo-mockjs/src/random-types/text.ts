import { Random } from 'mockjs';
import { logTitle, logRandomExec, logEmptyLine } from '@utils/log';

/* Random.paragraph( min?, max? ) */
// 随机生成一段英文文本
logTitle('Random.paragraph( min?, max? )');
logRandomExec(Random.paragraph); // 随机生成一段文本
logRandomExec(Random.paragraph, 2); // 生成一段包含 2 个句子的文本，每一段句号结尾为 1 个句子，如 xxx.yyy.zzz. 为 3 个句子
logRandomExec(Random.paragraph, 1, 3); // 生成一段包含 1-3 个句子的文本
logEmptyLine();

/* Random.cparagraph( min?, max? ) */
// 随机生成一段中文文本
logTitle('Random.cparagraph( min?, max? )');
logRandomExec(Random.cparagraph); // 随机生成一段中文文本
logRandomExec(Random.cparagraph, 2); // 生成一段包含 2 个句子的中文文本，每一段句号结尾为 1 个句子
logRandomExec(Random.cparagraph, 1, 3); // 生成一段包含 1-3 个句子的中文文本
logEmptyLine();

/* Random.sentence( min?, max? ) */
// 随机生成一个句子，第一个单词的首字母大写
logTitle('Random.sentence( min?, max? )');
logRandomExec(Random.sentence); // 随机生成一个句子，默认句子中单词数为 12-18 个
logRandomExec(Random.sentence, 3); // 随机生成一个句子，句子中单词数为 3 个
logRandomExec(Random.sentence, 1, 5); // 随机生成一个句子，句子中单词数为 1-5 个
logEmptyLine();

/* Random.csentence( min?, max? ) */
// 随机生成一个中文句子
logTitle('Random.csentence( min?, max? )');
logRandomExec(Random.csentence); // 随机生成一个中文句子
logRandomExec(Random.csentence, 5); // 随机生成一个中文句子，句中字数为 5
logRandomExec(Random.csentence, 1, 8); // 随机生成一个中文句子，句中字数为 1-8
logEmptyLine();

/* Random.word( min?, max? ) */
// 随机生成一个单词
logTitle('Random.word( min?, max? )');
logRandomExec(Random.word); // 随机生成一个单词，单词默认由 3-10 个字母组成
logRandomExec(Random.word, 5); // 随机生成一个单词，单词由 5 个字母组成
logRandomExec(Random.word, 3, 8); // 随机生成一个单词，单词由 3-8 个字母组成
logEmptyLine();

/* Random.cword( pool?, min?, max? ) */
// 随机生成一个汉字
logTitle('Random.cword( pool?, min?, max? )');
logRandomExec(Random.cword);
logRandomExec(Random.cword, '零一二三四五六七八九十'); // 从里面取一个汉字返回
logRandomExec(Random.cword, 3); // 随机生成 3 个汉字
logRandomExec(Random.cword, '零一二三四五六七八九十', 3); // 从中随机取 3 个汉字返回，可能重复
logRandomExec(Random.cword, 3, 5); // 随机生成 3-5 个汉字
logRandomExec(Random.cword, '零一二三四五六七八九十', 3, 5); // 从中随机取 3-5 个汉字返回，可能重复
logEmptyLine();

/* Random.title( min?, max? ) */
// 随机生成一句标题，其中每个单词的首字母大写
logTitle('Random.title( min?, max? )');
logRandomExec(Random.title); // 随机生成一句标题，默认 3-7 个单词组成
logRandomExec(Random.title, 3); // 随机生成一句标题，由 3 个单词组成
logRandomExec(Random.title, 3, 5); // 随机生成一句标题，由 3-5 个单词组成
logEmptyLine();

/* Random.ctitle( min?, max? ) */
// 随机生成一句中文标题
logTitle('Random.ctitle( min?, max? )');
logRandomExec(Random.ctitle); // 随机生成一句中文标题，默认 3-7 个单词组成
logRandomExec(Random.ctitle, 3); // 随机生成一句中文标题，由 3 个单词组成
logRandomExec(Random.ctitle, 3, 5); // 随机生成一句中文标题，由 3-5 个单词组成