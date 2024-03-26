<template>
    <div class="app">
        <div class="dataV-box" ref="dataVRef">
            <div style="background-color: aqua; width: 200px; height: 300px"></div>
            <div class="map-box" ref="mapRef" style="background-color: blue; width: 100px; height: 200px"></div>
        </div>
        <el-dialog v-model="dialogVisible" title="Tips" width="30%">
            <span>This is a message</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
    import useDraw from './Scale'
    import { onMounted, onUnmounted, ref } from 'vue'
    const { dataVRef, calcRte, windowDraw, unWindowDraw, mapRef, resizeMap } = useDraw()
    const dialogVisible = ref(false)
    onMounted(() => {
        windowDraw()
        calcRte()
        resizeMap()
    })
    onUnmounted(() => {
        unWindowDraw()
    })
</script>
<style lang="less" scoped>
    .app {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
    .dataV-box {
        width: 1920px;
        height: 1080px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transform-origin: left top;
    }
    .map-box {
        transform-origin: left top;
    }
</style>
