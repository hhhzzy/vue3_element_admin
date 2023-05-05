// import Vue from 'vue'
// import Connect from './Connect.vue'
import LogicFlow from '@logicflow/core'
import { GraphModel } from '@logicflow/core/types/model'

export default function registerConnect(lf: LogicFlow) {
    lf.register('polyline', ({ PolylineEdge, PolylineEdgeModel }) => {
        class ConnnectionModel extends PolylineEdgeModel {
            // eslint-disable-next-line no-useless-constructor
            constructor(data: any, graphModel: GraphModel) {
                super(data, graphModel)
            }
            setHovered(isHovered: any) {
                super.setHovered(isHovered)
                this.isAnimation = isHovered
            }
            getEdgeAnimationStyle() {
                const style = super.getEdgeAnimationStyle()
                style.animationName = 'lf_animate_dash'
                return style
            }
            customTextPosition = true
            getTextPosition() {
                const position = super.getTextPosition()
                const currentPositionList = this.points.split(' ')
                const pointsList = []
                currentPositionList &&
                    currentPositionList.forEach(item => {
                        const [x, y] = item.split(',')
                        pointsList.push({ x: Number(x), y: Number(y) })
                    })
                if (currentPositionList.length > 1) {
                    const [x1, y1] = currentPositionList[0].split(',')
                    const [x2, y2] = currentPositionList[1].split(',')
                    let distance = 100
                    if (Number(x1) === Number(x2)) {
                        console.log(x1, x2, y1, y2)
                        // 垂直
                        if (Number(y2) < Number(y1)) {
                            distance = -50
                        }
                        position.y = Number(Number(y1) + distance)
                        position.x = Number(x1)
                    } else {
                        if (Number(x2) < Number(x1)) {
                            distance = -50
                        }
                        position.x = Number(Number(x1) + distance)
                        position.y = Number(y1) - 10
                    }
                }
                console.log(position)
                return position
            }
        }
        return {
            view: PolylineEdge,
            model: ConnnectionModel
        }
    })
}
