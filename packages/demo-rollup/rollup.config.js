import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
    input: './src/main.js',
    output: {
        file: 'dist/bundle.js',
        // name: 'myBundle',
        // format: 'umd',
        format: 'cjs',
        banner: '/* my-library version ' + '1.0.0' + ' */',
        footer: '/* follow me on Twitter! @rich_harris */'
    },
    plugins: [
        commonjs(), 
        babel({ babelHelpers: 'bundled' }), 
        json(), 
        resolve()
    ],
    external: ['lodash-es'],
};