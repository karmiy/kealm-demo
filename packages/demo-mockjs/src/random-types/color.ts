import { Random } from 'mockjs';
import { logTitle, logRandomExec, logEmptyLine } from '@utils/log';

/* Random.color() */
// 随机生成一个有吸引力的颜色，格式为 '#RRGGBB'
logTitle('Random.color()');
logRandomExec(Random.color);
logEmptyLine();

/* Random.hex() */
// 随机生成一个有吸引力的颜色，格式为 '#RRGGBB'，与 color 相同
logTitle('Random.hex()');
logRandomExec(Random.hex);
logEmptyLine();

/* Random.rgb() */
// 随机生成一个有吸引力的颜色，格式为 'rgb(r, g, b)'
logTitle('Random.rgb()');
logRandomExec(Random.rgb);
logEmptyLine();

/* Random.rgba() */
// 随机生成一个有吸引力的颜色，格式为 'rgba(r, g, b, a)'
logTitle('Random.rgba()');
logRandomExec(Random.rgba);
logEmptyLine();

/* Random.hsl() */
// 随机生成一个有吸引力的颜色，格式为 'hsl(h, s, l)'
logTitle('Random.hsl()');
logRandomExec(Random.hsl);
