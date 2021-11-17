import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store, { LoginInfo } from '@store';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/login/index.vue'),
    },
];

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory('/demos'),
    routes,
});

/* router.addRoute({
    path: '/:catchAll(.*)', // 匹配所有，前面都没匹配到的通用情况
    component: () => import('@/views/error.vue'),
}); */

// router.removeRoute('About');

router.beforeEach(async (to, from, next) => {
    // 处理登录页都要校验权限
    if (to.name === 'Login') return next();
    const loginInfo: LoginInfo = await store.dispatch('user/getLoginInfo');

    if (!loginInfo.authenticationToken) {
        return next('/login');
    }

    return next();
});

export default router;
