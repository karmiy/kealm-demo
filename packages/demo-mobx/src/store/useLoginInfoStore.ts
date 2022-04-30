import { createStore } from '@shared/hooks';
import { LoginInfo } from '@shared/types';
import { toLogin } from '@shared/utils/business';

const MOCK_LOGIN_INFO_1 = {
    authentication_token: '7.hxxxxxxxxxxxxxxxxxxxxxxxxxx',
};

/* 默认的登录信息 */
const DEFAULT_LOGIN_INFO: LoginInfo = Object.assign(
    {
        authentication_token: '',
        myid: '',
        platform: '',
        user: {
            avatar: '',
            id: 0,
            mode: 0,
            screen_name: '',
        },
        user_id: 0,
    },
    // 本地可 mock 数据
    process.env.NODE_ENV === 'development' ? MOCK_LOGIN_INFO_1 : {},
);

/* 构造登录信息 hook */
export const [useLoginInfoStore, { getState, dispatch }] = createStore(
    'loginInfo',
    DEFAULT_LOGIN_INFO,
    {
        // 获取
        getLoginInfo({ state, commit }) {
            // 前置取 storage，可能存在场景：打开2个浏览器窗口，一边退出登录清了 storage，另一边也需要清除，不能拿全局状态的
            const storageLoginInfo = window.localStorage.getItem('my_login_info');
            if (!storageLoginInfo) {
                // storage 没有，清空全局状态
                commit(DEFAULT_LOGIN_INFO);
                return DEFAULT_LOGIN_INFO;
            }

            if (state.authentication_token) return state;

            const loginInfo = JSON.parse(storageLoginInfo) as LoginInfo;

            commit(loginInfo);
            return loginInfo;
        },
        // 登出
        loginOut() {
            window.localStorage.removeItem('my_login_info');
            toLogin();
        },
    },
);
