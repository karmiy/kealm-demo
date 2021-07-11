import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import styleImport from 'vite-plugin-style-import';
const { resolve } = require('path');

// https://vitejs.dev/config/
export default defineConfig({
    base:
        process.env.NODE_ENV === 'production'
            ? 'https://static.seeyouyima.com/www.meiyoudoctor.com/consultation/'
            : './',
    plugins: [reactRefresh()],
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
        },
    },
    server: {
        host: '0.0.0.0',
        proxy: {
            '/diagnose-api': {
                // target: 'https://test-myyq.seeyouyima.com/diagnose-api',
                target: 'https://test-diagnose.seeyouyima.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/diagnose-api/, ''),
            },
            '/im-api': {
                target: 'https://test-users.seeyouyima.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/im-api/, ''),
            },
        },
    },
});
