export const routes = [
    {
        path: '/',
        name: 'index',
        component: '@/pages/index/index',
        title: '首页',
    },
    {
        path: '/product',
        component: '@/pages/product',
        name: 'product',
        title: '产品页',
        wrappers: ['@/wrappers/auth'],
        access: 'canRead', // 只有 access.ts 里的该 key 通过才能打开页面，否则会用 Layout 插件内置的错误页面
        routes: [
            {
                path: '/product/detail/:id',
                component: '@/pages/detail',
            },
        ],
    },
    { component: '@/pages/404' },
];
