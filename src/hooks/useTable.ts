import { reactive, unref, computed, watch, ref, nextTick } from 'vue'
// import {exportExcel} from './useExport'

interface TableObject<T = any> {
    pageSize: number
    currentPage: number
    total: number
    tableList: T[]
    params: object
    loading: boolean
}
interface TableResponse<T = any> {
    total: number
    list: T[]
    pageNumber: number
    pageSize: number
}
interface UseTableConfig<T = any> {
    getListApi: (option: any) => Promise<IResultData<TableResponse<T>>>
}
export const useTable = <T = any>(config?: UseTableConfig<T>) => {
    // 表格的默认参数配置
    const tableObject = reactive<TableObject<T>>({
        pageSize: 10, // 每页显示个数
        currentPage: 1, // 当前页码数
        total: 10, // 总数
        tableList: [], // 表格数据
        params: {}, // 查询条件
        loading: true // 加载中
    })
    const searchParams = computed(() => {
        console.log(tableObject, 2222)
        return {
            ...tableObject.params,
            pageSize: tableObject.pageSize,
            currentPage: tableObject.currentPage
        }
    })
    // 监听每页显示个数的变化
    watch(
        () => tableObject.pageSize,
        () => {
            console.log(tableObject.pageSize, 3333)
            // 当前页数不为第一页时，设置为第一页，触发监听页码数的watch，重新获取数据
            if (tableObject.currentPage === 1) {
                methods.getList()
            } else {
                tableObject.currentPage = 1
            }
        }
    )
    // 监听页码数的变化
    watch(
        () => tableObject.currentPage,
        () => {
            console.log(tableObject, 4444)
            methods.getList()
        }
    )
    const methods = {
        /**
         * 获取表格数据
         */
        getList: async () => {
            tableObject.loading = true
            console.log(searchParams.value, 'searchParams')
            const res = await config?.getListApi(unref(searchParams))
            tableObject.tableList = res?.data?.list as any
            tableObject.total = res?.data?.total as number
            tableObject.loading = false
            console.log(res, tableObject, searchParams, 555555)
        },
        /**
         * 设置查询参数
         */
        setSearchParams: (data: object) => {
            tableObject.currentPage = 1
            tableObject.params = Object.assign(tableObject.params, {
                pageSize: tableObject.pageSize,
                ...data
            })
            console.log(tableObject, data, 1111)
        },
        /**
         * 获取当前table选中行
         * @returns 当前选中的行数据
         */
        getSelections: async () => {
            const table = await getTable()
            return unref(table).getSelectionRows()
        }
    }
    // Table实例
    const tableRef = ref()
    // ElTable实例
    const elTableRef = ref()
    // 注册当前table，使得同一个页面可以使用多个table
    const register = (ref: any, elRef: any) => {
        tableRef.value = ref
        elTableRef.value = elRef
    }
    // 获取当前table
    const getTable = async () => {
        await nextTick()
        const table = unref(elTableRef)
        if (!table) {
            console.log('没有找到当前table实例')
        }
        return table
    }
    return {
        methods,
        tableObject,
        register
    }
}
