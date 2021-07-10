import ejs from 'ejs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import prettier from 'prettier';

export default (config) => {
    const __dirname = fileURLToPath(import.meta.url); // 得到当前文件，即 xxxx/createIndexTemplate
    const templateCode = fs.readFileSync(
        path.resolve(__dirname, '../templates/index.ejs')
    );
    // ejs 模板里结尾要 -%>，不能 %>，因为这样生成的代码会自带一个空行 newline
    const code = ejs.render(templateCode.toString(), {
        middleware: config.middleware,
        port: config.port,
    });

    return prettier.format(code, { parser: 'babel' });
};