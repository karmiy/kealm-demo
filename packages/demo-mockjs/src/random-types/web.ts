import { Random } from 'mockjs';
import { logTitle, logRandomExec, logEmptyLine } from '@utils/log';

/* Random.url( protocol?, host? ) */
// 随机生成一个 URL
logTitle('Random.url( protocol?, host? )');
logRandomExec(Random.url); // 随机生成一个 URL
logRandomExec(Random.url, 'https'); // 协议为 https 的 URL
logRandomExec(Random.url, 'https', 'karmiy.com'); // 协议为 https、域名和端口号 karmiy.com 的 URL
logEmptyLine();

/* Random.protocol() */
// 随机生成一个 URL 协议
// 返回值为以下值之一：'http'、'ftp'、'gopher'、'mailto'、'mid'、'cid'、'news'、'nntp'、'prospero'、'telnet'、'rlogin'、'tn3270'、'wais'
logTitle('Random.protocol()');
logRandomExec(Random.protocol);
logEmptyLine();

/* Random.domain() */
// 随机生成一个域名
logTitle('Random.domain()');
logRandomExec(Random.domain);
logEmptyLine();

/* Random.tld() */
// 随机生成一个顶级域名
logTitle('Random.tld()');
logRandomExec(Random.tld); // 如 net
logEmptyLine();

/* Random.email( domain? ) */
// 随机生成一个邮件地址
logTitle('Random.email( domain? )');
logRandomExec(Random.email); // 随机生成一个邮件地址
logRandomExec(Random.email, 'qq.com'); // 指定邮件地址的域名为 qq.com
logEmptyLine();

/* Random.ip() */
// 随机生成一个 IP 地址
logTitle('Random.ip()');
logRandomExec(Random.ip);
