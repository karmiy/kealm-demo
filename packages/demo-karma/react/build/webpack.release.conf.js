const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base.conf');
const packageConfig = require('../package.json');
const dependencies = packageConfig.dependencies;
const name = packageConfig.name, version = packageConfig.version;

// - 转驼峰
const camelize = (str) => {
  return str.replace(/-(\w)/g, (_, c) =>  c ? c.toUpperCase() : '').replace(/^[a-z]/, c => c.toLocaleUpperCase())
}
// 排除的包
const externals = {};
Object.keys(dependencies).forEach(item => {
  externals[item] = {
    root: camelize(item),
    commonjs2: item,
    commonjs: item,
    amd: item,
  }
});
//banner
const banner =
  ` ${name} v${version}\n` +
  ` (c) 2019-${new Date().getFullYear()} wangsu\n` +
  ` Released under the ISC License.\n` +
  ''

module.exports = merge(baseConfig, {
  mode: 'none',
  entry: {
    main: path.resolve(__dirname, '../src/components/public_api.tsx')
  },
  output: {
    path: path.resolve(__dirname, '../dist/lib'),
    publicPath: '/dist/lib/',
    filename: 'salus-component-react.js',
    library: 'salus-component-react',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals,
  plugins: [
    new webpack.BannerPlugin({banner}),
    new CopyWebpackPlugin([
      { from: path.join(__dirname,'../package.json'), to:  path.join(__dirname,'../dist/package.json') },
      { from: path.join(__dirname,'../README.md'), to:  path.join(__dirname,'../dist/README.md') }
    ])
  ]
});