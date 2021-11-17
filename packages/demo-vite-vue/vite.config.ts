import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import styleImport from 'vite-plugin-style-import';
const { resolve } = require('path');

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/' : './',
    plugins: [
        vue(),
        styleImport({
            libs: [
                {
                    libraryName: 'element-plus',
                    resolveStyle: name => {
                        name = name.slice(3);
                        return `element-plus/packages/theme-chalk/src/${name}.scss`;
                    },
                    resolveComponent: name => {
                        return `element-plus/lib/${name}`;
                    },
                },
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@api': resolve(__dirname, 'src/api'),
            '@assets': resolve(__dirname, 'src/assets'),
            '@components': resolve(__dirname, 'src/components'),
            '@hooks': resolve(__dirname, 'src/hooks'),
            '@pages': resolve(__dirname, 'src/pages'),
            '@store': resolve(__dirname, 'src/store'),
            '@utils': resolve(__dirname, 'src/utils'),
        },
    },
    server: {
        proxy: {
            '/diagnose-api': {
                // target: 'https://test-myyq.seeyouyima.com/diagnose-api',
                target: 'http://test-api.meiyoudoctor.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/diagnose-api/, ''),
            },
            '/user-api': {
                target: 'http://test-users.seeyouyima.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/user-api/, ''),
            },
        },
    },
});
