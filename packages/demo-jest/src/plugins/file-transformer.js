// transform 文件需要是 .js
const path = require('path');

module.exports = {
    process(src, fileName, config, options) {
        return 'module.exports = ' + JSON.stringify(path.basename(fileName)) + ';';
    },
};