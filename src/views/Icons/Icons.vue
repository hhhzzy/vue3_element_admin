<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>element plus 图标</span>
            </div>
        </template>
        <div class="flex">
            <el-icon :size="20">
                <Edit />
            </el-icon>
            <el-icon color="#409EFC" class="no-inherit">
                <Share />
            </el-icon>
            <el-icon>
                <Delete />
            </el-icon>
            <el-icon class="is-loading">
                <Loading />
            </el-icon>
            <el-button type="primary">
                <el-icon style="vertical-align: middle">
                    <Search />
                </el-icon>
                <span style="vertical-align: middle">Search</span>
            </el-button>
        </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
        <template #header>
            <div class="card-header">
                <span>svg-icon 图标</span>
            </div>
        </template>
        <div class="flex">
            <el-icon :size="20">
                <svg-icon name="zfb" />
            </el-icon>
            <el-icon color="#409EFC" class="no-inherit">
                <svg-icon name="fold" />
            </el-icon>
            <el-icon>
                <svg-icon name="wechat" />
            </el-icon>
            <el-icon class="is-loading">
                <svg-icon name="githup" />
            </el-icon>
            <el-button type="primary">
                <el-icon style="vertical-align: middle">
                    <Search />
                </el-icon>
                <span style="vertical-align: middle">Search</span>
            </el-button>
        </div>
    </el-card>
</template>
<script lang="ts" setup>
    import { Edit, Share, Delete, Loading, Search } from '@element-plus/icons-vue'
</script>
<style lang="less" scoped>
    .flex {
        display: flex;
        justify-content: space-between;
    }
</style>
