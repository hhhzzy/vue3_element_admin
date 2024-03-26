/*
 * 地图放大缩小相关事件
 */
import { ElMessage } from 'element-plus'
import Point from '@arcgis/core/geometry/Point'
import Graphic from '@arcgis/core/Graphic'
import PopupTemplate from '@arcgis/core/PopupTemplate'
import locateImg from '@/assets/map/location.png'
export default {
    /**
     * 调整视图到全市
     * @param view 当前地图
     * @param data 参数（中心点、等）
     */
    onLocateToExtent: (view: any, data: any) => {
        const { extent, params } = data
        view.goTo(extent, params).then(function () {
            if (params.showMessage) {
                ElMessage.success('已将视图调整至重庆市全幅区域')
            }
        })
    },

    /**
     * 定位函数
     * @param view 当前地图
     * @returns
     */
    onLocation: (view: any) => {
        console.log('点击了获取定位坐标', navigator)
        if (navigator.geolocation) {
            //
            const showSuccess = (position: any) => {
                console.log(position, view)
                const { longitude, latitude } = position.coords
                console.log('纬度latitude:' + latitude + ',经度longitude:' + longitude)
                view.goTo(
                    {
                        target: [longitude, latitude],
                        heading: 0,
                        tilt: 0
                    },
                    {
                        duration: 500
                    }
                ).then(function () {
                    const newPoint = new Point({
                        longitude: longitude,
                        latitude: latitude,
                        spatialReference: { wkid: 4326 }
                    })
                    const symbol = {
                        type: 'picture-marker',
                        url: locateImg,
                        width: '40px',
                        height: '40px'
                    }
                    const picGraphic = new Graphic({
                        geometry: newPoint,
                        symbol: symbol as any
                    })

                    const popupTemplate = new PopupTemplate({
                        title: '当前位置',
                        content: `<div>经度：${longitude}，纬度：${latitude}</div>`
                    })
                    picGraphic.popupTemplate = popupTemplate
                    // 找到图形渲染层
                    const layer = view.map.layers.items.find((x: any) => {
                        return x.id === 'mapGraphicsLayer'
                    })
                    if (layer) {
                        // 显示图标
                        layer.graphics.add(picGraphic)
                    }

                    ElMessage.success('已定位到当前位置')
                })
            }

            // 获取失败的回调函数
            const showError = ({
                code,
                PERMISSION_DENIED,
                POSITION_UNAVAILABLE,
                TIMEOUT,
                UNKNOWN_ERROR
            }: {
                code: number
                PERMISSION_DENIED: number
                POSITION_UNAVAILABLE: number
                TIMEOUT: number
                UNKNOWN_ERROR: any
            }) => {
                let msg = '定位失败'
                switch (code) {
                    case PERMISSION_DENIED:
                        msg += '，用户拒绝请求地理定位'
                        break
                    case POSITION_UNAVAILABLE:
                        msg += '，位置信息不可用'
                        break
                    case TIMEOUT:
                        msg += '，获取用户位置超时'
                        break
                    case UNKNOWN_ERROR:
                        msg += '，未知错误'
                        break
                }

                ElMessage.error(msg)
            }
            navigator.geolocation.getCurrentPosition(showSuccess, showError as any)
        } else {
            ElMessage.warning('抱歉！您的浏览器不支持地理定位')
            return
        }
    }
}
