const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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
                    MiniCssExtractPlugin.loader, 
                    'css-loader'
                ]
            },
        ]
    },
    optimization: {
        minimizer: [
          // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
          `...`,
          new CssMinimizerPlugin(),
        ],
    },
    cache: {
        type: 'filesystem',
        // 可选配置
        buildDependencies: {
            config: [__filename],  // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
        },
        name: 'production-cache',  // 配置以name为隔离，创建不同的缓存文件，如生成PC或mobile不同的配置缓存
    },
    plugins: [
        /* 分离 CSS */
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash:5].min.css',
            chunkFilename: '[id]-[contenthash:5].min.css'
        }),
    ].filter(Boolean),
})
