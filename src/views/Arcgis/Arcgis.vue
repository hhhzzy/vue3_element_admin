<template>
    <div class="arcgis-box">
        <!--  地图  -->
        <Map ref="arcgisMapRef" />
        <!--  底图切换  -->
        <SwitchMap @change-basemap="changeBasemap" @map-set-view-scale="mapSetViewScale" />
        <!--  地图操作  -->
        <OperatePanel />
        <!--  地图详细信息   -->
        <MapInfo :foldMapInfoPanel="foldMapInfoPanel" @click-fold-panel="onFoldMapInfoPanel" @map-set-view-scale="mapSetViewScale" />
        <!--  工具栏  -->
        <UtilsPanel />
    </div>
</template>
<script lang="ts" setup>
    import { ref, provide, reactive } from 'vue'
    import Map from './map.vue'
    import SwitchMap from '@/components/Map/SwitchMap/index.vue'
    import OperatePanel from '@/components/Map/OperatePanel/index.vue'
    import MapInfo from '@/components/Map/MapInfo/index.vue'
    import UtilsPanel from '@/components/Map/UtilsPanel/index.vue'
    import { ElMessage } from 'element-plus'
    import { getCameraInfo, getCoorInfo, getMapViewType, getBasemap } from '@/utils/injectionKey'
    // 地图容器
    const arcgisMapRef = ref()
    // 当前地图默认底图类型
    const basemap = ref('img')
    // 当前地图视图
    const mapViewType = ref('3D')

    // 地图坐标信息
    const coorInfo = reactive({
        scale: 50000000, // 地图的缩放等级
        lon: 106.605363, // 经度
        lat: 29.720589 // 纬度
    })
    // 摄像机信息
    const cameraInfo = ref({
        // 这个是控制摄像头的垂直朝向
        tilt: 45,
        // 这个是控制摄像头的水平方向
        heading: 44
    })
    // 顶级组件通过provide传值给子孙组件
    provide(getBasemap, basemap)
    provide(getCoorInfo, coorInfo)
    provide(getMapViewType, mapViewType)
    provide(getCameraInfo, cameraInfo)
    // 切换底图
    const changeBasemap = (val: string) => {
        console.log(basemap, val)
        basemap.value = val
    }
    // 设置地图信息
    const mapSetViewScale = (data: { scale: number }) => {
        console.log(data)
        coorInfo.scale = data.scale
        ElMessage.success(`已将地图比例调整至1:${data.scale}`)
        // 调用地图组件设置地图比例
        arcgisMapRef.value.onSetScale(data.scale)
    }
    // 地图详细信息
    const foldMapInfoPanel = ref(false)
    const onFoldMapInfoPanel = (val: boolean) => {
        foldMapInfoPanel.value = val
    }
</script>
<style lang="less" scoped>
    .mapdiv {
        padding: 0;
        margin: 0;
        height: calc(100vh - 120px);
    }
    .arcgis-box {
        position: relative;
        height: calc(100vh - 120px);
    }
    .switch-layer-box {
        position: absolute;
        right: 10px;
        top: 15px;
    }
</style>
