<template>
    <div class="layout" :class="classOther">
        <!--  侧边导航  -->
        <Siderbar class="sidebar-container" />
        <!--  中心内容  -->
        <div class="main-container">
            <!--  顶部导航  -->
            <div class="fixed-header">
                <HeaderBar />
            </div>
            <div class="app-container">
                <router-view v-slot="{ Component, route }">
                    <transition enter-active-class="animate__animated animate__fadeIn">
                        <div class="content-box">
                            <KeepAlive :include="cachedTags">
                                <component :is="Component" :key="route.path" />
                            </KeepAlive>
                        </div>
                    </transition>
                </router-view>
            </div>
        </div>
        <Setting />
    </div>
</template>
<script lang="ts" setup>
    import Siderbar from './Sidebar/Index.vue'
    import HeaderBar from './Headerbar/Index.vue'
    import Setting from './Setting/index.vue'
    import { computed } from 'vue'
    import { useTagsViewStore } from '@/store/modules/tagsView'
    import { useAppStore } from '@/store/modules/app'
    const tagsViewStore = useTagsViewStore()
    const appStore = useAppStore()
    const cachedTags = computed(() => {
        return tagsViewStore.cachedTag
    })
    // 样式
    const classOther = computed(() => {
        return {
            horizontalSidebar: appStore.mode === 'horizontal',
            verticalSidebar: appStore.mode === 'vertical',
            openSidebar: !appStore.isCollapse,
            hideSidebar: appStore.isCollapse
        }
    })
</script>
<style lang="less" scoped>
    .layout {
        position: relative;
        height: 100%;
    }
    .sidebar-container {
        width: var(--left-menu-max-width);
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        background-color: var(--left-menu-bg-color);
        border-right: 1px solid var(--left-menu-border-color);
    }
    .main-container {
        width: calc(100% - var(--left-menu-max-width));
        position: absolute;
        left: var(--left-menu-max-width);
        top: 0;
        height: 100%;
        transition: all 0.28s;
        .app-container {
            overflow-y: auto;
            height: 100%;
            padding: 20px;
            padding-bottom: 100px;
            background-color: #f5f7f9;
        }
    }
    .fixed-header {
        height: 80px;
    }
    .verticalSidebar {
        .sidebar-container {
            transition: width 0.28s;
            height: 100%;
            font-size: 0px;
            z-index: 1001;
            overflow: hidden;
        }
    }
    .hideSidebar {
        .main-container {
            margin-left: var(--left-menu-min-width);
            left: 0;
            width: 100%;
        }

        .sidebar-container {
            width: var(--left-menu-min-width) !important;
        }

        .fixed-header {
            width: calc(100% - var(--left-menu-min-width));
        }
    }
    .horizontalSidebar {
        .sidebar-container {
            position: relative;
            width: auto;
            height: auto;
            display: flex;
            .el-sub-menu.is-active {
                .svg-icon {
                    color: #409eff;
                }
            }
        }
        .fixed-header {
            height: 30px;
        }
        .menu-box {
            width: 100%;
            height: 50px;
        }
        .main-container {
            width: 100%;
            left: 0;
            top: 50px;
            transition: none;
        }
    }
</style>
<style scoped>
    /* fade-transform */
    .fade-transform-leave-active,
    .fade-transform-enter-active {
        transition: all 0.5s;
    }

    .fade-transform-enter {
        opacity: 0;
        transform: translateX(-30px);
    }

    .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
</style>
