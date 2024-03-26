import DirectLineMeasurement3D from '@arcgis/core/widgets/DirectLineMeasurement3D'
import AreaMeasurement3D from '@arcgis/core/widgets/AreaMeasurement3D'
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D'
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D'
import { removeWidget } from '@/utils/map'
let widget: any
export default {
    /**
     * 测量2D距离
     * @param view 地图
     * @param data 传递数据 panelID：工具的div ID  activeButton: 点击的按钮类型
     */
    onMeasureDistance2D: (view: any, data: any) => {
        // 移除地图距离组件
        removeWidget(view, widget)
        if (!data || !data.panelID) {
            console.log('缺少传递数据 { panelID }，获取父级内容容器ID')
            return false
        }
        const { panelID, activeButton } = data

        if (activeButton === 'distance') {
            console.log('激活2D量算工具栏里的距离计算按钮')

            const panelContent = document.getElementById(panelID)!

            const measureUtil = document.createElement('div')
            measureUtil.id = 'measureDistance2D'

            panelContent.appendChild(measureUtil)
            widget = new DistanceMeasurement2D({
                view,
                id: 'DistanceMeasurement2D',
                container: document.getElementById(measureUtil.id)!
            })
        } else {
            console.log('取消3D量算工具栏里的距离计算按钮')
        }
    },
    /**
     * 测量2D面积
     * @param view 地图
     * @param data 传递数据 panelID：工具的div ID  activeButton: 点击的按钮类型
     */
    onMeasureArea2D: (view: any, data: any) => {
        // 移除地图距离组件
        removeWidget(view, widget)
        if (!data || !data.panelID) {
            console.log('缺少传递数据 { panelID }，获取父级内容容器ID')
            return false
        }
        const { panelID, activeButton } = data

        if (activeButton === 'area') {
            console.log('激活2D量算工具栏里的面积计算按钮')

            const panelContent = document.getElementById(panelID)!

            const measureUtil = document.createElement('div')
            measureUtil.id = 'measureDistance2D'

            panelContent.appendChild(measureUtil)
            widget = new AreaMeasurement2D({
                view,
                id: 'AreaMeasurement2D',
                container: document.getElementById(measureUtil.id)!
            })
        } else {
            console.log('取消3D量算工具栏里的面积计算按钮')
        }
    },
    /**
     * 测量3D距离
     * @param view 地图
     * @param data 传递数据 panelID：工具的div ID  activeButton: 点击的按钮类型
     */
    onMeasureDistance3D: (view: any, data: any) => {
        // 移除地图距离组件
        removeWidget(view, widget)
        if (!data || !data.panelID) {
            console.log('缺少传递数据 { panelID }，获取父级内容容器ID')
            return false
        }
        const { panelID, activeButton } = data

        if (activeButton === 'distance') {
            console.log('激活3D量算工具栏里的距离计算按钮')

            const panelContent = document.getElementById(panelID)!

            const measureUtil = document.createElement('div')
            measureUtil.id = 'measureDistance3D'

            panelContent.appendChild(measureUtil)
            widget = new DirectLineMeasurement3D({
                view,
                id: 'DirectLineMeasurement3D',
                container: document.getElementById(measureUtil.id)!
            })
        } else {
            console.log('取消3D量算工具栏里的距离计算按钮')
        }
    },
    /**
     * 测量3D面积
     * @param view 地图
     * @param data 传递数据 panelID：工具的div ID  activeButton: 点击的按钮类型
     */
    onMeasureArea3D: (view: any, data: any) => {
        console.log(view, data)
        // 移除地图距离组件
        removeWidget(view, widget)
        if (!data || !data.panelID) {
            console.log('缺少传递数据 { panelID }，获取父级内容容器ID')
            return false
        }
        const { panelID, activeButton } = data
        if (activeButton === 'area') {
            console.log('激活3D量算工具栏里的面积计算按钮')
            const panelContent = document.getElementById(panelID)!
            const measureUtil = document.createElement('div')
            measureUtil.id = 'measureArea3D'
            panelContent.appendChild(measureUtil)
            widget = new AreaMeasurement3D({
                view,
                id: 'AreaMeasurement3D',
                container: document.getElementById(measureUtil.id)!
            })
        } else {
            console.log('取消3D量算工具栏里的距离计算按钮')
        }
    }
}
