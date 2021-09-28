import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'demo-dumi',
  favicon: 'https://static.seeyouyima.com/assets/favicon.ico',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  styles: ['a { text-decoration: none; }'],
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  history: { type: process.env.NODE_ENV === 'development' ? 'browser' : 'hash' },
  plugins: ['./plugin.ts'],
  resolve: {
    includes: ['docs', 'src']
  }
  // more config: https://d.umijs.org/config
});
