import { defineStore } from 'pinia'
import { getCookie, setSysColor, setMenuColor } from '@/utils/cookies'
export interface IAppState {
    isCollapse: boolean
    mode: string
    sysColor: string
    menuColor: string
}
export const useAppStore = defineStore('app', {
    state: (): IAppState => ({
        isCollapse: false,
        mode: getCookie('layout') || 'vertical',
        sysColor: '',
        menuColor: ''
    }),
    getters: {},
    actions: {
        /**
         * 切换左侧路由开启关闭
         */
        changeCollapse(isCollapse: boolean) {
            this.isCollapse = isCollapse
        },
        /**
         *
         * @param param0 改变布局模式
         * @param type
         */
        changeLayout(type: string) {
            // 如果为horizontal 模式下的收缩状态，当改变为水平模式时，改为展开状态
            if (type === 'horizontal') {
                this.isCollapse = false
            }
            this.mode = type
        },
        /**
         * 设置系统主题
         * @param param0
         * @param color
         */
        setSysColor(color: string) {
            this.sysColor = color
            setSysColor(color)
        },
        setMenuColor(color: string) {
            this.menuColor = color
            setMenuColor(color)
        }
    }
})
