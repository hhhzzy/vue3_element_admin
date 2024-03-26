<template>
    <div class="mapdiv" ref="map2DivRef" v-show="mapViewType === '2D'"></div>
    <div class="mapdiv" ref="map3DivRef" v-show="mapViewType === '3D'"></div>
</template>
<script lang="ts" setup>
    import { onMounted, ref, computed, watch, inject, defineExpose, nextTick } from 'vue'
    import { useStore } from '@/store/index'
    import { ElMessage } from 'element-plus'
    import { getCameraInfo, getCoorInfo, getMapViewType } from '@/utils/injectionKey'
    // 所有的地图事件
    import mapEvents from '@/common/mapEvent/index'
    // 所有的图层
    import layers from '@/common/map/layers'
    import GroupLayer from '@arcgis/core/layers/GroupLayer'
    import Map from '@arcgis/core/Map'
    import MapView from '@arcgis/core/views/MapView'
    import SceneView from '@arcgis/core/views/SceneView'
    import Basemap from '@arcgis/core/Basemap'
    const store = useStore()
    const mapEvent = computed(() => store.state.map.mapEvent)
    // 地图的容器
    const map2DivRef = ref()
    const map3DivRef = ref()
    // 图层信息
    const { vecBasemapGroupLayerC, imgBasemapGroupLayerC, terBasemapGroupLayerC, spatialReference, graphicsLayer } = layers()
    // 坐标信息
    const coorInfo = inject(getCoorInfo)!
    // 底图2/3D类型
    const mapViewType = inject(getMapViewType)!
    // 摄像机信息
    const cameraInfo = inject(getCameraInfo)!
    // 当前显示的地图
    let currentView: SceneView | MapView

    const createMap = (layerList: GroupLayer[]) => {
        const basemap = new Basemap({
            baseLayers: layerList
        })
        const map = new Map({
            basemap
        })
        layerList.forEach(e => {
            map.add(e)
        })
        return map
    }
    let view2D: MapView
    let view3D: SceneView
    /**
     * 初始化地图
     */
    const createView = (type: string) => {
        const layerList = [terBasemapGroupLayerC, vecBasemapGroupLayerC, imgBasemapGroupLayerC]
        const map = createMap(layerList)
        const view =
            type === '3D'
                ? new SceneView({
                      container: map3DivRef.value,
                      map: map,
                      center: [coorInfo?.lon, coorInfo?.lat], // 中心坐标
                      zoom: 17,
                      scale: coorInfo?.scale,
                      spatialReference: spatialReference
                  })
                : new MapView({
                      container: map2DivRef.value,
                      map: map,
                      center: [coorInfo?.lon, coorInfo?.lat], // 中心坐标
                      zoom: 17,
                      scale: coorInfo?.scale,
                      spatialReference: spatialReference
                  })
        onMounseKeyEvent(view)
        initCamera(view)
        // 增加图形渲染层
        view.map.add(graphicsLayer)
        ;(view.ui as any)._removeComponents(['attribution'])
        view.ui.empty('top-left')
        return view
    }

    onMounted(() => {
        view2D = createView('2D') as MapView
        view3D = createView('3D') as SceneView
        currentView = mapViewType.value === '3D' ? view3D : view2D
        console.log(currentView, 999)
    })
    // 监听地图操作事件
    watch(
        () => mapEvent.value,
        newEvents => {
            console.log(newEvents)
            if (newEvents.length) {
                return newEvents.forEach(e => {
                    const { event, data } = e
                    console.log(e, mapEvents())
                    // 切换2/3D
                    if (event === 'onTransformView') {
                        onTransformView(data)
                        return false
                    }
                    // 调用底图操作事件
                    mapEvents()[event](currentView, data)
                })
            }
        }
    )
    /**
     * 初始化摄像机
     * @param view 视图对象
     * @param animation 是否显示进场动画
     * @param duration 动画持续时间
     */
    const initCamera = (view: any, animation = true, duration = 5000) => {
        const gotoInfo = {
            center: [coorInfo.lon, coorInfo.lat], // 将摄像头移动到一个点上面
            tilt: cameraInfo.value.tilt, // 这个是控制摄像头的垂直朝向
            heading: cameraInfo.value.heading,
            zoom: 17 // 地图层级高度 一般最大是20  最小0   20的时候就已经贴着地面了几乎
        }
        console.log(gotoInfo, 'gotoInfo')
        if (!animation) {
            gotoInfo.tilt = 0
            gotoInfo.heading = 0
            duration = 0
        }

        view.when(function () {
            setTimeout(
                () => {
                    console.log(gotoInfo, 6666666)
                    view.goTo(gotoInfo, { duration }).then(() => {
                        console.log(view.scale, 5555656666)
                        // 摄像机移动结束设置当前比例
                        changeViewScale(Math.round(view.scale))
                    })
                },
                animation ? 1500 : 0
            )
            console.log(view, 'view')
            // 监听摄像机
            view.watch('camera', (camera: any) => {
                const tilt = camera.tilt
                const heading = camera.heading
                // let position = camera.position;
                // console.log(tilt, heading, position);

                changeCameraInfo(tilt, heading)
                changeCoordInfoTiltHeading(tilt, heading)
            })
        })
    }
    // 修改地图摄像机位置
    const changeCameraInfo = (tilt: number, heading: number) => {
        cameraInfo.value = { tilt, heading }
    }
    // 修改地图视图比例
    const changeViewScale = (scale: any) => {
        coorInfo.scale = scale
    }
    // 修改坐标摄像机位置
    const changeCoordInfoTiltHeading = (tilt: number, heading: number) => {
        coorInfo.tilt = mapViewType.value === '2D' ? 0.0 : Number(parseFloat(String(tilt)).toFixed(2))
        coorInfo.heading = mapViewType.value === '2D' ? 0.0 : Number(parseFloat(String(heading)).toFixed(2))
    }
    /**
     * 转换2/3D地图
     */
    const onTransformView = (type: string) => {
        console.log(type)
        nextTick(() => {
            if (type === '2D') {
                view3D.goTo({ tilt: 45, heading: 44 }, { duration: 3000 }).then(() => {
                    const viewpoint = view3D.viewpoint.clone()
                    view2D.viewpoint = viewpoint
                    mapViewType.value = type
                    ElMessage.success(`您已成功切换至${type}视图`)
                })
            } else {
                const viewpoint = currentView.viewpoint.clone()
                view3D.viewpoint = viewpoint
                mapViewType.value = type
                console.log(currentView, view3D, 'currentView')
                view3D.goTo({ tilt: 45 }, { animate: true, duration: 3000 }).then(() => {
                    ElMessage.success(`您已成功切换至${type}视图`)
                })
            }
            console.log(mapViewType, 'mapViewType')
        })
    }
    // 设置地图视图比例-父组件调用
    const onSetScale = (scale: number) => {
        console.log(currentView, 888)
        currentView.scale = scale
    }
    //
    const onMounseKeyEvent = (view: MapView | SceneView) => {
        console.log(view)
        // 鼠标移动事件
        view.on('pointer-move', e => {
            const point = view.toMap({ x: e.x, y: e.y })
            if (point) {
                const { longitude, latitude } = point
                coorInfo.lon = Number(longitude.toFixed(5))
                coorInfo.lat = Number(latitude.toFixed(5))
            }
        })
    }
    // const shiftCamera = (aa: any, deg: number) => {
    //     const camera = aa.camera.clone()
    //     camera.position.longitude += deg
    //     return camera
    // }
    defineExpose({
        onSetScale
    })
</script>
<style lang="less" scoped>
    .mapdiv {
        padding: 0;
        margin: 0;
        height: calc(100vh - 120px);
    }
</style>
