<template>
    <el-button-group>
        <el-button size="small" @click="lfZoomIn">放大</el-button>
        <el-button size="small" @click="lfZoomOut">缩小</el-button>
        <el-button size="small" @click="lfZoomReset">大小适应</el-button>
        <el-button size="small" @click="lfResetTranslate">定位还原</el-button>
        <el-button size="small" @click="lfUndo" :disabled="undoDisable">上一步（ctrl+z）</el-button>
        <el-button size="small" @click="lfRedo" :disabled="redoDisable">下一步（ctrl+y）</el-button>
        <el-button size="small" @click="lfDownloadPicture">下载图片</el-button>
        <el-button size="small" @click="lfLookData">查看数据</el-button>
        <el-button size="small">查看turbo数据</el-button>
        <el-button size="small">查看缩略图</el-button>
    </el-button-group>
</template>
<script lang="ts" setup>
    import LogicFlow from '@logicflow/core'
    import { onMounted, ref } from 'vue'
    interface Props {
        lf: LogicFlow
    }
    const props = defineProps<Props>()
    const undoDisable = ref(true)
    const redoDisable = ref(true)
    console.log(props)

    // 放大
    const lfZoomIn = () => {
        props.lf.zoom(true)
    }
    // 缩小
    const lfZoomOut = () => {
        props.lf.zoom(false)
    }
    // 大小适应
    const lfZoomReset = () => {
        props.lf.resetZoom()
    }
    // 定位还原
    const lfResetTranslate = () => {
        props.lf.resetTranslate()
    }
    // 上一步
    const lfUndo = () => {
        props.lf.undo()
    }
    // 下一步
    const lfRedo = () => {
        props.lf.redo()
    }
    // 下载图片
    const lfDownloadPicture = () => {
        props.lf.getSnapshot()
    }
    const emit = defineEmits(['catData'])
    // 查看数据
    const lfLookData = () => {
        emit('catData')
    }
    onMounted(() => {
        console.log(props.lf)
        // 监听图的变化
        props.lf.on('history:change', ({ data: { undoAble, redoAble } }) => {
            undoDisable.value = !undoAble
            redoDisable.value = !redoAble
        })
    })
</script>
