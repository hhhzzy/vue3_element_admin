<template>
    <el-table-column :label="props.data?.label" :align="props.align" :header-align="props.headerAlign">
        <template v-for="(ele, i) in props.data?.children" :key="i">
            <!-- 渲染多级表头  -->
            <ElTableColumnRender v-if="ele.children" :key="i" :data="ele" :align="props.align" :header-align="props.headerAlign" />
            <el-table-column
                v-else
                :prop="ele.field"
                :show-overflow-tooltip="ele.field != 'action'"
                :align="props.align"
                :header-align="props.headerAlign"
                :label="ele.label"
                :width="ele.width"
                :formatter="ele?.formatter"
            />
        </template>
    </el-table-column>
</template>
<script lang="ts" setup>
    // import type { TableColums } from '@/types/table'
    interface TableColumnProps {
        data?: any
        align?: string
        headerAlign?: string
    }
    // 通过withDefaults设置默认值
    const props = defineProps<TableColumnProps>()
</script>
