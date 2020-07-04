const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const pkg = require('../package.json');
const version = pkg.version;
const name = pkg.name;
const CopyWebpackPlugin = require('copy-webpack-plugin');


/* 包说名 */
const banner =
    ` ${name} v${version}\n` +
    ` (c) 2019-${new Date().getFullYear()} karmiy\n` +
    ` Release under the ISC License.\n` +
    ''

/* 排除库 */
const externals = {};
Object.keys(pkg.dependencies).forEach(item => {
    externals[item] = item;
})

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = merge(baseConfig(false), {
    externals,
    plugins: [
        new webpack.BannerPlugin({banner}),
        new CopyWebpackPlugin([
            {
                from: resolve('package.json'), 
                to: resolve('dist/package.json')
            },
            {
                from: resolve('README.md'), 
                to: resolve('dist/README.md')
            },
            {
                from: resolve('../../style/dist/vue/salus.css'),
                to: resolve('dist/style/salus.css')
            },
            {
                from: resolve('../../style/dist/vue/salus.min.css'),
                to: resolve('dist/style/salus.min.css')
            },
            {
                from: resolve('../../style/dist/fonts'),
                to: resolve('dist/fonts')
            }
        ])
    ]
});
