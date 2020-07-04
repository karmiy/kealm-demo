const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = (isDev = true) => {
    const outputPath = isDev ? 'lib' : 'dist/lib';

    return {
        mode: isDev ? 'development' : 'production',
        context: path.resolve(__dirname, '../'),
        entry: "./src/public_api.js",
        output: {
            path: resolve(outputPath),
            publicPath: resolve(outputPath),
            filename: 'kmy-vue-components.umd.js',
            library: 'kmy-vue-components',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        resolve: {
            extensions: ['.js', '.jsx', '.vue', '.json'],
            modules: ['node_modules']
        },
        module: {
            rules: [
                {
                    test: /\.(jsx|js)$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
            ]
        }
    }
}



