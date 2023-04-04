<template>
    <a v-if="isExternal(props.toPath)" :href="props.toPath" target="_blank">
        <slot></slot>
    </a>
    <router-link v-else :to="props.toPath">
        <slot></slot>
    </router-link>
</template>

<script lang="ts" setup>
    import { isExternal } from '@/utils/global'
    interface Props {
        toPath: string
    }
    const props = defineProps<Props>()
</script>
