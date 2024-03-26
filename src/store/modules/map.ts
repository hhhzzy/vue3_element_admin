import { Module } from 'vuex'
import { IRooteState } from '../index'
export interface IMapState {
    // 地图操作事件
    mapEvent: {
        event: string // 事件名
        data: any // 传递的参数
    }[]
}
export const store: Module<IMapState, IRooteState> = {
    namespaced: true,
    state: (): IMapState => ({
        mapEvent: []
    }),
    actions: {
        /**
         * 地图操作事件
         * @param param0
         * @param event 操作事件方法名称
         */
        changeMapEvent({ commit }, event) {
            console.log(event)
            commit('CHANGE_MAP_EVENT', event)
        }
    },
    mutations: {
        CHANGE_MAP_EVENT(state: IMapState, data) {
            state.mapEvent = data
        }
    }
}
