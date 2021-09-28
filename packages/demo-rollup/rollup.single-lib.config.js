import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import image from '@rollup/plugin-image';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import pck from './package.json';

const createOutput = config => ({
    ...config,
    banner: '/* @meetyou/react-components version ' + pck.version + ' */',
    footer: '/* author: @karmiy */',
});

export default {
    input: './src/index.ts',
    output: [
        createOutput({
            file: 'lib/index.js',
            format: 'cjs',
        }),
        createOutput({
            file: 'lib/index.min.js',
            format: 'cjs',
            plugins: [terser()],
        }),
        createOutput({
            file: 'lib/index.esm.js',
            format: 'esm',
        }),
    ],
    plugins: [
        resolve(),
        typescript({
            tsconfig: path.resolve(__dirname, './tsconfig.json'),
        }),
        babel({
            extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
            babelHelpers: 'bundled',
        }),
        image(),
    ],
    external: ['react', 'react-dom', 'date-fns', 'react-transition-group', '@meetyou/react-hooks'],
};