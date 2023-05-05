import LogicFlow from '@logicflow/core'
export default function registerJugement(lf: LogicFlow) {
    console.log(lf)
    // eslint-disable-next-line prettier/prettier
    lf.register('jugement', ({ DiamondNode, DiamondNodeModel, h }: { DiamondNode: any, DiamondNodeModel: any, h: any }) => {
        // 自定义节点的view -- 通过调用getShape确定VNode如何渲染
        class StartNode extends DiamondNode {
            getLabelShape() {
                const { model } = this.props
                const { x, y } = model
                return h(
                    'text',
                    {
                        fill: '#000000',
                        fontSize: 12,
                        x: x - 12,
                        y: y + 4,
                        width: 50,
                        height: 25
                    },
                    '判断'
                )
            }
            getShape() {
                const { model } = this.props
                const { points } = model
                const { fill, fillOpacity, strokeWidth, stroke, strokeOpacity } = model.getNodeStyle()
                const pointsPath = points.map((point: any) => point.join(',')).join(' ')
                return h('g', {}, [
                    h('polygon', {
                        points: pointsPath,
                        fill,
                        stroke,
                        strokeWidth,
                        strokeOpacity,
                        fillOpacity
                    }),
                    this.getLabelShape()
                ])
            }
        }
        console.log(DiamondNode)
        // 自定义节点的model
        class StartModel extends DiamondNodeModel {
            // 自定义节点形状属性：形状、宽、高
            initNodeData(data: any) {
                console.log(data.x)
                data.text = {
                    value: (data.text && data.text.value) || '',
                    x: data.x,
                    y: data.y + 45,
                    dragable: false,
                    editable: true
                }
                super.initNodeData(data)
                this.rx = 50
                this.ry = 20
            }
            // 自定义节点样式属性：颜色、边框
            getNodeStyle() {
                const style = super.getNodeStyle()
                // const properties = this.getProperties()
                style.stroke = '#6495ED'
                return style
            }
            // 自定义锚点样式
            getAnchorStyle() {
                const style = super.getAnchorStyle()
                style.hover.r = 8
                style.hover.fill = 'rgb(24, 125, 255)'
                style.hover.stroke = 'rgb(24, 125, 255)'
                return style
            }
            // 自定义节点outline
            getOutlineStyle() {
                const style = super.getOutlineStyle()
                style.stroke = '#88f'
                return style
            }
        }
        return {
            view: StartNode,
            model: StartModel
        }
    })
}
