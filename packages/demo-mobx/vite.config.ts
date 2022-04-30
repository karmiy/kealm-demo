import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import styleImport from 'vite-plugin-style-import';
const { resolve } = require('path');

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/' : './',
    plugins: [
        reactRefresh(),
        styleImport({
            libs: [
                {
                    libraryName: 'antd',
                    esModule: true,
                    resolveStyle: name => {
                        return `antd/es/${name}/style/index.css`;
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
            '@views': resolve(__dirname, 'src/views'),
            '@router': resolve(__dirname, 'src/router'),
            '@shared': resolve(__dirname, 'src/shared'),
            '@store': resolve(__dirname, 'src/store'),
            '@utils': resolve(__dirname, 'src/utils'),
        },
    },
    server: {
        host: '0.0.0.0',
        proxy: {
            '/xxx-api': {
                target: 'https://xxxxx.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/xxx-api/, ''),
            },
        },
    },
});
