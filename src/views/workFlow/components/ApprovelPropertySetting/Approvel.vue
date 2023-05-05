<template>
    <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" class="demo-ruleForm" status-icon>
        <el-form-item label="步骤id：">{{ ruleForm.id }}</el-form-item>
        <el-form-item label="步骤名称：">
            <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="签批类型：">
            <el-select v-model="ruleForm.approvelType" placeholder="请选择审签类型" style="width: 100%">
                <el-option label="部门领导审批" value="部门领导审批" />
                <el-option label="院领导审批" value="院领导审批" />
                <el-option label="分院领导审批" value="分院领导审批" />
                <el-option label="相关部门会签" value="相关部门会签" />
                <el-option label="院领导会签" value="院领导会签" />
            </el-select>
        </el-form-item>
        <el-form-item label="会签策略：">
            <el-select v-model="ruleForm.countersignPolicy" placeholder="请选择会签策略" style="width: 100%">
                <el-option label="所有人都需同意" value="所有人都需同意" />
                <el-option label="依据比例同意" value="依据比例同意" />
                <el-option label="一个同意" value="一个同意" />
            </el-select>
        </el-form-item>
        <el-form-item label="审批人员：" prop="region">
            <el-select v-model="ruleForm.approvelPeople" placeholder="请选择审签类型" style="width: 100%">
                <el-option label="张三" value="张三" />
                <el-option label="李四" value="李四" />
                <el-option label="王五" value="王五" />
                <el-option label="丑八怪" value="丑八怪" />
            </el-select>
        </el-form-item>
        <el-form-item label="选择表单：" prop="region">
            <el-col :span="11">
                <el-select v-model="ruleForm.moduleForm" placeholder="请选择模块">
                    <el-option label="公文管理" value="公文管理" />
                    <el-option label="财务管理" value="财务管理" />
                    <el-option label="合同管理" value="合同管理" />
                </el-select>
            </el-col>
            <el-col :span="2" class="text-center">
                <span style="text-align: center">-</span>
            </el-col>
            <el-col :span="11">
                <el-select v-model="ruleForm.formType" placeholder="请选择表单">
                    <el-option label="报销" value="报销" />
                    <el-option label="开票" value="开票" />
                    <el-option label="付款" value="付款" />
                </el-select>
            </el-col>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
    import { reactive, toRefs } from 'vue'
    let ruleForm = reactive({
        id: '',
        name: '',
        type: '',
        approvelType: '',
        countersignPolicy: '',
        approvelPeople: '',
        moduleForm: '',
        formType: ''
    })
    interface Props {
        nodeData: any
        lf: any
    }
    const props = defineProps<Props>()
    ruleForm.name = toRefs(props.nodeData).text?.value.value
    ruleForm.id = toRefs(props.nodeData).id.value
    /**
     * props传值是对象时需要响应的方法：通过Object.assign浅copy
     */
    ruleForm = Object.assign(ruleForm, props.nodeData.properties)
    const SaveApprove = () => {
        // 保存文字
        props.lf.updateText(props.nodeData.id, ruleForm.name)
        // 设置节点属性
        props.lf.setProperties(props.nodeData.id, { ...ruleForm })
    }
    console.log(props.nodeData.properties)
    defineExpose({
        SaveApprove
    })
</script>
