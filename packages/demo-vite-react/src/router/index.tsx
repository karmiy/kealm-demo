import React from 'react';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import { Next, RouteConfig, RouteNav } from '@shared/components/router';
import { asyncWrapper } from '@shared/utils/base';
import { getAutoStatus, toLogin } from '@shared/utils/business';
import { dispatch, getState } from '@store/useLoginInfoStore';
import DemoARoute from './demo-a';
import DemoBRoute from './demo-b';

const routes: RouteConfig[] = [
    {
        path: '/',
        exact: true,
        render: () => <Redirect to='/demo-a' />,
    },
    ...DemoARoute,
    ...DemoBRoute,
];

export default routes;

export const beforeEach = async (to: RouteNav, from: RouteNav, next: Next) => {
    // 同路由不同参数跳转，不校验（会话页之间切换）
    if (to?.path === from?.path) return next();

    // 是否需要鉴权
    const isAuth = to?.meta?.isAuth ?? false;

    // -------------------- 不需要鉴权 --------------------
    if (!isAuth) return next();

    // -------------------- 需要鉴权 --------------------
    // 已经有全局状态，过掉
    const globalLoginInfoState = getState();
    if (globalLoginInfoState && globalLoginInfoState.authentication_token) return next();

    const toLoginWithToast = (info?: string) => {
        // message.error('登录过期，请重新登录');
        info && message.error(info);
        setTimeout(toLogin, 500);
    };

    // 获取登录信息
    const loginInfo = await dispatch('getLoginInfo');

    // 没登录授权 token，跳登录页
    if (!loginInfo.authentication_token) {
        toLogin();
        return;
    }

    const [data, err] = await asyncWrapper(getAutoStatus());
    if (err || !data || data.code !== 0) {
        toLoginWithToast('您尚未注册');
        // toLoginWithToast(data?.message);
        return;
    }

    return next();
};
