import { reactive, unref, computed, watch, ref, nextTick } from 'vue'
// import {exportExcel} from './useExport'

interface TableObject<T = any> {
    pageSize: number // 每页显示个数
    pageNumber: number // 当前页码数
    total: number
    tableList: T[]
    params: object
    loading: boolean
}
interface TableResponse<T = any> {
    total: number
    items: T[]
    pageNumber: number
    pageSize: number
}
interface UseTableConfig<T = any> {
    getListApi: (option: any) => Promise<IResultData<TableResponse<T>>>
}
export const useTable = <T = any>(config?: UseTableConfig<T>) => {
    // 表格的默认参数配置
    const tableObject = reactive<TableObject<T>>({
        pageSize: 2, // 每页显示个数
        pageNumber: 1, // 当前页码数
        total: 10, // 总数
        tableList: [], // 表格数据
        params: {}, // 查询条件
        loading: true // 加载中
    })
    const searchParams = computed(() => {
        console.log(
            {
                ...tableObject.params,
                pageSize: tableObject.pageSize,
                pageNumber: tableObject.pageNumber
            },
            2222
        )
        return {
            ...tableObject.params,
            pageSize: tableObject.pageSize,
            pageNumber: tableObject.pageNumber
        }
    })
    // 监听每页显示个数的变化
    watch(
        () => tableObject.pageSize,
        () => {
            // 当前页数为第一页时，重新获取数据
            if (tableObject.pageNumber === 1) {
                methods.getList()
            }
            console.log(tableObject.pageSize, tableObject.pageNumber, 3333)
        }
    )
    // 监听页码数的变化
    watch(
        () => tableObject.pageNumber,
        async (val: number) => {
            console.log(val, 4444)
            await methods.getList()
            console.log(val, 4444)
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
            console.log(res, tableObject, searchParams, 555555)
            tableObject.tableList = res?.data?.items as any
            tableObject.total = res?.data?.total as number
            tableObject.loading = false
        },
        /**
         * 设置查询参数
         */
        setSearchParams: (data: object) => {
            tableObject.pageNumber = 1
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
