import router from './router'
import type { RouteRecordRaw } from 'vue-router'
import { getToken } from '@/utils/cookies'
import { store } from '@/store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 定义进度条
NProgress.configure({ showSpinner: false })
// 路由导航
router.beforeEach(async (to, from, next) => {
    /**
     * 通过接口返回的用户权限动态设置左侧路由
     */
    // 进度条开始
    NProgress.start()
    // 判断是否登录成功，即有token
    const token = getToken()
    console.log(to, from, 99999)
    if (token) {
        // 有token，进入首页
        if (to.path === '/login') {
            next('/')
            NProgress.done()
        } else {
            /**
             * 判断是否有用户数据
             * 1.没有：没有用户数据 => 第一次登录，需要获取用户数据
             * 2.有：已经登录成功 => 只需要跳转路由
             */
            const hasRole = store.state.user.user.roles
            if (hasRole.length) {
                //
                next()
            } else {
                // 获取用户详情信息 获取用户角色
                await store.dispatch('user/GetUserInfo', token)
                const roles = store.state.user.user.roles
                // 根据用户角色 动态设置路由
                await store.dispatch('permission/GetDynamicRouters', roles)
                const accessRoutes = store.state.permission.rotues
                /**
                 * 因为路由动态加载，每次在添加的时候没有删除原有的路由，所以每次在添加的时候要删除原有的路由
                 * 解决路由重复问题：vue-router.esm.js?8c4f:16 [vue-router] Duplicate named routes definition
                 */
                // ;(router as any).matcher = (new Router() as any).matcher
                accessRoutes.forEach(route => {
                    router.addRoute(route as RouteRecordRaw)
                })
                console.log(router.getRoutes(), 8888999)
                // hack方法 确保addRoutes已完成
                // 设置replace：true。确保导航不会留下历史记录
                if (to.path === to.query.redirect) {
                    router.replace(to.path)
                } else {
                    next({ ...to, replace: true })
                }
            }
        }
    } else {
        /**
         * 跳转到登录页面
         * 判断进入的页面是否为login，否则会造成死循环
         * 离开当前页面的时候带上当前页面的路由，以便登录成功后返回该页面
         */
        if (to.path !== '/login') {
            next(`/login?redirect=${to.path}`)
        } else {
            next()
        }
    }
})
router.afterEach(() => {
    // 停止进度条
    NProgress.done()
    ;(document.getElementById('loading') as any).style.display = 'none'
})
export default router
