const path = require('path');
const babelConfig = require('./babel.config')(false);

module.exports = {
  resolve: {
    modules: ['node_modules', path.join(__dirname, '../node_modules')],
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: babelConfig,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: babelConfig,
          },
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
            }
          }
        ]
      },
    ]
  }
};