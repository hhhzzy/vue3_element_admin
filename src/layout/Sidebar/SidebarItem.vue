<template>
    <!-- 路由中meta的hidden：true时或者没有meta不展示在左侧菜单中 -->
    <template v-if="!props.route.meta || !props.route.meta.hidden">
        <!--  没有子路由，或者alwaysShow为false：只显示根路由   -->
        <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
            <sidebar-item-link v-if="theOnlyOneChild.meta" :to-path="resolvePath(theOnlyOneChild.path)">
                <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
                    <svg-icon class="el-icon" v-if="theOnlyOneChild.meta.icon" :name="theOnlyOneChild.meta.icon" />
                    <template v-if="theOnlyOneChild.meta.title" v-slot:title>
                        <span class="item-title">{{ theOnlyOneChild.meta.title }}</span>
                    </template>
                </el-menu-item>
            </sidebar-item-link>
        </template>
        <el-sub-menu :index="resolvePath(props.route.path)" v-else>
            <template #title>
                <svg-icon class="el-icon" v-if="props.route.meta && props.route.meta.icon" :name="props.route.meta.icon" />
                <span v-if="props.route.meta && props.route.meta.title" class="item-title">{{ props.route.meta.title }}</span>
            </template>
            <template v-if="props.route.children">
                <SidebarItem v-for="(item, index) in props.route.children" :key="index" :is-collapse="isCollapse" :route="item" :base-path="resolvePath(item.path)" />
            </template>
        </el-sub-menu>
    </template>
</template>
<script lang="ts" setup>
    import { isExternal } from '@/utils/global'
    import SidebarItemLink from './SidebarItemLink.vue'
    import { computed } from 'vue'
    import { useStore } from '@/store/index'
    const path = require('path')
    interface Props {
        isCollapse: boolean
        route: AppRouteRecordRaw
        basePath: string
    }
    const props = defineProps<Props>()
    const store = useStore()
    const isCollapse = computed(() => {
        return store.state.app.isCollapse
    })
    // 是否展示左侧菜单根路由
    const alwaysShowRootMenu = computed(() => {
        return props.route.meta.alwaysShow
    })
    // 计算菜单路由下的子路由个数
    const showingChildNumber = computed(() => {
        if (props.route.children) {
            const showingChildren = props.route.children.filter(item => {
                // 当子路由meta中hidden：true时，不会出现在侧边栏
                if (item.meta && item.meta.hidden) {
                    return false
                } else {
                    return true
                }
            })
            return showingChildren.length
        }
        return 0
    })
    // 菜单路由下的子路由
    const theOnlyOneChild = computed(() => {
        if (showingChildNumber.value > 1) {
            return null
        }
        if (props.route.children) {
            for (const child of props.route.children) {
                if (!child.meta || !child.meta.hidden) {
                    return child
                }
            }
        }
        return { ...props.route, path: '' }
    })
    // 组合路由中的path路径
    const resolvePath = (routePath: string) => {
        if (isExternal(routePath)) {
            return routePath
        }
        if (isExternal(props.basePath)) {
            return props.basePath
        }
        return path.resolve(props.basePath, routePath)
    }
</script>

<style lang="less" scoped>
    .el-menu {
        width: 210px;
    }
    .el-menu-item.is-active {
        .svg-icon {
            color: #fff !important;
        }
    }
    .el-menu-item,
    .el-sub-menu {
        transition: border-color 0.28s, background-color 0.28s;
        &.is-active {
            color: #fff !important;
            background-color: var(--el-color-primary) !important;
            position: relative;
        }
        .svg-icon {
            color: var(--left-menu-text-color) !important;
            font-size: 14px;
            vertical-align: middle;
            margin-right: 5px;
            width: var(--el-menu-icon-width);
            text-align: center;
            transition: all 0.28s;
        }
        /deep/.el-menu .el-sub-menu__title {
            background-color: var(--left-menu-bg-light-color) !important;
        }
        .el-sub-menu__title:hover {
            span {
                color: var(--left-menu-text-color);
            }
            .svg-icon {
                color: var(--left-menu-text-color) !important;
            }
        }
        .el-menu-item:hover:not(.is-active) {
            color: var(--left-menu-text-hover-color);
        }
        &:hover:not(.is-active) {
            background-color: var(--left-menu-bg-color);
        }
    }

    .hideSidebar {
        .el-sub-menu,
        .el-menu-item {
            .svg-icon {
                font-size: 18px;
            }
        }
        .item-title {
            display: none;
        }
    }
    .horizontalSidebar {
        .el-menu-item,
        .el-sub-menu {
            height: 50px;
            .el-sub-menu__title:hover {
                span {
                    color: var(--el-color-primary);
                }
                .svg-icon {
                    color: var(--el-color-primary) !important;
                }
            }
            &.is-active {
                color: var(--el-color-primary) !important;
                background-color: transparent !important;
                .svg-icon {
                    color: var(--el-color-primary) !important;
                }
                .item-title {
                    color: var(--el-color-primary) !important;
                }
            }
            .el-menu-item:hover:not(.is-active) {
                color: var(--el-color-primary);
            }
            &:hover .svg-icon,
            &:hover .item-title {
                color: var(--el-color-primary) !important;
            }
        }
    }
</style>
<style lang="less">
    .el-menu--horizontal {
        .el-sub-menu .el-sub-menu__title:hover,
        .el-menu-item:not(.is-active):hover {
            .item-title {
                color: var(--el-color-primary) !important;
            }
        }
    }
</style>
