import { http } from '@/utils/http'
import { ITableData, ITableRes } from './type'
export const GetList = (query: ITableData) => {
    return http.post<ITableRes>('/api/table/getList', query)
}
