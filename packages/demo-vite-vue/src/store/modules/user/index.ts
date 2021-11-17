import { Module } from 'vuex';
import { GlobalState } from '../../types';
import { LoginInfo, UserState } from './types';

/* 默认的登录信息 */
const DEFAULT_LOGIN_INFO: LoginInfo = {
    authenticationToken: 'XMD 7hxxxxxxx',
    userId: 10,
    userName: 'Karmiy',
};

const state: UserState = {
    loginInfo: DEFAULT_LOGIN_INFO,
};

export const userModule: Module<UserState, GlobalState> = {
    namespaced: true,
    state,
    mutations: {
        SET_LOGIN_INFO_MUTATION(state, info: LoginInfo) {
            state.loginInfo = info;
        },
    },
    actions: {
        setLoginInfo({ commit }, info: LoginInfo) {
            window.localStorage.setItem('km_login_info', JSON.stringify(info));
            commit('SET_LOGIN_INFO_MUTATION', info);
        },
        getLoginInfo({ commit, state }) {
            if (state.loginInfo.authenticationToken) return state.loginInfo;

            const storageLoginInfo = window.localStorage.getItem('km_login_info');
            // 无
            if (!storageLoginInfo) return DEFAULT_LOGIN_INFO;

            const loginInfo = JSON.parse(storageLoginInfo) as LoginInfo;

            commit('SET_LOGIN_INFO_MUTATION', loginInfo);
            return loginInfo;
        },
        removeLoginInfo({ commit }) {
            window.localStorage.removeItem('km_login_info');
            commit('SET_LOGIN_INFO_MUTATION', DEFAULT_LOGIN_INFO);
        },
    },
};

export * from './types';
