import { Module } from 'vuex'
import { IRooteState } from '../index'
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
export const store: Module<ITagsViewState, IRooteState> = {
    namespaced: true,
    state: (): ITagsViewState => ({
        visitedTag: [],
        cachedTag: []
    }),
    actions: {
        /**
         * 增加默认的tag
         */
        addVisitedTag({ commit }, route) {
            commit('ADD_VISITED_TAG', route)
        },
        /**
         * 点击路由，增加tag
         */
        addTag({ commit }, route) {
            commit('ADD_VISITED_TAG', route)
            commit('ADD_CACHED_VIEW', route)
        },
        /**
         * 删除tag
         */
        delTag({ commit }, route) {
            commit('DEL_VISITED_TAG', route)
            commit('DEL_CACHED_VIEW', route)
        },
        /**
         * 删除单个缓存
         * @param param0
         * @param route
         */
        delCachedTag({ commit }, route) {
            commit('DEL_CACHED_VIEW', route)
        }
    },
    mutations: {
        /**
         * 增加默认的tag
         * @param state
         * @param route  当前路由
         * @returns
         */
        ADD_VISITED_TAG(state: ITagsViewState, route) {
            // 判断当前路由是否需要显示在tag上
            if (route.meta.noTagsView) return
            // 判断当前点击的路由是否已经存在，并且当前点击路由的参数是否和已经存在的路由参数相同。不同则更新
            const bool = state.visitedTag.some((v, index) => {
                return v.path === route.path
            })
            if (bool) {
                state.visitedTag = state.visitedTag.map(item => {
                    if (item.path === route.path) {
                        item.query = route.query
                        item.fullPath = route.fullPath
                    }
                    return item
                })
                return
            }
            state.visitedTag.push(
                Object.assign({}, route, {
                    title: route.meta.title || 'no-name'
                })
            )
        },
        /**
         * 删除tag
         */
        DEL_VISITED_TAG(state: ITagsViewState, route) {
            for (const [i, v] of state.visitedTag.entries()) {
                if (v.path === route.path) {
                    state.visitedTag.splice(i, 1)
                    break
                }
            }
        },
        /**
         * 删除所有tag
         * @param state
         */
        DEL_ALL_VISITED_TAG(state: ITagsViewState) {
            state.visitedTag = []
        },
        /**
         * 增加被KeepAlive缓存的路由
         */
        ADD_CACHED_VIEW(state: ITagsViewState, route) {
            if (route.name === null) return
            if (state.cachedTag.includes(route.name)) return
            if (!route.meta.noCache) {
                state.cachedTag.push(route.name)
            }
        },
        /**
         * 删除单个被KeepAlive缓存的路由
         */
        DEL_CACHED_VIEW(state: ITagsViewState, route) {
            if (route.name === null) return
            const index = state.cachedTag.indexOf(route.name)
            index > -1 && state.cachedTag.splice(index, 1)
        },
        /**
         * 删除所有被KeepAlive缓存的路由
         */
        DEL_ALL_CACHED_VIEW(state: ITagsViewState) {
            state.cachedTag = []
        }
    }
}
