<template>
    <div class="operate-panel">
        <!-- <Compass v-if="showCompassBtn" /> -->
        <div class="map-transform" @click="onTransform()" title="2/3D切换">
            <span class="text">切换</span>
            <span>{{ mapViewType === '2D' ? '3D' : '2D' }}</span>
        </div>
        <div class="map-locate">
            <svg-icon name="location" class="iconfont" @click="onLocate()" title="定位" />
        </div>
        <div class="map-zoom">
            <svg-icon name="fangda" class="iconfont" :class="{ 'is-disabled': coorInfo.scale <= minScale }" title="放大" @click="onZoomIn()" />
            <svg-icon name="suoxiao" class="iconfont" :class="{ 'is-disabled': coorInfo.scale >= maxScale }" title="缩小" @click="onZoomOut()" />
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { inject } from 'vue'
    import { dispatchMapEvent } from '@/common/index'
    import { getCoorInfo, getMapViewType } from '@/utils/injectionKey'
    const mapViewType = inject(getMapViewType)!
    // 坐标信息
    const coorInfo = inject(getCoorInfo)!

    const maxScale = 30000
    const minScale = 1500
    const onTransform = () => {
        const viewType = mapViewType.value === '3D' ? '2D' : '3D'
        console.log(`点击了2/3D切换按钮，即将转换至${viewType}视图`)
        dispatchMapEvent('onTransformView', viewType)
    }
    const onLocate = () => {
        dispatchMapEvent('onLocation', null)
    }
    const onZoomIn = () => {
        dispatchMapEvent('onZoomIn', null)
    }
    const onZoomOut = () => {
        dispatchMapEvent('onZoomOut', null)
    }
</script>
<style lang="less" scoped>
    .operate-panel {
        position: absolute;
        bottom: 10px;
        right: 8px;

        .iconfont {
            font-size: 24px;
        }

        .map {
            &-transform,
            &-locate,
            &-zoom,
            &-bookmark {
                margin-top: 8px;
                width: 36px;
                margin-left: 8px;
                background: #fff;
                border-radius: 3px;
                box-shadow: 0 1px 2px #0003;
            }

            &-transform {
                font-weight: bold;

                .text {
                    font-size: 12px;
                }
            }

            &-transform,
            &-locate,
            &-bookmark {
                padding: 5px;
                text-align: center;
                cursor: pointer;
            }

            &-zoom {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 4px 6px;
                font-size: 26px;
                .iconfont {
                    padding: 2px 0;
                    cursor: pointer;

                    &.is-disabled {
                        cursor: not-allowed;
                        color: #c7c7c7;
                    }
                }

                .icon-suoxiao {
                    border-top: 1px dashed #eee;
                }
            }
        }
    }
</style>
