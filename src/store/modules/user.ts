import { defineStore } from 'pinia'
import { ILoginData, IUserInfoRes } from '@/api/user/type'
import { Login, GetUserInfo } from '@/api/user/user'
import { setToken, removeToken } from '@/utils/cookies'
import { useTagsViewStore } from './tagsView'
export interface IUserState {
    loginFormData: ILoginData
    token: string
    user: IUserInfoRes
    permission: string[]
}
export const useUserStore = defineStore('user', {
    state: (): IUserState => {
        return {
            loginFormData: {
                username: '',
                password: ''
            },
            token: '',
            user: {
                roles: [],
                name: ''
            },
            permission: []
        }
    },
    getters: {},
    actions: {
        /**
         * 登录
         * @param formData 接口参数
         */
        async Login(formData: ILoginData) {
            const data = await Login(formData).catch(err => {
                console.log(err)
                return err
            })
            if (data.code === 1) {
                const token = data.data || ''
                setToken(token)
                this.token = token
                return true
            }
        },
        /**
         * 获取用户详细信息
         * @param token
         */
        async GetUserInfo() {
            const res = await GetUserInfo()
            console.log(res, 222)
            // const data = { roles: ['admin'], introduction: 'I am a super administrator', avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', name: 'Super Admin' }
            if (res.code === 1) {
                const tmp: [] = []
                const rolesArr: string[] = []
                // 递归获取用户角色权限信息
                recRoles(res.data?.roles as [], tmp)
                if (tmp && tmp.length) {
                    tmp.forEach((item: { name: string }) => {
                        rolesArr.push(item.name)
                    })
                }
                console.log(tmp, rolesArr, 999)
                this.permission = rolesArr
                this.user = res.data as any
            }
        },
        /**
         * 退出
         * @param param0
         */
        async Quit() {
            await new Promise(resolve => {
                removeToken()
                const tagsViewStore = useTagsViewStore()
                this.token = ''
                this.user = {
                    roles: [],
                    name: ''
                }
                // // 通过{ root: true }调用其他模块的actions或者mutations
                // // 清除缓存的tag和cached
                tagsViewStore.delAllCachedView()
                tagsViewStore.delAllVisitedTag()
                resolve(true)
            })
        }
    }
})
// 递归
function recRoles(data: [], tmp: object[]) {
    if (data && data.length) {
        data.forEach((item: { permissions: [] }) => {
            if (item.permissions) {
                tmp.push(item)
                recRoles(item.permissions, tmp)
            } else {
                tmp.push(item)
            }
        })
    }
}
