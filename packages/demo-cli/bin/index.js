#! /usr/bin/env node
// 上述注释示意执行这个脚本时，系统会调用 node 来执行
// package.json 配置 {'type': 'module'} 支持 esm 模块规范
import fs from 'fs';
import path from 'path';
import execa from 'execa';
import chalk from 'chalk';
import createIndexTemplate from './createIndexTemplate.js';
import createPackageTemplate from './createPackageTemplate.js';
import questions from './questions/index.js';
import { createConfig } from './config.js';

const answer = await questions();
const config = createConfig(answer);

function getRootPath() {
    // process.cwd() 为项目根文件夹，即 F:xxxxx\demo-cli
    return path.resolve(process.cwd(), config.packageName);
}

// 1. 创建项目文件夹
console.log(chalk.blue(`创建项目文件夹:${config.packageName}`));
fs.mkdirSync(getRootPath());

// 2. 创建 index.js
console.log(chalk.blue(`创建 index.js`));
fs.writeFileSync(`${getRootPath()}/index.js`, createIndexTemplate(config));

// 3. 创建 package.json
console.log(chalk.blue(`创建 package.json`));
fs.writeFileSync(
    `${getRootPath()}/package.json`,
    createPackageTemplate(config)
);

// 4. 安装依赖
console.log(chalk.blue(`安装依赖`));
/* execa('npm install', {
    cwd: getRootPath(),
    stdio: [2, 2, 2],
}); */