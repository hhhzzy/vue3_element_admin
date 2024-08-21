<template>
    <div class="top-box">
        <el-form :inline="true" class="search-form-inline">
            <el-form-item label="角色：">
                <el-input v-model="searchParams.nickname" placeholder="请输入角色名" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getRoleTable">查询</el-button>
                <el-button type="primary" @click="addRole">新增角色</el-button>
            </el-form-item>
        </el-form>
    </div>

    <div class="content">
        <Table
            id="exportTable"
            v-model:page-size="unref(tableObject).pageSize"
            v-model:page-number="unref(tableObject).pageNumber"
            v-model:total="unref(tableObject).total"
            :data="unref(tableObject).tableList"
            :columns="unref(columns)"
            :loading="unref(tableObject).loading"
            :pagination="unref(paginationObj)"
            :selection="true"
            :align="'center'"
            :header-align="'center'"
            @register="register"
        >
            <template #action="scope">
                <el-button type="primary" @click="handleEdit(scope)">编辑</el-button>
                <el-button type="primary" @click="editPermission(scope)">授权</el-button>
                <el-button type="danger" @click="handleDelete(scope)">删除</el-button>
            </template>
        </Table>
    </div>
    <!---   新增角色   -->
    <el-dialog v-model="roleDialogVisible" title="新增/编辑角色" width="600">
        <div class="user-info-box">
            <el-form ref="roleFormRef" :model="roleRuleForm" :rules="roleRules" label-width="100" status-icon>
                <el-form-item label="角色名：" prop="name">
                    <el-input v-model="roleRuleForm.name" />
                </el-form-item>
                <el-form-item label="角色昵称：" prop="nickname">
                    <el-input v-model="roleRuleForm.nickname" />
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="roleDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="sureAddRole(roleFormRef)">确认</el-button>
            </div>
        </template>
    </el-dialog>
    <!---   授权   -->
    <el-dialog v-model="permissionDialogVisible" title="授权" width="600">
        <el-tree
            v-if="permissionDialogVisible"
            ref="permissionTree"
            :data="permissionDataTree"
            show-checkbox
            node-key="id"
            :default-checked-keys="defaultCheckedKeys"
            :props="defaultProps"
        />
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="permissionDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="sureAddPermission">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
    import Table from '@/components/Table/Table.vue'
    import { onMounted, reactive, ref, unref } from 'vue'
    import { getRoleList, createRole, updateRole, getAllPermission, getRoleInfo, setPermission } from '@/api/role/role'
    import { useTable } from '@/hooks/useTable'
    import type { Pagination } from '@/types/table'
    import { FormInstance, ElMessage } from 'element-plus'

    const columns = reactive([
        {
            label: '角色名',
            field: 'name'
        },
        {
            label: '昵称',
            field: 'nickname'
        },
        {
            label: '操作',
            field: 'action',
            width: 300
        }
    ])
    const { methods, tableObject, register } = useTable({
        getListApi: getRoleList
    })
    const { getList, setSearchParams } = methods
    // 分页参数设置
    const paginationObj = ref<Pagination>()

    // 搜索条件参数
    const searchParams = reactive({
        nickname: ''
    })
    console.log(paginationObj, tableObject, 'paginationObj')
    // 表格一初始化查询接口
    const getRoleTable = async () => {
        setSearchParams(searchParams)
        await getList()
        console.log(tableObject, 999)
        paginationObj.value = {
            total: tableObject.total,
            pageSizes: [2, 4, 6, 8, 10]
        }
    }
    // 新增角色
    const roleDialogVisible = ref(false)
    const addOrEdit = ref('add')
    const roleRules = reactive({
        name: [{ required: true, message: '请输入角色名！', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入角色昵称！', trigger: 'blur' }]
    })
    let roleRuleForm = reactive({
        name: '',
        nickname: ''
    })
    const addRole = () => {
        roleRuleForm = Object.assign(roleRuleForm, {
            username: '',
            roleIds: []
        })
        roleDialogVisible.value = true
    }
    const roleFormRef = ref<FormInstance>()
    const sureAddRole = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate(async (valid, fields) => {
            if (valid) {
                let res
                const form = Object.assign({}, roleRuleForm)
                if (addOrEdit.value === 'add') {
                    res = await createRole(form)
                } else {
                    res = await updateRole(form)
                }
                if (res.code === 1) {
                    ElMessage.success('提交成功！')
                    roleDialogVisible.value = false
                    getRoleTable()
                }
                console.log('submit!', form)
            } else {
                console.log('error submit!', fields)
            }
        })
    }
    const handleEdit = (scope: any) => {
        addOrEdit.value = 'edit'
        roleDialogVisible.value = true
        roleRuleForm = Object.assign(roleRuleForm, scope.row)
    }
    // 授权
    const permissionDialogVisible = ref(false)
    const permissionDataTree = ref([])
    const defaultProps = ref({
        children: 'children',
        label: 'nickname'
    })
    // 获取所有权限
    const getPermissions = async () => {
        const res = await getAllPermission()
        permissionDataTree.value = res.data
    }
    const defaultCheckedKeys = ref([])
    const roleId = ref()
    const editPermission = async (scope: any) => {
        roleId.value = scope.row.id
        console.log(scope)
        // 获取当前用户的权限
        const res = await getRoleInfo(scope.row.id)
        const arr: any = []
        console.log(res.data)
        res.data.forEach((item: any) => {
            item.permissions.forEach((ele: any) => {
                if (ele.children && ele.children.length) {
                    ele.children.forEach((v: any) => {
                        console.log(v, 222)
                        arr.push(v.id)
                    })
                } else {
                    arr.push(ele.id)
                }
            })
        })
        defaultCheckedKeys.value = arr
        console.log(res, arr, defaultCheckedKeys.value)
        permissionDialogVisible.value = true
        console.log(scope)
    }
    // 确认授权
    const permissionTree = ref()
    const sureAddPermission = async () => {
        console.log(permissionTree.value.getCheckedKeys(), permissionTree.value.getHalfCheckedKeys())
        const arr = [].concat(permissionTree.value.getCheckedKeys(), permissionTree.value.getHalfCheckedKeys())
        const res = await setPermission({ roleId: roleId.value, permissionIds: arr })
        if (res.code === 1) {
            ElMessage.success('授权成功！')
            permissionDialogVisible.value = false
        }
        console.log(res)
    }
    onMounted(async () => {
        await getPermissions()
        getRoleTable()
    })
</script>
<style lang="less" scoped>
    .top-box {
        background-color: #fff;
        padding: 15px 10px 0 10px;
    }
    .content {
        margin-top: 20px;
        background-color: #fff;
        padding: 10px;
    }
    /deep/ .el-dialog__header {
        border-bottom: 1px solid #e8eaec;
        margin-right: 0;
    }
    /deep/ .el-dialog__footer {
        border-top: 1px solid #e8eaec;
    }
</style>
