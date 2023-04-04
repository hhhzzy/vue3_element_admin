import { Module } from 'vuex'
import { IRooteState } from '../index'
import { Login } from '@/api/user/user'
import { ILoginData, IUserInfoRes } from '@/api/user/type'
import { setToken, removeToken } from '@/utils/cookies'

export interface IUserState {
    loginFormData: ILoginData
    token: string
    user: IUserInfoRes
}
export const store: Module<IUserState, IRooteState> = {
    namespaced: true,
    state: (): IUserState => ({
        loginFormData: {
            userName: '',
            password: ''
        },
        token: '',
        user: {
            roles: [],
            name: ''
        }
    }),
    actions: {
        /**
         * 登录接口
         */
        async Login({ commit }, formData: ILoginData) {
            const data = await Login(formData)
            const token = data.data?.token || ''
            setToken(token)
            commit('SET_TOKEN', token)
        },
        /**
         * 获取用户详情
         */
        async GetUserInfo({ commit }, token: string) {
            // const data = await GetUserInfo(token)
            const data = { roles: ['admin'], introduction: 'I am a super administrator', avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', name: 'Super Admin' }
            commit('SET_USER', data)
        },
        async Quit({ commit, rootState }) {
            await new Promise(resolve => {
                removeToken()
                commit('DEL_TOKEN')
                commit('DEL_USER')
                // 通过{ root: true }调用其他模块的actions或者mutations
                // 清除缓存的tag和cached
                commit('tagsView/DEL_ALL_VISITED_TAG', rootState.tagsView, { root: true })
                commit('tagsView/DEL_ALL_CACHED_VIEW', rootState.tagsView, { root: true })
                resolve(true)
            })
        }
    },
    mutations: {
        SET_TOKEN(state: IUserState, token: string) {
            state.token = token
        },
        SET_USER(state: IUserState, user: IUserInfoRes) {
            state.user = user
        },
        DEL_TOKEN(state: IUserState) {
            state.token = ''
        },
        DEL_USER(state: IUserState) {
            state.user = {
                roles: [],
                name: ''
            }
        }
    }
}
