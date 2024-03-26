<template>
    <div class="utils-panel">
        <div class="utils-panel-wrapper">
            <!-- 常用工具列表 -->
            <div class="util-list-wrapper">
                <div class="util-list">
                    <!-- 自定义常用工具 -->
                    <template v-if="commonUtils.length">
                        <div v-for="(item, index) in commonUtils" :key="'custom-util' + index" :class="setClassStyles(item)" @click="onClickUtil(item, item.eventSuffix, item.panelID)">
                            <svg-icon class="util-list-item__icon iconfont" :name="item.svgName" />
                            <span class="util-list-item__name">{{ item.utilName }}</span>
                        </div>
                    </template>

                    <div class="util-list-item" @click="onClearScreen()">
                        <svg-icon name="clearscreen" class="util-list-item__icon iconfont" />
                        <span class="util-list-item__name">清屏</span>
                    </div>

                    <!-- 工具箱 -->
                    <!-- <MoreUtils
                        :map-view-type="mapViewType"
                        :highlight-panels="highlightPanels"
                        :util-list="utilList"
                        @click-util="onClickUtilBoxUtils"
                        @click-custom="setCustomUtilDialogVisible(true)"
                    >
                        <div class="util-list-item">
                            <i class="util-list-item__icon iconfont icon-gongjuxiang"></i>
                            <span class="util-list-item__name">工具箱</span>
                        </div>
                    </MoreUtils> -->
                </div>
            </div>

            <!-- 工具面板 -->
            <template v-if="panelList.length">
                <template v-for="(item, index) in panelList" :key="'util-panel' + index">
                    <template v-if="item.utilActive">
                        <component :is="item.component" :panel="item" :index="index" :map-view-type="mapViewType" @close="onClosePanel" />
                    </template>
                </template>
            </template>

            <!-- 自定义常用工具栏 -->
            <!-- <CustomUtilDialog :visible="customUtilDialog.visible" :util-list="utilList" @close="setCustomUtilDialogVisible(false)" @save="onSaveCustomUtils" /> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, inject, onMounted, shallowRef, nextTick } from 'vue'
    import { getMapViewType } from '@/utils/injectionKey'
    import { ICommonUtilsState } from './util'
    import { dispatchMapEvent } from '@/common/index'
    import MeasurePanel from './Utils/MeasurePanel/index.vue'
    import DrawPanel from './Utils/DrawPanel/index.vue'
    // 固定常用工具
    const commonUtils = ref<ICommonUtilsState[]>([
        {
            component: shallowRef(MeasurePanel),
            svgName: 'measure',
            utilName: '量算',
            utilActive: false,
            eventSuffix: 'Measure',
            panelID: 'measurePanel',
            enable2D: true,
            enable3D: true
        },
        {
            component: shallowRef(DrawPanel),
            svgName: 'draw',
            utilName: '绘制',
            utilActive: false,
            eventSuffix: 'Draw',
            panelID: 'drawPanel',
            enable2D: true,
            enable3D: true
        }
    ])
    const mapViewType = inject(getMapViewType)
    // 工具面板
    const panelList = ref<ICommonUtilsState[]>([])
    // 选中的工具
    const currentPanel = ref<ICommonUtilsState[]>([])
    // 设置class样式
    const setClassStyles = (item: ICommonUtilsState) => {
        //
        let classStyles = 'util-list-item'
        const currentClass = currentPanel.value.find((ele: ICommonUtilsState) => ele.component === item.component)

        if (currentClass) {
            classStyles += ' is-active'
        }
        return classStyles
    }
    // 工具栏点击事件
    const onClickUtil = (item: ICommonUtilsState, eventSuffix: string, panelID: string | null) => {
        //
        if (currentPanel.value.length) {
            const panel = currentPanel.value.findIndex(ele => ele.component === item.component)
            panel >= 0 ? currentPanel.value.splice(panel, 1) : currentPanel.value.push(item)
        } else {
            currentPanel.value.push(item)
        }
        const index = panelList.value.findIndex(ele => ele.component === item.component)
        panelList.value[index].utilActive = !panelList.value[index].utilActive
        handleUtilPanelEvent(panelList.value[index].utilActive, eventSuffix, panelID!)
    }
    const handleUtilPanelEvent = (utilActive: boolean, eventSuffix: string, panelID: string) => {
        //
        console.log(utilActive, eventSuffix, panelID)
        if (eventSuffix === 'Draw') {
            nextTick(() => {
                const eventName = utilActive ? `onOpen${eventSuffix}` : `onRemove${eventSuffix}`
                dispatchMapEvent(eventName, {
                    panelID,
                    mapViewType: mapViewType
                })
            })
        }
    }
    // 清屏
    const onClearScreen = () => {
        //
    }
    // 关闭面板
    const onClosePanel = (data: any) => {
        panelList.value[data.index].utilActive = data.active
        currentPanel.value = currentPanel.value.filter(ele => ele.component !== data.panel.component)
    }
    onMounted(() => {
        panelList.value = [...commonUtils.value]
    })
</script>
<style lang="less" scoped>
    .utils-panel {
        position: absolute;
        top: 15px;
        right: 8px;

        &.show-header {
            right: 15px;
        }

        &-wrapper {
            position: relative;
        }
    }

    .util-list {
        display: flex;

        &-wrapper {
            background: #fff;
            border-radius: 4px;
            box-shadow: 0 1px 2px #0003;
            overflow: hidden;
        }

        &-item {
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 10px;
            position: relative;

            &:last-child {
                &::after {
                    border-right: none;
                }
            }
            .iconfont {
                font-size: 14px;
            }
            &::after {
                content: '';
                position: absolute;
                right: 0;
                height: 45%;
                border-right: 1px dashed #dbdee2;
            }

            &:hover {
                color: var(--el-color-primary);
                .iconfont {
                    color: var(--el-color-primary) !important;
                }
            }

            &.is-active {
                color: var(--el-color-primary);
                .iconfont {
                    color: var(--el-color-primary) !important;
                }
            }

            &.is-disabled {
                cursor: not-allowed;
                color: #c7c7c7;
            }

            &__icon {
                font-size: 18px;
                margin-right: 3px;
            }

            &__name {
                font-size: 12px;
                text-align: center;
            }
        }
    }
</style>
