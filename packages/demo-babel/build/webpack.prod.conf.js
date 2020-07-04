const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');

module.exports = merge(baseConfig, {
    mode: "production",
    devtool: 'cheap-module-source-map', // 开启production调试
    output: {
        publicPath: './', 
        filename: 'js/[name]-[contenthash].js',
    },
    optimization: {
        splitChunks: {
          chunks: "all",
        },
    },
})
