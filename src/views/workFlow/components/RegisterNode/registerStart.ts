import LogicFlow from '@logicflow/core'
export default function registerStart(lf: LogicFlow) {
    console.log(lf)
    // eslint-disable-next-line prettier/prettier
    lf.register('start', ({ CircleNode, CircleNodeModel, h }: { CircleNode: any, CircleNodeModel: any, h: any }) => {
        // 自定义节点的view -- 通过调用getShape确定VNode如何渲染
        class StartNode extends CircleNode {
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
                    '开始'
                )
            }
            getShape() {
                const { model } = this.props
                const { x, y, r } = model
                const { fill, stroke, strokeWidth } = model.getNodeStyle()
                return h('g', {}, [
                    h('circle', {
                        cx: x,
                        cy: y,
                        r,
                        fill,
                        stroke,
                        strokeWidth
                    }),
                    this.getLabelShape()
                ])
            }
        }
        console.log(CircleNode)
        // 自定义节点的model
        class StartModel extends CircleNodeModel {
            // 自定义节点形状属性：长方形、宽、高
            initNodeData(data: any) {
                console.log(data.x)
                data.text = {
                    value: (data.text && data.text.value) || '开始审批',
                    x: data.x,
                    y: data.y + 45,
                    dragable: false,
                    editable: true
                }
                super.initNodeData(data)
                this.r = 20
            }
            // 自定义节点样式属性：颜色、边框
            getNodeStyle() {
                const style = super.getNodeStyle()
                // const properties = this.getProperties()
                style.stroke = '#FF6347'
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
            getConnectedTargetRules() {
                const rules = super.getConnectedTargetRules()
                const notAsTarget = {
                    message: '起始节点不能作为连线的终点',
                    validate: () => false
                }
                rules.push(notAsTarget)
                return rules
            }
        }
        return {
            view: StartNode,
            model: StartModel
        }
    })
}
