// 分页
export interface Pagination {
    total?: number // 总数
    small?: boolean // 大小
    background?: boolean // 是否有背景
    defaultPageSize?: number // 每页显示条数的默认值
    pageSizes?: number[] // 每页显示个数选择器的选项设置
    pageSize?: number // 每页显示条目个数
    pageCount?: number // 总页数， total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性
    pagerCount?: number // 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠
    currentPage?: number // 当前页数
    defaultCurrentPage?: number // 当前页数的初始值
    layout?: string // 组件布局，子组件名用逗号分隔
    popperClass?: string // 每页显示个数选择器的下拉框类名
    prevText?: string // 替代图标显示的上一页文字
    nextText?: string // 替代图标显示的下一页文字
    disabled?: boolean // 是否禁用分页
    hideOnSinglePage?: boolean // 只有一页时是否隐藏
}
// 表头结构
export interface TableColums {
    label: string // 表头名称
    field: string // 唯一值，如需展示正确的数据，需要与 data 中的属性名对应
    width?: string | number // 表格每格内容的宽度
    children?: TableColums[] // 子项，用于多级表头
    formatter?: Function
}

// 表格组件的基础属性
export interface TableProps {
    pageSize: number // 每页显示个数
    currentPage: number // 当前页码数
    data: object[] // 表格数据
    columns: TableColums[] // 表头结构
    align?: string // 内容对齐方式
    headerAlign?: string // 表头对齐方式
    maxHeight?: number | string // 表格的流体高度，超出展示纵向滚动条
    height?: number | string // 表格高度，超出展示纵向滚动条
    loading: boolean // 表格加载展示滚动条
}
// 表格每行数据
export interface TableSlotDefault {
    row: TableColums
    column: any
    $index: number
}
