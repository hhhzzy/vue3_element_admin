import { Module } from 'vuex'
import { IRooteState } from '../index'
import { getCookie, setSysColor, setMenuColor } from '@/utils/cookies'
export interface IAppState {
    isCollapse: boolean
    mode: string
    sysColor: string
    menuColor: string
}
export const store: Module<IAppState, IRooteState> = {
    namespaced: true,
    state: (): IAppState => ({
        isCollapse: false,
        mode: getCookie('layout') || 'vertical',
        sysColor: '',
        menuColor: ''
    }),
    actions: {
        /**
         * 切换左侧路由开启关闭
         */
        changeCollapse({ commit }, isCollapse: boolean) {
            commit('CHANGE_COLLAPSE', isCollapse)
        },
        /**
         *
         * @param param0 改变布局模式
         * @param type
         */
        changeLayout({ commit }, type: string) {
            commit('CHANGE_LAYOUT', type)
        },
        /**
         * 设置系统主题
         * @param param0
         * @param color
         */
        setSysColor({ commit }, color: string) {
            commit('SET_SYSCOLOR', color)
        },
        setMenuColor({ commit }, color: string) {
            commit('SET_MENUCOLOR', color)
        }
    },
    mutations: {
        CHANGE_COLLAPSE(state: IAppState, isCollapse: boolean) {
            state.isCollapse = isCollapse
        },
        CHANGE_LAYOUT(state: IAppState, type) {
            // 如果为horizontal 模式下的收缩状态，当改变为水平模式时，改为展开状态
            if (type === 'horizontal') {
                state.isCollapse = false
            }
            state.mode = type
        },
        SET_SYSCOLOR(state: IAppState, color) {
            state.sysColor = color
            setSysColor(color)
        },
        SET_MENUCOLOR(state: IAppState, color) {
            state.menuColor = color
            setMenuColor(color)
        }
    }
}
