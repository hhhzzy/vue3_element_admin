<template>
    <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
        <use :xlink:href="iconName" />
    </svg>
</template>
<script lang="ts" setup>
    import { computed } from 'vue'

    const props = defineProps({
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: '#000'
        }
    })
    console.log(props.name)
    const iconName = computed(() => `#icon-svg-${props.name}`)
    const svgClass = computed(() => {
        if (props.name) {
            return `svg-icon icon-svg-${props.name}`
        }
        return 'svg-icon'
    })
</script>
<style lang="less">
    .svg-icon {
        width: 1em;
        height: 1em;
        fill: currentColor;
        vertical-align: middle;
    }
</style>
