import fs from 'fs-extra';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import image from '@rollup/plugin-image';
// import multi from '@rollup/plugin-multi-entry';
// import multiInput from 'rollup-plugin-multi-input';
import { DEFAULT_EXTENSIONS } from '@babel/core';

function isDir(dir) {
    return fs.lstatSync(dir).isDirectory();
}

const packages = {};
const dir = path.join(__dirname, './src');
const files = fs.readdirSync(dir);
files.forEach(file => {
    const absolutePath = path.join(dir, file);

    if (isDir(absolutePath)) {
        packages[file] = `src/${file}/index.tsx`;
    }
});

export default {
    input: packages,
    output: {
        dir: 'lib',
        chunkFileNames: 'shared/[name].js',
        entryFileNames: '[name]/index.js',
        format: 'cjs',
    },
    // preserveModules: true,
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