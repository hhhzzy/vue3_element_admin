<template>
    <div class="util-panel" :style="{ width: props.width }">
        <div class="util-panel_header drag-move">
            <span>
                <span>{{ props.title }}</span>
            </span>
            <span>
                <el-icon class="el-icon-close" @click="onClickClose"><Close /></el-icon>
            </span>
        </div>
        <div class="util-panel_content" :id="props.panelId">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { defineEmits } from 'vue'
    import { Close } from '@element-plus/icons-vue'
    const props = defineProps({
        title: {
            type: String,
            default: '工具名称'
        },
        panelId: {
            type: String || null,
            default: 'util'
        },
        width: {
            type: String,
            default: '300px'
        }
    })
    const emit = defineEmits(['on-click-close'])
    // 关闭工具栏
    const onClickClose = () => {
        emit('on-click-close')
    }
</script>
<style lang="less" scoped>
    .util-panel {
        position: absolute;
        top: 48px;
        right: 0;
        background: #fff;
        overflow: hidden;
        border-radius: 4px;
        box-shadow: 0 1px 2px #0003;
        z-index: 10;

        &_header {
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
            background: #eceef3;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .el-icon-question,
            .el-icon-close,
            .icon-zuidahua {
                cursor: pointer;

                &:hover {
                    color: var(--el-color-primary);
                }
            }

            .el-icon-question {
                font-size: 16px;
                color: #555555;
            }

            .el-icon-close {
                font-size: 20px;
            }
        }

        &_content {
            padding: 10px;

            :deep(.action-button) {
                font-size: 16px;
                background-color: transparent;
                border: 1px solid #999;
                color: #6e6e6e;
                height: 32px;
                width: 32px;
                text-align: center;
                outline: none;
                border-radius: 4px;
                margin-right: 10px;
                cursor: pointer;

                &:hover {
                    color: var(--el-color-primary);
                    border-color: var(--el-color-primary);
                }

                &.is-active {
                    background: var(--el-color-primary);
                    color: #e4e4e4;
                    border-color: var(--el-color-primary);
                }
            }
        }
    }
</style>
