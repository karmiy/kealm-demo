import { Dispatch } from 'dva';
import { History } from 'umi';
import { sleep } from '@/utils/base';

export interface IndexModelState {
    name: string;
}

const IndexModel = {
    namespace: 'index',

    state: {
        name: 'karmiy',
    },
    // reducer 是 action 的处理器，处理同步操作
    reducers: {
        update(state: IndexModelState, action: { type: string; payload: string }) {
            return {
                ...state,
                name: action.payload,
            };
        },
        // 启用 immer 之后
        // update(state, action) {
        //   state.name = action.payload;
        // },
    },
    // Generator 函数，处理异步操作
    effects: {
        *slowUpdateName(
            { payload }: { payload: string },
            { call, put }: { call: Function; put: Function },
        ) {
            // call 执行异步函数，比如请求
            yield call(sleep, 1000);
            // put 触发一个action，类似于 dispatch（type 可以是 reducer 也可以是 其他 effect）
            yield put({
                type: 'update',
                payload,
            });
        },
    },
    subscriptions: {
        // 名字随便取
        // 订阅行为，可以在里面做任意行为，如路由变化后更新 store
        setup({ dispatch, history }: { dispatch: Dispatch; history: History }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/') {
                    dispatch({
                        type: 'update',
                        payload: 'index',
                    });
                }
            });
        },
    },
};

export default IndexModel;
