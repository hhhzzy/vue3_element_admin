import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { shallowRef } from 'vue'

import Layout from '@/layout/Index.vue'
/**
 * 默认路由，不需要权限。比如：登录、注册等
 */
export const constRoutes: Array<AppRouteRecordRaw> = [
    {
        path: '/404',
        name: '404',
        meta: {
            hidden: true
        },
        component: () => import('@/views/Error/404.vue')
    },
    {
        path: '/',
        name: 'Home',
        component: shallowRef(Layout),
        redirect: '/home',
        meta: {
            icon: 'home',
            title: '首页',
            alwaysShow: false
        },
        children: [
            {
                path: 'home',
                name: 'Home',
                meta: {
                    icon: 'home',
                    title: '首页',
                    affix: true
                },
                component: () => import('@/views/Home/Home.vue')
            }
        ]
    },
    {
        path: '/components',
        name: 'Components',
        component: shallowRef(Layout),
        redirect: '/components/table',
        meta: {
            icon: 'components',
            title: '组件',
            alwaysShow: true
        },
        children: [
            {
                path: 'table',
                name: 'UseTable',
                meta: {
                    title: 'useTable'
                },
                component: () => import('@/views/Hooks/Table/UseTable.vue')
            },
            {
                path: 'upload',
                name: 'Upload',
                meta: {
                    title: 'useUpload'
                },
                component: () => import('@/views/Hooks/Upload/UseUpload.vue')
            },
            {
                path: 'form',
                name: 'Form',
                meta: {
                    title: 'useForm'
                },
                component: () => import('@/views/Hooks/Form/useForm.vue')
            },
            {
                path: 'icons',
                name: 'Icons',
                meta: {
                    title: '图标'
                },
                component: () => import('@/views/Icons/Icons.vue')
            },
            {
                path: 'countTo',
                name: 'CountTo',
                meta: {
                    title: '数字变化'
                },
                component: () => import('@/views/CountTo/CountTo.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            hidden: true
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/Login/Login.vue')
    },
    {
        path: '/redirect',
        name: 'Redirect',
        component: shallowRef(Layout),
        meta: {
            hidden: true,
            noCache: true,
            noTagsView: true
        },
        children: [
            {
                path: '/redirect/:path(.*)',
                name: 'Redirect',
                component: () => import(/* webpackChunkName: "about" */ '@/views/Redirect/Index.vue'),
                meta: {
                    hidden: true
                }
            }
        ]
    }
]
/**
 * 权限路由
 */
export const asyncRouter: AppRouteRecordRaw[] = [
    {
        path: '/permission',
        name: 'Permission',
        component: shallowRef(Layout),
        redirect: '/permission/user',
        meta: {
            title: '权限',
            icon: 'setup',
            roles: ['editor']
        },
        children: [
            {
                path: 'user',
                name: 'User',
                meta: {
                    title: '用户',
                    roles: ['editor']
                },
                component: () => import('@/views/Permission/User.vue')
            },
            {
                path: 'role',
                name: 'Role',
                meta: {
                    title: '角色',
                    roles: ['editor']
                },
                component: () => import('@/views/Permission/Role.vue')
            }
        ]
    },
    {
        path: '/level',
        name: 'Level',
        component: shallowRef(Layout),
        redirect: '/level/level_1/level_1_1',
        meta: {
            title: '菜单',
            icon: 'menu',
            roles: ['editor']
        },
        children: [
            {
                path: 'level_1',
                name: 'Level_1',
                meta: {
                    title: '菜单_1',
                    roles: ['editor']
                },
                redirect: '/level/level_1/level_1_1',
                children: [
                    {
                        path: 'level_1_1',
                        name: 'Level11',
                        meta: {
                            title: '菜单_1_1',
                            roles: ['editor']
                        },
                        component: () => import('@/views/Level/Level_1/Level_1_1.vue')
                    },
                    {
                        path: 'level_1_2',
                        name: 'Level12',
                        meta: {
                            title: '菜单_1_2',
                            roles: ['admin']
                        },
                        component: () => import('@/views/Level/Level_1/Level_1_2.vue')
                    },
                    {
                        path: 'level_1_3',
                        name: 'Level13',
                        meta: {
                            title: '菜单_1_3',
                            roles: ['editor']
                        },
                        component: () => import('@/views/Level/Level_1/Level_1_3.vue')
                    }
                ]
            },
            {
                path: 'level_2',
                name: 'Level2',
                meta: {
                    title: '菜单_2',
                    roles: ['editor']
                },
                component: () => import('@/views/Level/Level_2/Level_2.vue')
            },
            {
                path: 'level_3',
                name: 'Level3',
                meta: {
                    title: '菜单_3',
                    roles: ['admin']
                },
                component: () => import('@/views/Level/Level_3/Level_3.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        redirect: '/404',
        meta: { hidden: true, roles: ['editor'] }
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes: constRoutes as RouteRecordRaw[],
    scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
