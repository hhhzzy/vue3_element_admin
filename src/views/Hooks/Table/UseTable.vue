<template>
    <el-card class="box-card" style="margin-bottom: 10px">
        <template #header>
            <div class="card-header">
                <span>useTable示例一</span>
            </div>
        </template>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="作者：">
                <el-input v-model="searchParams.author" placeholder="请输入作者名字" />
            </el-form-item>
            <el-form-item label="权重：">
                <el-select placeholder="请选择权重" v-model="searchParams.importance">
                    <el-option label="重要" value="1" />
                    <el-option label="还行" value="2" />
                    <el-option label="一般" value="3" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchList">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getSelection">获取选中数据行</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="ExportTable2Excel">导出（Table2Excel）</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="ExportJson2Excel">导出（Json2Excel）</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="ExportFileStream2Excel">导出（FileStream2Excel）</el-button>
            </el-form-item>
        </el-form>
        <Table
            v-model:page-size="unref(tableObject).pageSize"
            v-model:current-page="unref(tableObject).currentPage"
            v-model:total="unref(tableObject).total"
            :align="'center'"
            :header-align="'center'"
            :max-height="300"
            :data="unref(tableObject).tableList"
            :columns="unref(columns)"
            :loading="unref(tableObject).loading"
            :pagination="unref(paginationObj)"
            :selection="true"
            @register="register"
            id="exportTable"
        >
            <template #action="scope">
                <el-button type="primary" @click="handleClick(scope)">add</el-button>
                <el-button type="danger" @click="handleDelete(scope)">delete</el-button>
            </template>
        </Table>
    </el-card>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>useTable示例二</span>
            </div>
        </template>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="作者：">
                <el-input v-model="searchParams2.author" placeholder="请输入作者名字" />
            </el-form-item>
            <el-form-item label="权重：">
                <el-select placeholder="请选择权重" v-model="searchParams2.importance">
                    <el-option label="重要" value="1" />
                    <el-option label="还行" value="2" />
                    <el-option label="一般" value="3" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchList2">搜索</el-button>
            </el-form-item>
        </el-form>
        <Table
            v-model:page-size="unref(tableObject2).pageSize"
            v-model:current-page="unref(tableObject2).currentPage"
            :total="unref(tableObject2).total"
            :align="'center'"
            :header-align="'center'"
            :max-height="300"
            :data="unref(tableObject2).tableList"
            :columns="unref(columns)"
            :loading="unref(tableObject2).loading"
            :pagination="unref(paginationObj2)"
            @register="register2"
        />
    </el-card>
</template>
<script lang="ts">
    export default {
        name: 'Table'
    }
