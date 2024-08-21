<template>
    <div class="top-box">
        <el-form :inline="true" class="search-form-inline">
            <el-form-item label="姓名：">
                <el-input v-model="searchParams.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getUserTable">查询</el-button>
                <el-button type="primary" @click="addUser">新增用户</el-button>
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
                <el-button type="danger" @click="handleDelete(scope)">删除</el-button>
            </template>
        </Table>
        <!---   新增用户   -->
        <el-dialog v-model="userDialogVisible" title="新增/编辑用户" width="600">
            <el-tabs v-model="userActiveName">
                <el-tab-pane label="用户详情" name="user" />
                <el-tab-pane label="用户角色" name="role" />
            </el-tabs>
            <div class="user-info-box" v-show="userActiveName == 'user'">
                <el-form ref="ruleFormRef" :model="userRuleForm" :rules="userRules" label-width="auto" status-icon>
                    <el-form-item label="用户名：" prop="username">
                        <el-input v-model="userRuleForm.username" />
                    </el-form-item>
                </el-form>
            </div>
            <div class="role-box" v-show="userActiveName == 'role'">
                <el-checkbox-group v-model="roleCheckList">
                    <el-checkbox :label="item.id" :value="item.id" v-for="(item, index) in roleList" :key="index">{{ item.nickname }}</el-checkbox>
                </el-checkbox-group>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="userDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="sureAddUser(ruleFormRef)">确认</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
    import Table from '@/components/Table/Table.vue'
    import { getUserList, createUser, deleteUser, updateUser } from '@/api/user/user'
    import { getAllRoleList } from '@/api/role/role'
    import { IRoleData } from '@/api/role/type'
    import { useTable } from '@/hooks/useTable'
    import type { Pagination } from '@/types/table'
    import { onMounted, ref, reactive, unref, h } from 'vue'
    import { ElTag, FormInstance, ElMessage, ElMessageBox } from 'element-plus'
    const columns = reactive([
        {
            label: '用户名',
            field: 'username'
        },
        {
            label: '角色',
            field: 'username',
            formatter: (value: any) => {
                return h('div', [
                    value.roles.map((item: any) => {
                        return h(
                            ElTag,
                            {
                                style: { marginRight: '10px' }
                            },
                            () => item.nickname
                        )
                    })
                ])
            }
        },
        {
            label: '操作',
            field: 'action',
            width: 200
        }
    ])
    const { methods, tableObject, register } = useTable({
        getListApi: getUserList
    })
    const { getList, setSearchParams } = methods
    // 分页参数设置
    const paginationObj = ref<Pagination>()

    // 搜索条件参数
    const searchParams = reactive({
        username: ''
    })
    console.log(paginationObj, tableObject, 'paginationObj')
    // 表格一初始化查询接口
    const getUserTable = async () => {
        setSearchParams(searchParams)
        await getList()
        console.log(tableObject, 999)
        paginationObj.value = {
            total: tableObject.total,
            pageSizes: [2, 4, 6, 8, 10]
        }
    }
    // 新增用户
    const userDialogVisible = ref(false)
    const userActiveName = ref('user')
    const addOrEdit = ref('add')
    const userRules = reactive({
        username: [{ required: true, message: '请输入用户名！', trigger: 'blur' }]
    })
    let userRuleForm = reactive({
        username: '',
        roleIds: []
    })
    // 已选中的角色
    const roleCheckList = ref<number[]>([])
    const addUser = () => {
        userDialogVisible.value = !userDialogVisible.value
        addOrEdit.value = 'add'
        userRuleForm = Object.assign(userRuleForm, {
            username: '',
            roleIds: []
        })
        roleCheckList.value = []
    }
    // 用户保存
    const ruleFormRef = ref<FormInstance>()
    const sureAddUser = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate(async (valid, fields) => {
            if (valid && roleCheckList.value.length) {
                console.log(userRuleForm, roleCheckList)
                userRuleForm.roleIds = roleCheckList.value as any
                const form = Object.assign({}, userRuleForm)
                console.log(form)
                let res: any
                if (addOrEdit.value === 'edit') {
                    res = await updateUser(form)
                } else {
                    res = await createUser(form)
                }
                if (res.code === 1) {
                    ElMessage.success('提交成功！')
                    userDialogVisible.value = false
                    getUserTable()
                }
                console.log('submit!', form)
            } else {
                if (valid && !roleCheckList.value.length) {
                    ElMessage.error('请选择角色！')
                }
                console.log('error submit!', fields)
            }
        })
    }
    // 修改用户
    const handleEdit = async (scope: any) => {
        addOrEdit.value = 'edit'
        userDialogVisible.value = true
        userRuleForm = Object.assign(userRuleForm, scope.row)
        roleCheckList.value = []
        scope.row.roles.forEach((item: { id: number }) => {
            roleCheckList.value.push(item.id)
        })
        console.log(scope)
    }
    // 删除用户
    const handleDelete = async (scope: { row: any }) => {
        ElMessageBox.confirm('请确认是否删除该用户?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            const res = await deleteUser(scope.row.id)
            if (res.data) {
                ElMessage.success('删除成功！')
                getUserTable()
            }
        })
    }
    // 获取角色
    let roleList = reactive<IRoleData[]>([])
    const getRoles = async () => {
        const res = await getAllRoleList()
        roleList = res.data!
        console.log(res, 'resd')
    }
    onMounted(() => {
        // 获取用户列表
        getUserTable()
        // 获取角色
        getRoles()
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
