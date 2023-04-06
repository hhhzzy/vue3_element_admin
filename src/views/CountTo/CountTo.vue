<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>数字变化</span>
            </div>
        </template>

        <CountTo :endVal="1234567" :prefix="'￥'" :suffix="'rmb'" class="aa" />
    </el-card>
</template>
<script lang="ts" setup>
    import CountTo from '@/components/CountTo/CountTo.vue'
</script>
<style lang="less" scoped>
    .aa {
        font-size: 30px;
        font-weight: bold;
        color: var(--el-color-primary);
    }
</style>
