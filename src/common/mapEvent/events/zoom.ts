/**
 * 地图放大缩小事件
 */

import SceneView from '@arcgis/core/views/SceneView'
import MapView from '@arcgis/core/views/MapView'
import Zoom from '@arcgis/core/widgets/Zoom'
export default {
    /**
     * 放大
     */
    onZoomIn: (view: SceneView | MapView) => {
        const zoom = new Zoom({
            viewModel: {
                view: view
            }
        })

        zoom.viewModel.zoomIn()
    },
    /**
     * 缩小
     */
    onZoomOut: (view: SceneView | MapView) => {
        const zoom = new Zoom({
            viewModel: {
                view: view
            }
        })

        zoom.viewModel.zoomOut()
    }
}
