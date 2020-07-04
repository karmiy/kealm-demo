import { Random } from 'mockjs';
import { logTitle, logRandomExec, logEmptyLine } from '@utils/log';

/* Random.image( size?, background?, foreground?, format?, text? ) */
// 生成一个随机的图片地址
logTitle('Random.image( size?, background?, foreground?, format?, text? )');
logRandomExec(Random.image); // 返回随机图片
logRandomExec(Random.image, '200x50'); // 返回 200x50 的图片
logRandomExec(Random.image, '200x50', '#fb0a2a'); // 返回 200x50、背景色为 #fb0a2a 的图片
logRandomExec(Random.image, '200x50', '#02adea', 'karmiy'); // 返回 200x50、背景色为 #02adea、图片文字为 karmiy 的图片
logRandomExec(Random.image, '200x50', '#fb0a2a', '#1394ff', 'karmiy'); // 返回 200x50、背景色为 #fb0a2a、图片文字为 karmiy、文字颜色为 #1394ff 的图片
logRandomExec(Random.image, '200x50', '#fb0a2a', '#1394ff', 'gif', 'karmiy'); // 返回 200x50、背景色为 #fb0a2a、图片文字为 karmiy、文字颜色为 #1394ff 的 gif 图
logEmptyLine();

/* Random.dataImage( size?, text? ) */
// 生成一段随机的 Base64 图片编码
logTitle('Random.dataImage( size?, text? )');
logRandomExec(Random.dataImage);
logRandomExec(Random.dataImage, '200x100'); // 返回 200x100 的 Base64 图片编码
logRandomExec(Random.dataImage, '200x100', 'karmiy'); // 返回 200x100、图片文字是 karmiy 的 Base64 图片编码