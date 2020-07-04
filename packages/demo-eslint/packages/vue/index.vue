<template>
    <div class='wrap'>
        <p />
        <div>123</div>
    </div>
</template>

<script>
export default {
    name: 'Wrap', // wrap
    /* components: {
        EEchart
    }, */
    data() {
        return {
            id: 13,
            name: '2',
        };
    },
    computed: {},
    mounted() {
        this.init();
    },
    methods: {
        init() {
            console.log(12);
        },
    },
};
</script>

<style lang="scss" scoped>
.wrap {
    position: relative;
    .content {
        width: 200px;
    }
}
</style>
