<template>
    <div id='demo'>
        
    </div>
</template>

<script>
export default {
    name: 'Demo',
}
</script>

<style lang='scss'>
    // stylelint ./**/*.{html,vue} --custom-syntax postcss-html
    #task {
        height: 100%
    }

    .fade-enter-active{
        animation: fadeIn 1s both;
    }

    @keyframes fadeIn{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
</style>
