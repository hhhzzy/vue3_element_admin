<template>
    <div class="header-bar" v-if="layoutType == 'vertical'">
        <div class="header-right-box">
            <div class="fold-box" @click="toggleSiderbar">
                <svg-icon name="fold" />
            </div>
            <Breadcrumb />
        </div>
        <User />
    </div>
    <NavTab />
</template>
<script lang="ts" setup>
    import Breadcrumb from './Breadcrumb.vue'
    import User from './User.vue'
    import NavTab from '@/layout/NavBar/Index.vue'
    import { computed } from 'vue'
    import { useStore } from '@/store/index'
    const store = useStore()
    const layoutType = computed(() => store.state.app.mode)
    // 折叠侧边导航
    const toggleSiderbar = () => {
        store.dispatch('app/changeCollapse', !store.state.app.isCollapse)
    }
</script>

<style lang="less" scoped>
    .header-bar {
        height: 50px;
        border-bottom: 1px solid #eee;
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
        display: flex;
        justify-content: space-between;
        .header-right-box {
            display: flex;
            align-items: center;
        }

        .fold-box {
            display: flex;
            height: 100%;
            padding: 1px 10px 0;
            cursor: pointer;
            align-items: center;
            transition: background 0.2s;
            width: 40px;
            &:hover {
                background-color: #f6f6f6;
            }
        }
        .svg-icon {
            font-size: 18px;
        }
    }
</style>
