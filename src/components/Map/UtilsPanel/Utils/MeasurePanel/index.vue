<template>
    <UtilPanel :title="props.panel.utilName" :panelId="props.panel.panelID" @on-click-close="onClose">
        <div class="measure-panel-box">
            <button
                class="action-button esri-icon-measure-line mr-10"
                :class="{ 'is-active': activeButton === 'distance' }"
                id="distanceButton"
                type="button"
                title="测量两点之间的距离"
                @click="onMeasureDistance(mapViewType === '2D' ? 'onMeasureDistance2D' : 'onMeasureDistance3D')"
            ></button>
            <button
                class="action-button esri-icon-measure-area"
                :class="{ 'is-active': activeButton === 'area' }"
                id="areaButton"
                type="button"
                title="计算面积"
                @click="onMeasureArea(mapViewType === '2D' ? 'onMeasureArea2D' : 'onMeasureArea3D')"
            ></button>
        </div>
    </UtilPanel>
</template>
<script lang="ts" setup>
    import { ref, inject } from 'vue'
    import { ICommonUtilsState } from '../../util'
    import UtilPanel from '../UtilPanel.vue'
    import { getMapViewType } from '@/utils/injectionKey'
    import { dispatchMapEvent } from '@/common/index'
    interface Props {
        panel: ICommonUtilsState
        index: number
    }
    // 当前按钮的类型
    const activeButton = ref()
    // 当前地图的类型
    const mapViewType = inject(getMapViewType)!
    const props = defineProps<Props>()
    const panelID = 'measurePanel'
    /**
     * 测量两点的距离
     * @param eventName 事件名称
     */
    const onMeasureDistance = (eventName: string) => {
        activeButton.value = activeButton.value === 'distance' ? '' : 'distance'
        console.log(eventName, { panelID, activeButton: activeButton.value })
        dispatchMapEvent(eventName, { panelID, activeButton: activeButton.value })
    }
    /**
     * 测量面积
     * @param eventName 事件名称
     */
    const onMeasureArea = (eventName: string) => {
        activeButton.value = activeButton.value === 'area' ? '' : 'area'
        console.log(eventName, { panelID, activeButton: activeButton.value })
        dispatchMapEvent(eventName, { panelID, activeButton: activeButton.value })
    }
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
<style lang="less" scoped>
    .measure-panel-box {
        width: 300px;
    }
</style>
