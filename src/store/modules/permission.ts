import { defineStore } from 'pinia'
import { asyncRouter, constRoutes } from '@/router/router'
export interface IPermissionRoutesState {
    rotues: AppRouteRecordRaw[] // 所有的路由
    dynamicRoutes: AppRouteRecordRaw[] // 筛选出来的权限路由
}
export const usePermissionStore = defineStore('permission', {
    state: (): IPermissionRoutesState => ({
        rotues: [],
        dynamicRoutes: []
    }),
    getters: {},
    actions: {
        async GetDynamicRouters(roles: string[]) {
            let dynamicRouters: AppRouteRecordRaw[] = []
            if (roles.includes('admin')) {
                // admin  超级管理员
                dynamicRouters = asyncRouter
            } else {
                // 其他角色
                dynamicRouters = filterRouter(asyncRouter, roles)
            }
            this.rotues = constRoutes.concat(dynamicRouters)
            this.dynamicRoutes = dynamicRouters
        }
    }
})
/**
 * 筛选出对应权限的路由
 * @param {*} routes 传过来的所有需要权限验证的路由
 * @param {*} roles  用户所具有的的权限
 */
export function filterRouter(asyncRouter: AppRouteRecordRaw[], roles: string[]) {
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
export function getPermission(route: AppCustomRouteRecordRaw, roles: string[]) {
    if (route && route.meta && route.meta.roles) {
        return roles.some(value => {
            return route.meta.roles?.includes(value)
        })
    } else {
        return false
    }
}
