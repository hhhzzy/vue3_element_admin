import { http } from '@/utils/http'
import { ILoginData, ILoginRes, IUserInfoRes } from './type'
/**
 * 登录接口
 */
export const Login = (user: ILoginData) => {
    return http.post<ILoginRes>('/api/login', user)
}
/**
 * 获取用户详情接口
 */
export const GetUserInfo = (token: string) => {
    return http.post<IUserInfoRes>('/api/getUserInfo', { token: token })
}
