/*
 * 地图底图切换事件
 */
export default {
    onChangeBasemap: (view: any, item: { basemap: string }) => {
        const { basemap } = item
        console.log(`点击切换底图：${basemap}`)
        // 天地图地形地图群组id
        const layerList = ['vecBasemapGroupLayer', 'imgBasemapGroupLayer', 'terBasemapGroupLayer']
        layerList.forEach(e => {
            const layer = view.map.findLayerById(e)
            if (layer) {
                // 所有底图都隐藏
                layer.visible = false
            }
        })
        switch (basemap) {
            case 'img':
                view.map.findLayerById('imgBasemapGroupLayer').visible = true
                break
            case 'vec':
                view.map.findLayerById('vecBasemapGroupLayer').visible = true
                break
            case 'ter':
                view.map.findLayerById('terBasemapGroupLayer').visible = true
                break
            default:
                console.log('底图切换错误!')
        }
    }
}
