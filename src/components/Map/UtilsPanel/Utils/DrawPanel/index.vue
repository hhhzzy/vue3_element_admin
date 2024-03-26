<template>
    <UtilPanel :title="props.panel.utilName" :panelId="props.panel.panelID" width="375px" @on-click-close="onClose" />
</template>
<script lang="ts" setup>
    import { ICommonUtilsState } from '../../util'
    import UtilPanel from '../UtilPanel.vue'
    interface Props {
        panel: ICommonUtilsState
        index: number
    }
    const props = defineProps<Props>()
    // 关闭工具面板
    const emit = defineEmits(['close'])
    const onClose = () => {
        emit('close', {
            panel: props.panel,
            index: props.index,
            active: false
        })
    }
</script>
