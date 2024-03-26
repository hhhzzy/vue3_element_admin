import { removeWidget } from '@/utils/map'
import Sketch from '@arcgis/core/widgets/Sketch'
let widget: any
export default {
    /**
     * 绘制工具
     * @param view 地图
     * @param data 传递的数据 panelID：工具的div ID
     * @param mapViewType  地图类型 2/3D
     * @returns
     */
    onOpenDraw: (view: any, data: any, mapViewType: string) => {
        console.log(view, data)
        removeWidget(view, widget)
        if (!data || !data.panelID) {
            console.log('缺少传递数据 { panelID }，获取父级内容容器ID')
            return false
        }

        const { panelID } = data

        console.log('展开绘制工具面板')

        const panelContent = document.getElementById(panelID)!

        const drawUtil = document.createElement('div')
        drawUtil.id = `draw${mapViewType}`

        panelContent.appendChild(drawUtil)

        widget = new Sketch({
            layer: view.map.findLayerById('mapGraphicsLayer'),
            view,
            id: 'Sketch',
            creationMode: 'update',
            container: document.getElementById(drawUtil.id)!
        })
    },
    /**
     * 取消绘制工具
     * @param {*} view 视图
     */
    onRemoveDraw: (view: any) => {
        console.log('收起绘制工具面板')
        removeWidget(view, widget)
    }
}
