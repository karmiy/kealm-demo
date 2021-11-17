import { createStore } from 'vuex';
import { userModule } from './modules';
import { GlobalState } from './types';

const store = createStore<GlobalState>({
    mutations: {},
    actions: {},
    modules: {
        user: userModule,
    },
});

export * from './modules';
export * from './types';

export default store;
