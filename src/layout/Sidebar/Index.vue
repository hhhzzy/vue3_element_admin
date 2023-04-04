<template>
    <div>
        <SidebarLogo />
        <div class="menu-box">
            <el-scrollbar>
                <el-menu
                    :default-active="activeMenu"
                    :collapse="isCollapse"
                    :unique-opened="false"
                    class="el-menu-vertical-demo"
                    background-color="var(--left-menu-bg-color)"
                    text-color="var(--left-menu-text-color)"
                    router
                    active-text-color="var(--el-color-primary)"
                    :mode="mode"
                    :ellipsis="true"
                    :defaultOpeneds="[]"
                    :key="mode"
                >
                    <SidebarItem v-for="(item, index) in routes" :key="index" :route="item" :is-collapse="isCollapse" :base-path="item.path" />
                </el-menu>
            </el-scrollbar>
        </div>
        <User />
    </div>
</template>
<script lang="ts" setup>
    import { computed } from 'vue'
    import { useStore } from '@/store/index'
    import { useRoute } from 'vue-router'
    import SidebarLogo from './SidebarLogo.vue'
    import SidebarItem from './SidebarItem.vue'
    import User from '@/layout/Headerbar/User.vue'
    const store = useStore()
    const routes = store.state.permission.rotues
    const route = useRoute()
    const isCollapse = computed(() => store.state.app.isCollapse) // 侧边栏是否隐藏
    console.log(isCollapse, 111)
    // 当前路由路径，左侧菜单高亮显示
    const activeMenu = computed(() => {
        const { meta, path } = route
        if (meta.activeMenu) {
            return meta.activeMenu
        }
        return path
    })
    const mode = computed(() => {
        return store.state.app.mode
    })
</script>
<style lang="less" scoped>
    .el-menu {
        border-right: none;
        width: 100% !important;
    }
    .menu-box {
        height: calc(100% - 50px);
        background-color: var(--left-menu-bg-color);
        /deep/ .el-menu--inline {
            background-color: var(--left-menu-bg-light-color) !important;
            .el-menu-item:hover:not(.is-active) {
                background-color: var(--left-menu-bg-light-color) !important;
            }
        }
    }
    .horizontalSidebar {
        .menu-box .el-menu {
            border-bottom: none;
            overflow: hidden;
            // --el-menu-active-color: var(--el-color-primary) !important;
        }
        .menu-box {
            width: 100%;
            height: 50px;
        }
    }
</style>
