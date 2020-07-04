<template>
    <a :class="className" :href="page" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <slot></slot>
    </a>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

enum STATUS {
    HOVERED = 'hovered',
    NORMAL = 'normal',
}

@Component
export default class Link extends Vue {
    className: STATUS = STATUS.NORMAL;

    @Prop({
        type: String,
        default: '#',
    })
    page!: string;

    onMouseEnter(): void {
        this.className = STATUS.HOVERED;
    }

    onMouseLeave(): void {
        this.className = STATUS.NORMAL;
    }
}
</script>
<style lang="scss" scoped>
a {
    text-decoration: none;
}
</style>