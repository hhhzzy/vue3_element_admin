<template>
    <div class="mapdiv" ref="mapdiv"></div>
</template>
<script lang="ts" setup>
    // import MapView from '@arcgis/core/views/MapView'
    import Map from '@arcgis/core/Map'
    import SceneView from '@arcgis/core/views/SceneView'
    // import MapImageLayer from '@arcgis/core/layers/MapImageLayer'
    import WebTileLayer from '@arcgis/core/layers/WebTileLayer'
    import Basemap from '@arcgis/core/Basemap'
    import { onMounted, ref } from 'vue'
    import BasemapToggle from '@arcgis/core/widgets/BasemapToggle' // 地图切换控件
    const mapdiv = ref()
    // 天地图的key
    const tiandituKey = 'c5c56f66ba71196a73b2d6060c06e586'
    // 遥感影像
    const tiledLayerImg = new WebTileLayer({
        urlTemplate: `http://{subDomain}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${tiandituKey}`,
        subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
    })

    // 矢量地图
    // const tiledLayerVec = new WebTileLayer({
    //     urlTemplate: `http://{subDomain}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${tiandituKey}`,
    //     subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
    // })

    // 地图标注
    const tiledLayerPoi = new WebTileLayer({
        urlTemplate: `http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&x={col}&y={row}&l={level}&tk=${tiandituKey}`,
        subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
    })
    const basemap = new Basemap({
        baseLayers: [tiledLayerPoi],
        title: 'basemapImg',
        id: 'basemapImg'
    })
    const basemapImg = new Basemap({
        baseLayers: [tiledLayerImg]
    })
    const map = new Map({
        basemap: basemap,
        ground: 'world-elevation'
    })
    const view = new SceneView({
        map: map,
        center: [106.614021, 29.725857],
        zoom: 15
    })
    // 底图切换控件,next中就是要切换的遥感底图
    const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: basemapImg
    })
    onMounted(() => {
        view.ui.add(basemapToggle, 'bottom-right')
        view.container = mapdiv.value
    })
</script>
<style scoped>
    .mapdiv {
        padding: 0;
        margin: 0;
        height: calc(100vh - 120px);
    }
</style>
