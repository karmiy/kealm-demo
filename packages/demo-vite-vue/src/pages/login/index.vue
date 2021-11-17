<template>
    <div class="km-login">
        <img class="logo" src="@assets/images/status-loading.gif" />
        <p>countdown: {{ codeOperateInfo.countdown }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { GlobalState } from '@store';

export default defineComponent({
    name: 'Login',
    setup() {
        const loginForm = reactive({
            phone: '',
            code: '',
        });
        const codeOperateInfo = reactive({
            countdown: 60, // 倒计时
        });

        /* ------------------------------ BLOCK: 登录 ------------------------------ */
        const store = useStore<GlobalState>();
        // store.dispatch('user/setLoginInfo', ...);
        const router = useRouter();
        // router.push('/layout/doctor-expand');
        const route = useRoute();
        // route.query.platform === 'physician'

        return {
            ...toRefs(loginForm),
            codeOperateInfo,
        };
    },
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
