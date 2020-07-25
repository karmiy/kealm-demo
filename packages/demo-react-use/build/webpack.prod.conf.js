const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseConfig, {
    mode: "production",
    devtool: 'cheap-module-source-map', // production 调试
    output: {
        publicPath: `./`, // CDN 路径
        filename: '[name]-[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        }
                    },
                    'postcss-loader',
                    'resolve-url-loader',
                    'sass-loader?sourceMap=true'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [
        /* 分离 CSS */
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash:5].min.css',
            chunkFilename: '[id]-[contenthash:5].min.css'
        }),
        /* 压缩 CSS */
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
            canPrint: true
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
    ],
})
