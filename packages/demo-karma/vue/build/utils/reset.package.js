const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../dist/package.json');
// 修改待发布的package.json
fs.readFile(filePath, (err, data) => {
    if(err) {
        console.log('load failed package.json', err);
        return;
    }
    const config = JSON.parse(data.toString());
    // 删除devDependencies
    delete config['devDependencies'];
    // 删除dependencies中的vue、vue-router
    delete config['dependencies']['vue'];
    delete config['dependencies']['vue-router'];
    fs.writeFile(filePath, JSON.stringify(config, null ,4), err => {
        if(err) {
            console.log('write failed package.json', err);
        }
    })
})