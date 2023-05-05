import LogicFlow from '@logicflow/core'
export default function registerApprovel(lf: LogicFlow) {
    console.log(lf)
    // eslint-disable-next-line prettier/prettier
    lf.register('approver', ({ RectNode, RectNodeModel, h }: { RectNode: any, RectNodeModel: any, h: any }) => {
        // 自定义节点的view -- 通过调用getShape确定VNode如何渲染
        class StartNode extends RectNode {
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
                    '审批'
                )
            }
            getShape() {
                const { model } = this.props
                const { x, y, width, height, radius } = model
                const style = model.getNodeStyle()
                return h('g', {}, [
                    h('rect', {
                        ...style,
                        x: x - width / 2,
                        y: y - height / 2,
                        rx: radius,
                        ry: radius,
                        width,
                        height
                    }),
                    this.getLabelShape()
                ])
            }
        }
        console.log(RectNode)
        // 自定义节点的model
        class StartModel extends RectNodeModel {
            // 自定义节点形状属性：长方形、宽、高
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
                this.width = 80
                this.height = 60
            }
            // 自定义节点样式属性：颜色、边框
            getNodeStyle() {
                const style = super.getNodeStyle()
                // const properties = this.getProperties()
                style.stroke = '#3CB371'
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