</script>
<script lang="ts" setup>
    import Table from '@/components/Table/Table.vue'
    import { GetList } from '@/api/table/table'
    import { useTable } from '@/hooks/useTable'
    import { reactive, unref, ref, onMounted, h } from 'vue'
    import type { Pagination, TableSlotDefault } from '@/types/table'
    import { ElMessage, ElTag } from 'element-plus'
    import { useExport } from '@/hooks/useExport'

    const columns = reactive([
        {
            label: 'id',
            field: 'id',
            width: 80
        },
        {
            label: '作者',
            field: 'author',
            width: 80
        },
        {
            label: '标题',
            field: 'title',
            width: '300'
        },
        {
            label: '内容',
            field: 'content',
            width: '200'
        },
        {
            label: '信息',
            field: 'information',
            children: [
                {
                    label: '姓名',
                    field: 'name',
                    children: [
                        {
                            label: '姓',
                            field: 'firstName',
                            width: '100',
                            formatter: (value: any) => {
                                return h(
                                    ElTag,
                                    {
                                        type: 'success'
                                    },
                                    () => value.firstName
                                )
                            }
                        },
                        {
                            label: '名',
                            field: 'lastName',
                            width: '100',
                            formatter: (value: any) => {
                                return h(
                                    ElTag,
                                    {
                                        type: 'success'
                                    },
                                    () => value.lastName
                                )
                            }
                        }
                    ]
                },
                {
                    label: '地址',
                    field: 'address',
                    width: '200'
                },
                {
                    label: 'IP',
                    field: 'ip'
                }
            ]
        },
        {
            label: '权重',
            field: 'importance',
            width: '80',
            formatter: (value: any) => {
                return h(
                    ElTag,
                    {
                        type: value.importance === 1 ? 'success' : value.importance === 2 ? 'warning' : 'danger'
                    },
                    () => (value.importance === 1 ? '重要' : value.importance === 2 ? '还行' : '一般')
                )
            }
        },
        {
            label: '创建时间',
            field: 'display_time',
            width: '200',
            formatter: (value: any) => {
                return h('span', value.display_time)
            }
        },
        {
            label: '阅读数',
            field: 'pageviews'
        },
        {
            label: '操作',
            field: 'action',
            width: 200
        }
    ])
    // 表格一
    const { methods, tableObject, register } = useTable({
        getListApi: GetList
    })
    const { getList, setSearchParams } = methods
    // 表格一分页参数设置
    const paginationObj = ref<Pagination>()
    // 表格一搜索条件参数
    const searchParams = reactive({
        author: '',
        importance: null
    })
    // 表格一初始化查询接口
    const searchList = async () => {
        setSearchParams(searchParams)
        await getList()
        paginationObj.value = {
            total: tableObject.total
        }
    }
    onMounted(async () => {
        searchList()
    })
    // 表格二
    const {
        methods: methods2,
        tableObject: tableObject2,
        register: register2
    } = useTable({
        getListApi: GetList
    })
    const { getList: getList2, setSearchParams: setSearchParams2 } = methods2
    // 表格二分页参数设置
    const paginationObj2 = ref<Pagination>()
    // 表格二搜索条件参数
    const searchParams2 = reactive({
        author: '',
        importance: null
    })
    // 表格二初始化查询接口
    const searchList2 = async () => {
        setSearchParams2(searchParams2)
        await getList2()
        paginationObj2.value = {
            pageSizes: [40, 60, 80, 100]
        }
        console.log(paginationObj2, 'paginationObj2')
    }
    onMounted(async () => {
        tableObject2.pageSize = 40
        paginationObj2.value = {
            pageSizes: [40, 60, 80, 100]
        }
        // getList2()
        console.log(methods2, unref(tableObject2), unref(paginationObj2), 2222)
    })
    // 删除-编辑按钮事件
    const handleClick = (scope: TableSlotDefault) => {
        console.log(scope)
        ElMessage({
            message: '添加',
            type: 'success'
        })
    }
    const handleDelete = (scope: TableSlotDefault) => {
        ElMessage({
            message: '删除',
            type: 'error'
        })
    }
    const getSelection = async () => {
        const selectionArr = await methods.getSelections()
        console.log(selectionArr)
    }
    // 导出hooks
    const { methods: exportMethods } = useExport()
    const ExportTable2Excel = () => {
        // 导出table
        exportMethods.exportTable2Excel('exportTable')
    }
    const ExportJson2Excel = async () => {
        const multiHeader = [
            ['序号', 'id', '作者', '标题', '内容', '信息', '', '', '', '权重', '创建时间', '阅读数'],
            ['', '', '', '', '', '姓名', '', '地址', 'IP', '', '', '']
        ]
        const header = ['', '', '', '', '', '姓', '名', '', '', '', '', '']
        const filterVal = ['index', 'id', 'author', 'title', 'content', 'firstName', 'lastName', 'address', 'ip', 'importance', 'display_time', 'pageviews']
        await getList()
        const merges = ['A1:A3', 'B1:B3', 'C1:C3', 'D1:D3', 'E1:E3', 'J1:J3', 'K1:K3', 'L1:L3', 'M1:M3', 'F1:I1', 'F2:G2', 'H2:H3', 'I2:I3']
        exportMethods.exportJson2Excel(tableObject.tableList, header, multiHeader, merges, filterVal, '工资')
    }
    const ExportFileStream2Excel = () => {
        exportMethods.exportFileStream2Excel('http://pm.cqdky.com:9903/api/ContractFile/ExportAllMainContractAsync?&SignDate=', '555')
    }
</script>
