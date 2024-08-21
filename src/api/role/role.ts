import { http } from '@/utils/http'
import { ITableResult, IRoleData } from './type'
/**
 * 获取角色列表 -分页
 * @returns
 */
export const getRoleList = (data: object) => {
    return http.get<ITableResult>('/role/getRoleList', data)
}
/**
 * 获取所有角色列表
 * @returns
 */
export const getAllRoleList = () => {
    return http.get<IRoleData[]>('/role/getList')
}

/**
 * 新增角色
 * @param data 角色数据
 * @returns Boolean值
 */
export const createRole = (data: object) => {
    return http.post<boolean>('/role/create', data)
}
/**
 * 修改角色
 * @param data
 * @returns
 */
export const updateRole = (data: object) => {
    return http.put<boolean>('/role/update', data)
}
/**
 * 获取所有权限树
 * @returns
 */
export const getAllPermission = () => {
    return http.get('/permission/getAllPermission')
}

/**
 * 获取当前角色权限
 * @returns
 */
export const getRoleInfo = (id: string) => {
    return http.get('/role/getRole', { id: id })
}

export const setPermission = (obj: object) => {
    return http.post('/role/setPermission', obj)
}
