import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
// 泛型：Partial工具。作用：把Route里面的值都变成可选项 ?
export interface ITagNav extends Partial<RouteLocationNormalizedLoaded> {
    title?: string
    fullPath?: string
}

export interface ITagsViewState {
    visitedTag: ITagNav[] // 访问过的路由页面
    cachedTag: string[] // 使用keep-alive缓存的组件名字
}
export const useTagsViewStore = defineStore('tagsView', {
    state: (): ITagsViewState => ({
        visitedTag: [],
        cachedTag: []
    }),
    getters: {},
    actions: {
        /**
         * 增加默认的tag
         */
        addVisitedTag(route: RouteLocationNormalizedLoaded) {
            // 判断当前路由是否需要显示在tag上
            if (route.meta.noTagsView) return
            // 判断当前点击的路由是否已经存在，并且当前点击路由的参数是否和已经存在的路由参数相同。不同则更新
            const bool = this.visitedTag.some(v => {
                return v.path === route.path
            })
            if (bool) {
                this.visitedTag = this.visitedTag.map(item => {
                    if (item.path === route.path) {
                        item.query = route.query
                        item.fullPath = route.fullPath
                    }
                    return item
                })
                return
            }
            this.visitedTag.push(
                Object.assign({}, route, {
                    title: route.meta.title || 'no-name'
                })
            )
        },
        /**
         * 增加被KeepAlive缓存的路由
         * @param route
         * @returns
         */
        addCachedView(route: RouteLocationNormalizedLoaded) {
            if (route.name === null) return
            if (this.cachedTag.includes(route.name as string)) return
            if (!route.meta.noCache) {
                this.cachedTag.push(route.name as string)
            }
        },
        /**
         * 点击路由，增加tag
         */
        addTag(route: RouteLocationNormalizedLoaded) {
            this.addVisitedTag(route)
            this.addCachedView(route)
        },
        /**
         * 删除tag
         */
        delTag(route: RouteLocationNormalizedLoaded) {
            this.delVisitedTag(route)
            this.delCachedView(route)
        },
        /**
         * 删除单个缓存
         * @param param0
         * @param route
         */
        delCachedTag(route: RouteLocationNormalizedLoaded) {
            this.delCachedView(route)
        },
        /**
         * 删除tag
         */
        delVisitedTag(route: RouteLocationNormalizedLoaded) {
            for (const [i, v] of this.visitedTag.entries()) {
                if (v.path === route.path) {
                    this.visitedTag.splice(i, 1)
                    break
                }
            }
        },
        /**
         * 删除所有tag
         */
        delAllVisitedTag() {
            this.visitedTag = []
        },
        /**
         * 删除单个被KeepAlive缓存的路由
         */
        delCachedView(route: RouteLocationNormalizedLoaded) {
            if (route.name === null) return
            const index = this.cachedTag.indexOf(route.name as string)
            index > -1 && this.cachedTag.splice(index, 1)
        },
        /**
         * 删除所有被KeepAlive缓存的路由
         */
        delAllCachedView() {
            this.cachedTag = []
        }
    }
})
