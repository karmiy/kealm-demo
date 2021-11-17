import { createApp } from 'vue';
import '@/assets/styles/index.scss';
import router from './router';
import { elementUI } from './element-ui';
import store from './store';
import App from './App.vue';

createApp(App)
    .use(router)
    .use(store)
    .use(elementUI, {
        size: 'mini',
    })
    .mount('#app');
