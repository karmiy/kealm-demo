// 路由更多配置 https://pro.ant.design/zh-CN/docs/new-page#%E5%B0%86%E6%96%87%E4%BB%B6%E5%8A%A0%E5%85%A5%E8%8F%9C%E5%8D%95%E5%92%8C%E8%B7%AF%E7%94%B1
export const routes = [
    {
        path: '/demo-product',
        component: '@/pages/demo-product',
        // name: 'demo-product',
        title: '产品页',
        wrappers: ['@/wrappers/auth'],
        access: 'canRead', // 只有 access.ts 里的该 key 通过才能打开页面，否则会用 Layout 插件内置的错误页面
        routes: [
            {
                path: '/demo-product/detail/:id',
                component: '@/pages/detail',
            },
        ],
    },
    {
        path: '/login',
        component: '@/pages/login',
        title: '登录页',
        layout: false,
    },
    {
        path: '/welcome',
        name: '欢迎', // 左侧 menus 对应项的名称
        component: '@/pages/welcome',
        icon: 'smile',
        title: '欢迎页',
        access: 'canRead',
        locale: false, // 不走国际化
    },
    {
        path: '/charts',
        name: '图表',
        icon: 'barChart',
        component: '@/pages/charts',
        locale: false,
        routes: [
            {
                path: '/charts/line',
                name: '折线图',
                icon: 'smile',
                component: '@/pages/charts/line',
                locale: false,
            },
            {
                path: '/charts/column',
                name: '柱状图',
                icon: 'smile',
                component: '@/pages/charts/column',
                locale: false,
            },
            {
                component: '@/pages/404',
            },
        ],
    },
    {
        path: '/intl',
        name: 'intl', // 对应国际化的 'menu.intl'
        component: '@/pages/intl',
        icon: 'global',
        title: '国际化页',
    },
    {
        path: '/admin',
        name: '管理页', // 左侧 menus 对应项的名称
        component: '@/pages/admin',
        icon: 'crown',
        title: '管理页',
        access: 'canRead', // 只有 access.ts 里的该 key 通过才能打开页面，否则会用 Layout 插件内置的错误页面
        locale: false, // 不走国际化
    },
    {
        path: '/model',
        name: '状态管理', // 左侧 menus 对应项的名称
        component: '@/pages/model',
        icon: 'sync',
        title: '状态管理',
        locale: false, // 不走国际化
    },
    {
        path: '/',
        component: '@/layouts/index',
        redirect: '/welcome',
    },
    { component: '@/pages/404' },
];

/* export const routes = [
    {
        path: '/',
        component: '@/layouts/index',
        routes: _routes,
    },
]; */
