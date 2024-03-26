<template>
    <div :class="['map-info-panel', props.foldMapInfoPanel ? 'fold' : 'unfold']">
        <div class="map-info-panel__title">
            <div><span>地图信息</span></div>
            <svg-icon name="sjx" class="el-icon-caret-top" color="#535353" @click="setContentVisible(!props.foldMapInfoPanel)" />
        </div>
        <div v-if="!props.foldMapInfoPanel" class="map-info-panel__content">
            <div class="title">
                当前视图
                <span class="normal ml-10">
                    <el-tag size="small" type="success">{{ mapViewType }}视图</el-tag>
                </span>
            </div>
            <div class="title">鼠标位置</div>
            <span v-if="coorInfo.lon">经度：{{ coorInfo.lon }}</span>
            <span v-if="coorInfo.lat">，纬度：{{ coorInfo.lat }}</span>
            <br />
            <!-- <span v-if="coorInfo.locate">当前鼠标坐落：{{ coorInfo.locate }}</span> -->
            <div class="content">
                <template v-if="mapViewType === '3D'">
                    <div class="title">视图方位</div>
                    <div class="content">
                        <span v-if="coorInfo.tilt">视角倾斜：{{ coorInfo.tilt }}°</span>
                        <span v-if="coorInfo.heading">, 罗盘方位：{{ coorInfo.heading }}°</span>
                    </div>
                </template>
                <div class="title">
                    <span v-if="coorInfo.scale">
                        地图比例
                        <span class="normal">1:{{ coorInfo.scale }}</span>
                    </span>
                </div>
                <div class="content scale-content">
                    <el-button type="primary" size="default" @click="onLocateToCQ()">
                        <el-icon><Film /></el-icon>
                        <span>重庆全幅</span>
                    </el-button>
                    <el-button type="primary" size="default" @click="setScale(bestScale)">
                        <el-icon><FullScreen /></el-icon>
                        <span>最佳比例1:{{ bestScale }}</span>
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { defineEmits, inject, ref } from 'vue'
    import { getCoorInfo, getMapViewType } from '@/utils/injectionKey'
    import { dispatchMapEvent } from '@/common/index'
    import { FullScreen, Film } from '@element-plus/icons-vue'
    interface IMapInfoProps {
        foldMapInfoPanel: boolean
    }
    const props = defineProps<IMapInfoProps>()
    const mapViewType = inject(getMapViewType)
    const coorInfo = inject(getCoorInfo)!
    console.log(props, 'props')
    // 最佳比例
    const bestScale = ref(3000)
    const emit = defineEmits(['click-fold-panel', 'map-set-view-scale'])
    // 切换折叠面板
    const setContentVisible = (bool: boolean) => {
        emit('click-fold-panel', bool)
    }
    // 将地图缩放至重庆全图
    const onLocateToCQ = () => {
        //
        dispatchMapEvent('onLocateToExtent', {
            extent: {
                center: [106.605363, 29.720589],
                tilt: 0,
                heading: 0,
                zoom: 8
            },
            params: { duration: 3000, showMessage: true }
        })
    }
    const setScale = (scale: number) => {
        console.log(scale)
        emit('map-set-view-scale', { scale: Math.round(scale) })
    }
</script>

<style lang="less" scoped>
    .map-info-panel {
        position: absolute;
        // z-index: 10;
        top: 15px;
        left: 15px;
        background: #fff;
        border-radius: 4px;
        width: 290px;
        overflow: hidden;
        box-shadow: 0 1px 2px #0003;

        &.fold {
            width: 100px;

            .el-icon-caret-top {
                transition: 0.2s;
                transform-origin: center;
                transform: rotateZ(180deg);
            }
        }

        &__title {
            background: #eceef3;
            padding: 0 10px;
            height: 40px;
            line-height: 40px;
            font-weight: bold;
            color: #535353;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            font-size: 14px;

            .el-icon-caret-top {
                color: #535353;
                font-size: 14px;
                transition: 0.2s;
                transform-origin: center;
                transform: rotateZ(0deg);
            }
        }

        &__content {
            padding: 0 10px 10px 10px;
            font-size: 14px;

            .title {
                font-weight: bold;
                color: #666;
                margin: 10px 0;
                font-size: 14px;
            }

            .normal {
                font-weight: normal;
                color: #333;
            }
        }
    }

    .scale-content {
        display: flex;
        justify-content: space-around;
        :deep(.el-button--primary) {
            > span {
                display: flex;
                align-items: center;
            }
        }
    }
</style>
