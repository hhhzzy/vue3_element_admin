/**
 * 模块 : 地图操作事件模块
 * 作者 : 黄照阳（1193457593@qq.com）
 */
// 导入events文件夹中的文件
// vite 使用import.meta.globEager('./events/*.js')
const events = require.context('./events', true, /\.ts$/)
export default function (): any {
    const modules = requireAll(events)
    let obj = {}
    Object.keys(modules).forEach(key => {
        // 获取文件中的函数
        const event = modules[key].default || modules[key]
        obj = { ...obj, ...event }
    })
    return obj
}
// 获取所有events文件夹中的函数
const requireAll = (requireContext: any) => {
    return requireContext.keys().map(requireContext)
}
