import { defineStore } from 'pinia'
import { ILoginData, IUserInfoRes } from '@/api/user/type'
import { Login, GetUserInfo } from '@/api/user/user'
import { setToken, removeToken } from '@/utils/cookies'
import { useTagsViewStore } from './tagsView'
export interface IUserState {
    loginFormData: ILoginData
    token: string
    user: IUserInfoRes
}
export const useUserStore = defineStore('user', {
    state: (): IUserState => {
        return {
            loginFormData: {
                userName: '',
                password: ''
            },
            token: '',
            user: {
                roles: [],
                name: ''
            }
        }
    },
    getters: {},
    actions: {
        /**
         * 登录
         * @param formData 接口参数
         */
        async Login(formData: ILoginData) {
            const data = await Login(formData)
            console.log(data)
            const token = data.data?.token || ''
            setToken(token)
            this.token = token
        },
        /**
         * 获取用户详细信息
         * @param token
         */
        async GetUserInfo(token: string) {
            const data = await GetUserInfo(token)
            console.log(data)
            // const data = { roles: ['admin'], introduction: 'I am a super administrator', avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', name: 'Super Admin' }
            this.user = data.data!
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
