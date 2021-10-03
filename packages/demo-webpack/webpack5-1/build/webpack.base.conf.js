const webpack = require('webpack');
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
    experiments: {
        asyncWebAssembly: true,
        topLevelAwait: true,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource',
                generator: {
                    // [ext]前面自带"."
                    filename: 'assets/[hash:8].[name][ext]',
                },
            },
            {
                test: /\.wasm$/,
                type: 'webassembly/async',
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            /* cacheGroups: {
                aaa: {
                    name: `chunk-aaa`,
                    test: /[\\/]node_modules[\\/]/,
                    priority: 1000,
                    chunks: 'initial',
                    minChunks: 1,
                    minSize: 0,
                    maxSize: 0,
                },
            } */
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 生成后的文件名
            template: path.resolve(__dirname, '..', 'index.html'), // 根据此模版生成 HTML 文件
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ]
}

