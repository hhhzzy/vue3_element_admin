<template>
    <div v-loading="props.loading">
        <el-table :data="props.data" border :max-height="props.maxHeight" :height="props.height" ref="elTableRef">
            <el-table-column type="selection" width="55" v-if="props.selection" />
            <el-table-column type="index" label="序号" width="65" align="center" fixed="left" />
            <template v-for="(item, index) in props.columns">
                <el-table-column
                    v-if="!item.children"
                    :key="item.field"
                    :prop="item.field"
                    :show-overflow-tooltip="item.field != 'action'"
                    :label="item.label"
                    :align="props.align"
                    :header-align="props.headerAlign"
                    :width="item.width"
                    :formatter="item?.formatter"
                >
                    <template #default="scope">
                        <!-- 操作按钮插槽 -->
                        <slot v-if="item.field == 'action'" name="action" v-bind="scope"></slot>
                    </template>
                </el-table-column>
                <!-- 渲染多级表头  -->
                <ElTableColumnRender v-else :data="item" :align="props.align" :key="index" :headerAlign="props.headerAlign" />
            </template>
        </el-table>
        <el-pagination v-model:current-page="currentPageRef" v-model:page-size="pageSizeRef" :page-sizes="pagination.pageSizes" :layout="pagination.layout" :total="props.total" />
    </div>
</template>
<script lang="ts" setup>
    import { ref, unref, watch, computed, onMounted } from 'vue'
    import type { TableColums } from '@/types/table'
    import ElTableColumnRender from './ElTableColumnRender.vue'
    interface TableProps {
        pageSize: number // 每页显示个数
        currentPage: number // 当前页码数
        total: number // 总的条数
        data: object[] // 表格数据
        columns: TableColums[] // 表头结构
        align?: string // 内容对齐方式
        headerAlign?: string // 表头对齐方式
        maxHeight?: number | string // 表格的流体高度，超出展示纵向滚动条
        height?: number | string // 表格高度，超出展示纵向滚动条
        loading: boolean // 表格加载展示滚动条
        pagination: object
        selection?: boolean // 是否开启多选，默认不开启
    }

    // 通过withDefaults设置默认值
    const props = withDefaults(defineProps<TableProps>(), {
        data: () => {
            return []
        },
        pagination: () => {
            return {}
        },
        selection: () => false
    })
    /**
     * 另一种默认值写法
     */
    // const props = defineProps({
    //     pageSize:Number,
    //     currentPage:Number,
    //     data:{
    //         type:Array,
    //         default:() => []
    //     }
    // })
    const elTableRef = ref()
    onMounted(() => {
        const tableRef = unref(elTableRef)
        emit('register', tableRef.$parent, elTableRef)
    })
    const pageSizeRef = ref(props.pageSize)
    const currentPageRef = ref(props.currentPage)
    const emit = defineEmits(['update:current-page', 'update:page-size', 'register'])
    const pagination = computed(() => {
        console.log(props, 655)
        return Object.assign(
            {
                small: false,
                background: false,
                pagerCount: 7,
                layout: 'sizes, prev, pager, next, jumper, ->, total',
                pageSizes: [10, 20, 30, 40, 50, 100],
                disabled: false,
                hideOnSinglePage: false
            },
            props.pagination
        )
    })
    console.log(pagination.value, 666666)
    /**
     * 监听父组件传过来的页码数的变化
     */
    watch(
        () => props.currentPage,
        (val: number) => {
            console.log(props, 888)
            currentPageRef.value = val
        }
    )
    /**
     * 监听父组件传过来的每页显示个数的变化
     */
    watch(
        () => props.pageSize,
        (val: number) => {
            console.log(props, 777)
            pageSizeRef.value = val
        }
    )
    /**
     * 监听每页显示个数变化，把变化值通过emit传到父组件,可以用@size-change方法代替
     */
    watch(
        () => pageSizeRef.value,
        (val: number) => {
            console.log(val, 33)
            emit('update:page-size', val)
        }
    )
    /**
     * @size-change="handleSizeChange"方法可代替上面的watch
     * const handleSizeChange = (val: number) => {
     *      console.log(val, 44)
     *      emit('update:page-size', val)
     * }
     */
    /**
     * 监听页码数的变化，把值通过emit传到父组件，可以用@current-change方法代替
     */
    watch(
        () => currentPageRef.value,
        (val: number) => {
            console.log(val, 33)
            emit('update:current-page', val)
        }
    )
    console.log(props, 222)
</script>
<style lang="less" scoped>
    .el-pagination {
        margin-top: 10px;
    }
</style>
