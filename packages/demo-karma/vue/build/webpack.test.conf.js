const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');

const webpackConfig = merge(baseConfig(true), {
    devtool: 'inline-source-map',
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            src: path.resolve(__dirname, '../src'),
            components: path.resolve(__dirname, '../src/components')
        }
    },  
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            publicPath: './'
                        }
                    }
                ]
            },
            {
                test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                  limit: 10000,
                  name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.svg(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        ]
    }
});

// no need for app entry during tests
delete webpackConfig.entry;
delete webpackConfig.output;

module.exports = webpackConfig;