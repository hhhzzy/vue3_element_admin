import { Module } from 'vuex'
import { IRooteState } from '../index'
import { asyncRouter, constRoutes } from '@/router/router'
export interface IPermissionRoutesState {
    rotues: AppRouteRecordRaw[] // 所有的路由
    dynamicRoutes: AppRouteRecordRaw[] // 筛选出来的权限路由
}
export const store: Module<IPermissionRoutesState, IRooteState> = {
    namespaced: true,
    state: (): IPermissionRoutesState => ({
        rotues: [],
        dynamicRoutes: []
    }),
    actions: {
        /**
         * 计算动态路由
         */
        async GetDynamicRouters({ commit }, roles) {
            let dynamicRouters: AppRouteRecordRaw[] = []
            if (roles.includes('admin')) {
                // admin  超级管理员
                dynamicRouters = asyncRouter
            } else {
                // 其他角色
                dynamicRouters = filterRouter(asyncRouter, roles)
            }
            commit('SET_ROUTERS', dynamicRouters)
        }
    },
    mutations: {
        SET_ROUTERS(state: IPermissionRoutesState, routes: AppRouteRecordRaw[]) {
            state.rotues = constRoutes.concat(routes)
            state.dynamicRoutes = routes
        }
    }
}
/**
 * 筛选出对应权限的路由
 * @param {*} routes 传过来的所有需要权限验证的路由
 * @param {*} roles  用户所具有的的权限
 */
export function filterRouter(asyncRouter: AppRouteRecordRaw[], roles: []) {
    const res: AppRouteRecordRaw[] = []
    asyncRouter.forEach(item => {
        const temp = { ...item }
        if (getPermission(temp as AppCustomRouteRecordRaw, roles)) {
            if (item.children) {
                temp.children = filterRouter(item.children, roles)
            }
            res.push(temp)
        }
    })
    return res
}
/**
 * 判断该路由是否有权限
 * @param {*} route 单个有权限的路由
 * @param {*} roles 用户的权限
 */
export function getPermission(route: AppCustomRouteRecordRaw, roles: []) {
    if (route && route.meta && route.meta.roles) {
        return roles.some(value => {
            return route.meta.roles?.includes(value)
        })
    } else {
        return false
    }
}
