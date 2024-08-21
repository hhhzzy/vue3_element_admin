import { http } from '@/utils/http'
import { ILoginData, ILoginRes, IUserInfoRes, ITableResult } from './type'
/**
 * 登录接口
 */
export const Login = (user: ILoginData) => {
    return http.post<ILoginRes>('/api/login', user)
}
/**
 * 获取用户详情接口
 */
export const GetUserInfo = () => {
    return http.get<IUserInfoRes>('/user/getRoleAndPermission')
}
/**
 * 获取用户列表
 * @param data
 * @returns
 */
export const getUserList = (data: object) => {
    return http.get<ITableResult>('/user/getList', data)
}
/**
 * 新增用户
 * @param data 用户数据
 * @returns Boolean值
 */
export const createUser = (data: object) => {
    return http.post<boolean>('/user/create', data)
}
export const updateUser = (data: object) => {
    return http.put<boolean>('/user/update', data)
}
/**
 * 删除用户
 * @param id
 * @returns
 */
export const deleteUser = (id: number) => {
    return http.delete<boolean>('/user/delete', { id: id })
}
