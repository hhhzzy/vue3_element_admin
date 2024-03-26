import { InjectionKey, Ref } from 'vue'

// 解决provide 和 inject 中Ts 提示对象的类型为 “unknown”
// 摄像机
interface ICameraState {
    tilt: number
    heading: number
}
export const getCameraInfo: InjectionKey<Ref<ICameraState>> = Symbol()
interface IcoorInfoState {
    scale: number // 地图的缩放等级
    lon: number // 经度
    lat: number // 纬度
    tilt: number
    heading: number
}
export const getCoorInfo: InjectionKey<IcoorInfoState> = Symbol()

export const getMapViewType: InjectionKey<Ref<string>> = Symbol()
export const getBasemap: InjectionKey<Ref<string>> = Symbol()
