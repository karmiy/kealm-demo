const isDev = process.env.NODE_ENV === 'dev';

module.exports = {
    title: 'This is Title',
    description: 'Just playing around',
    base: isDev ? '/' : '/vuepress-karmiy-0.0.1/',
    themeConfig: {
        sidebar: [
            {
                title: 'General 通用',
                collapsable: false,
                sidebarDepth: 3,
                children: [
                    '/react-native/general/button'
                ]
            }
        ],
        /* sidebar: [
            {
                title: 'Group 1',   // 必要的
                // path: '/a/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    {
                        title: 'subGroup in Group 1', // ！！！题主你要的表现形式
                        collapsable: false
                    },
                    '/a/',
                    '/a/one',
                    '/a/two',
                ]
            }
        ], */
        nav: [
            { text: 'React Native', link: '/react-native/general/button' },
        ],
        /* sidebar: [
            {
                title: 'Home 首页',   // 必要的
                path: '/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            },
            {
                title: 'Guide 导航',
                path: '/guide/',
            },
        ] */
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