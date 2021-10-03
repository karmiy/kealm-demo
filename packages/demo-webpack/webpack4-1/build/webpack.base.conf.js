const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: ['./index.js'],
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
    },
    resolve: {
        extensions: ['.js', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.(t|j)s(x?)$/, // 使用正则来匹配 js 文件
                exclude: /node_modules/, // 排除依赖包文件夹
                loader: 'babel-loader',
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 生成后的文件名
            template: path.resolve(__dirname, '..', 'index.html'), // 根据此模版生成 HTML 文件
        }),
    ]
}

