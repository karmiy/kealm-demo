const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');

module.exports = merge(baseConfig, {
    mode: "development",
    // devtool: 'cheap-module-eval-source-map', // 开启development调试
    devtool: 'eval-cheap-module-source-map', // 开启development调试
    output: {
        path: path.resolve(__dirname, '..', 'dev'),
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    devServer: {
        port: 5000, // 本地服务器端口号
        // useLocalIp: true, // ×
        host: '0.0.0.0',
        hot: true, // 热重载
        // overlay: true, // ×
        historyApiFallback: true,
        // clientLogLevel: 'silent', // ×
        // progress: true, // ×
        client: {
            overlay: true,
            progress: true,
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/, // 针对 .css 后缀的文件设置 loader
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    cache: {
        type: 'filesystem',
        // 可选配置
        buildDependencies: {
            config: [__filename],  // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
        },
        name: 'development-cache',  // 配置以name为隔离，创建不同的缓存文件，如生成PC或mobile不同的配置缓存
    },
    /* plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热部署模块
        new webpack.NamedModulesPlugin(),
    ] */
})
