<template>
    <div class="sidebar-logo-container">
        <transition name="sidebarLogoFade">
            <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
                <img src="@/assets/logo.png" alt="" class="sidebar-logo" />
            </router-link>
            <router-link v-else class="sidebar-logo-link" to="/">
                <img src="@/assets/logo.png" alt="" class="sidebar-logo" />
                <h1 class="sidebar-title">typescript_admin</h1>
            </router-link>
        </transition>
    </div>
</template>
<script lang="ts" setup>
    import { useStore } from '@/store/index'
    import { computed } from 'vue'
    const store = useStore()
    const collapse = computed(() => {
        return store.state.app.isCollapse
    })
</script>

<style lang="less" scoped>
    .horizontalSidebar {
        .sidebar-logo-container {
            width: 200px;
        }
    }
    .sidebar-logo-container {
        position: relative;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: var(--left-menu-bg-color);
        text-align: center;
        overflow: hidden;
        border-bottom: 1px solid var(--left-menu-border-color);

        & .sidebar-logo-link {
            height: 100%;
            width: 100%;
            display: inline-block;
            overflow: hidden;

            & .sidebar-logo {
                width: 32px;
                height: 32px;
                vertical-align: middle;
                margin-right: 12px;
            }

            & .sidebar-title {
                display: inline-block;
                margin: 0;
                color: var(--left-menu-text-color);
                font-weight: 600;
                line-height: 50px;
                font-size: 14px;
                font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
                vertical-align: middle;
            }
        }

        &.collapse {
            .sidebar-logo {
                margin-right: 0px;
            }
        }
    }
</style>
