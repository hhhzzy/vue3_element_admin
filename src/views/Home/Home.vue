<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <el-card shadow="hover">
                <template #header>
                    <div class="card-header">
                        <span>新增用户</span>
                    </div>
                </template>
                <el-skeleton :loading="loading" animated>
                    <div class="flex">
                        <svg-icon name="peoples" />
                        <div>
                            <CountTo :endVal="1234567" class="number" />
                            <p style="margin-top: 20px">日同比 12.5%，周同比 5%</p>
                        </div>
                    </div>
                    <div class="bottom flex">
                        <p>总人数</p>
                        <p>280万</p>
                    </div>
                </el-skeleton>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="hover">
                <template #header>
                    <div class="card-header">
                        <span>转正人员</span>
                    </div>
                </template>
                <el-skeleton animated>454545</el-skeleton>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="hover">
                <template #header>
                    <div class="card-header">
                        <span>未读消息</span>
                    </div>
                </template>
                <el-skeleton animated>454545</el-skeleton>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="hover">
                <template #header>
                    <div class="card-header">
                        <span>访问量</span>
                    </div>
                </template>
                <el-skeleton animated>454545</el-skeleton>
            </el-card>
        </el-col>
    </el-row>
    <Echarts />
</template>

<script lang="ts" setup>
    import CountTo from '@/components/CountTo/CountTo.vue'
    import Echarts from './Echarts.vue'
    import { ref } from 'vue'
    const loading = ref(true)
    setTimeout(() => {
        loading.value = false
    }, 1000)
</script>
<style lang="less" scoped>
    svg {
        font-size: 48px;
        color: var(--el-color-primary) !important;
    }
    .el-card {
        border: none;
        cursor: pointer;
    }
    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 0;
        .number {
            font-size: 30px;
            font-weight: bold;
            color: var(--el-color-primary);
        }
        p {
            font-size: 14px;
        }
    }
    .bottom {
        border-top: 1px solid #eee;
        padding-bottom: 0;
    }
</style>
