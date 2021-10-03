const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const hasSourceMap = process.argv.includes('--source-map');

module.exports = merge(baseConfig, {
    mode: "production",
    devtool: hasSourceMap ? 'cheap-module-source-map' : false, // production 调试
    output: {
        publicPath: './', // CDN 路径
        filename: '[name]-[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/, // 针对 .css 后缀的文件设置 loader
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    }, 
                    'css-loader'
                ]
            },
        ]
    },
    plugins: [
        /* 分离 CSS */
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash:5].min.css',
            chunkFilename: '[id]-[contenthash:5].min.css'
        }),
    ].filter(Boolean),
})
