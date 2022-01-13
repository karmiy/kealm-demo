import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function getCurrentUser(options?: { [key: string]: any }) {
    return request<{
        data: ApiNS.User;
    }>('/api/currentUser', {
        method: 'GET',
        ...(options || {}),
    });
}

/** 登录接口 POST /api/login/account */
export async function login(body: ApiNS.LoginParams, options?: { [key: string]: any }) {
    return request<ApiNS.LoginResult>('/api/login/account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
    return request<Record<string, any>>('/api/login/outLogin', {
        method: 'POST',
        ...(options || {}),
    });
}
