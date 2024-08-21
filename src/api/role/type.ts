/**
 * 用户列表返回参数类型
 */
export interface IRoleData {
    id: number
    name: string
    nickname: string
}

export interface ITableResult {
    total: number
    items: IRoleData[]
    pageNumber: number
    pageSize: number
}
