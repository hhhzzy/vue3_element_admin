/**
 * 移除地图组件
 * @param view 视图
 * @param widget 地图组件
 */
export function removeWidget(view: any, widget: any) {
    console.log(view, widget)
    if (widget) {
        if (view) {
            view.ui.remove(widget)
        }
        widget.destroy()
        widget = null
    }
}
