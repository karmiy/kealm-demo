const isDev = process.env.NODE_ENV === 'dev';

module.exports = {
    title: 'This is Title',
    description: 'Just playing around',
    base: isDev ? '/' : '/vuepress-karmiy-0.0.1/',
    themeConfig: {
        /* nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
        ], */
        sidebar: [
            {
                title: 'Home 首页',   // 必要的
                path: '/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            },
            {
                title: 'Guide 导航',
                path: '/guide/',
            },
        ]
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@assets': '../assets'
            }
        },
        output: {
            publicPath: isDev ? '/' : 'https://static.seeyouyima.com/vuepress-karmiy-0.0.1/',
        },
    },
    markdown: {
        // lineNumbers: true, // 代码块是否要行号
    }
}