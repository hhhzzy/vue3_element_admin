export interface ICommonUtilsState {
    component: any // 对应组件
    svgName: string // 图标名称
    utilName: string // 工具名称
    utilActive: boolean // 工具激活/高亮状态
    eventSuffix: string // 传递事件后缀名, 例如 "onOpenMeasure" 和 "onRemoveMeasure"
    panelID: string // 工具应添加容器的ID
    enable2D: boolean // 2D模式下是否可用
    enable3D: boolean // 3D模式下是否可用
}
