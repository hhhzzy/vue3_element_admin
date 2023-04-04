<template>
    <div class="login-box">
        <div class="container" onclick="onclick">
            <div class="top"></div>
            <div class="bottom"></div>
            <div class="center">
                <h2>登录</h2>
                <!-- <p class="title">用户名</p> -->
                <el-form ref="LoginFormRef" :model="LoginRuleForm" :rules="LoginRules" :label-position="'top'">
                    <el-form-item label="用户名" prop="userName">
                        <el-input class="w-50 m-2" v-model="LoginRuleForm.userName" placeholder="请输入用户名" autocomplete="new-pwd" size="large" />
                    </el-form-item>
                    <!-- <p class="title">密码</p> -->
                    <el-form-item label="密码" prop="password">
                        <el-input class="w-50 m-2" v-model="LoginRuleForm.password" placeholder="请输入密码" autocomplete="off" type="password" size="large" />
                    </el-form-item>
                    <div class="rember-box">
                        <el-checkbox size="small">记住我</el-checkbox>
                        <p class="p-t">忘记密码</p>
                    </div>
                    <el-button type="primary" @click="Login(LoginFormRef)" :loading="loginStatus">登录</el-button>
                </el-form>
                <el-divider>其他登录方式</el-divider>
                <div class="r-link">
                    <svg-icon name="wechat" />
                    <svg-icon name="zfb" />
                    <svg-icon name="githup" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { useStore } from '@/store/index'
    import { useRouter } from 'vue-router'
    import { getUrlQueryValue } from '@/utils/global'
    import type { FormInstance, FormRules } from 'element-plus'
    import { ref, reactive } from 'vue'

    const LoginFormRef = ref<FormInstance>()
    const LoginRuleForm = reactive({
        userName: '',
        password: ''
    })
    const LoginRules = reactive<FormRules>({
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    })
    const loginStatus = ref(false)
    const store = useStore()
    const { currentRoute, push } = useRouter()
    const Login = async (formEl: FormInstance | undefined) => {
        loginStatus.value = true
        if (!formEl) return
        await formEl.validate(async (valid, fields) => {
            if (valid) {
                await store.dispatch('user/Login', { userName: 'hzy', password: 'hzy' })
                let queryValue = {}
                if (currentRoute.value.query.redirect as string) {
                    queryValue = getUrlQueryValue('', currentRoute.value.query.redirect as string)
                }
                push({ path: (currentRoute.value.query.redirect as string) || '/', query: queryValue })
            } else {
                console.log('error submit!', fields)
                loginStatus.value = false
            }
        })
        console.log(currentRoute.value.query.redirect, 55)
    }
</script>
<style lang="less" scoped>
    @import url('https://fonts.googleapis.com/css?family=Raleway:400,700');

    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    body {
        min-height: 100vh;
        font-family: 'Raleway', sans-serif;
    }
    .container {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;

        &:hover,
        &:active {
            .top,
            .bottom {
                &:before,
                &:after {
                    margin-left: 250px;
                    transform-origin: -250px 50%;
                    transition-delay: 0s;
                }
            }

            .center {
                opacity: 1;
                transition-delay: 0.2s;
            }
        }
    }

    .top,
    .bottom {
        &:before,
        &:after {
            content: '';
            display: block;
            position: absolute;
            width: 200vmax;
            height: 200vmax;
            top: 50%;
            left: 50%;
            margin-top: -100vmax;
            transform-origin: 0 50%;
            transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
            z-index: 10;
            opacity: 0.65;
            transition-delay: 0.2s;
        }
    }

    .top {
        &:before {
            transform: rotate(45deg);
            background: #e46569;
        }
        &:after {
            transform: rotate(135deg);
            background: #ecaf81;
        }
    }

    .bottom {
        &:before {
            transform: rotate(-45deg);
            background: #60b8d4;
        }
        &:after {
            transform: rotate(-135deg);
            background: #3745b5;
        }
    }

    .center {
        position: absolute;
        width: 400px;
        height: 400px;
        top: 50%;
        left: 50%;
        margin-left: -200px;
        margin-top: -200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 30px;
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
        transition-delay: 0s;
        color: #333;
        h2 {
            margin-bottom: 10px;
        }
        .el-input {
            margin-bottom: 5px;
        }
        input {
            width: 100%;
            padding: 15px;
            margin: 5px;
            border-radius: 1px;
            border: 1px solid #ccc;
            font-family: inherit;
        }
        .title {
            font-size: 14px;
            color: #606266;
            width: 100%;
            margin-bottom: 20px;
        }
        .el-button {
            width: 100%;
        }
        .rember-box {
            display: flex;
            justify-content: space-between;
            width: 100%;
            font-size: 14px;
            align-items: center;
            margin-bottom: 15px;
            .p-t {
                font-size: 12px;
                color: #606266;
            }
        }
        .r-link {
            display: flex;
            justify-content: space-between;
            width: 100%;
            .svg-icon {
                color: #606266 !important;
                font-size: 20px;
            }
            .svg-icon:hover {
                color: #409eff !important;
                cursor: pointer;
            }
        }
        .el-form {
            width: 100%;
            .el-form-item {
            }
        }
        /deep/ .el-input__inner {
            background-color: rgba(255, 255, 255, 0) !important;
        }
        /deep/ .el-input__inner:-webkit-autofill {
            transition: background-color 5000s ease-in-out 0s;
        }
        /deep/ .el-input__inner:-webkit-autofill:focus {
            -webkit-text-fill-color: #333 !important;
        }
    }
</style>
