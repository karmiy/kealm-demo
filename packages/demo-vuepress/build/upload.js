const fs = require('fs');
const fsex = require('fs-extra');
const cp = require('child_process');
const { promisify } = require('util'); // 转 promise

const exec = promisify(cp.exec);
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

/* 执行命令 */
const call = cmd => {
    console.log(`exec: ${cmd}`);
    return exec(cmd);
};

/* 上传资源 */
async function uploadAssets() {
    await call(`ossutil cp -r ./docs/.vuepress/dist oss://front-static/vuepress-karmiy-0.0.1 --update`);
}

/* 构建 */
async function release() {
    await uploadAssets();
}

release().catch(err => {
    console.log('err');
    console.log(err);
});