import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'
/**
 * redirect:
 * name: 'route-name'  路由名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta: {
 *      hidden: false             当设置为true的时候该路由不会在侧边栏出现，入404、login
 *      alwaysShow: false         当路由的children子路由大于一个的时候会自动变成嵌套模式，只有一个路由时，会将子路由当做根路由显示在侧边栏。alwaysShow: true，不管有几个子路由，都会显示根路由
 *      title: 'title'            路由左侧导航和面包屑导航的名字
 *      icon: 'svg-icon'          左侧导航的图标
 *      noCache: false            如果设置为true，则不会被<keep-alive>缓存
 *      breadcrumb: true          设置为true，则不会在面包屑中显示
 *      activeMenu: '/dashboard'  显示高亮的路由路径
 *      roles: []                 路由权限
 *      affix: true               tag固定在导航上面，不可删除，该路由路由有children的话，不能把affix属性写在该路由上，只能写在对应的需要展示的子路由上面
 *      noTagsView: false         设置为true，不会出现在tag上面
 * }
 */
type Component<T = any> = ReturnType<typeof defineComponent> | (() => Promise<typeof import('*.vue')>) | (() => Promise<T>)
declare module 'vue-router' {
    declare interface RouteMeta {
        hidden?: boolean
        alwaysShow?: boolean
        title?: string
        icon?: string
        noCache?: boolean
        breadcrumb?: boolean
        activeMenu?: string
        roles?: string[]
        affix?: boolean
        noTagsView?: boolean
    }
}
declare global {
    declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
        name: string
        meta: RouteMeta
        component?: Component | string
        children?: AppRouteRecordRaw[]
    }
    declare interface AppCustomRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
        name: string
        meta: RouteMeta
        component: Component | string
        children?: AppCustomRouteRecordRaw[]
        redirect: string
        path: string
    }
}
