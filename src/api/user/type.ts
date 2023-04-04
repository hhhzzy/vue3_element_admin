/**
 * 登录接口参数类型
 */
export interface ILoginData {
    userName: string
    password: string
}
/**
 * 登录接口返回值类型
 */
export interface ILoginRes {
    token: string
}
/**
 * 用户详情接口返回值类型
 */
export interface IUserInfoRes {
    roles: string[]
    name: string
}
