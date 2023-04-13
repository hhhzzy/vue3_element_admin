<template>
    <div class="user-box">
        <el-dropdown trigger="click">
            <span class="el-dropdown-link">
                <img src="@/assets/user.jpg" alt="" srcset="" />
                {{ useStore.user.name }}
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="quit()">退出系统</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script lang="ts" setup>
    import { useUserStore } from '@/store/modules/user'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const useStore = useUserStore()
    const quit = async () => {
        await useStore.Quit()
        router.push({
            path: '/login', // 退出后重新登录回到当前页面
            query: {
                redirect: router.currentRoute.value.fullPath
            }
        })
        console.log(useStore.user, router.currentRoute.value.fullPath, 55555)
    }
</script>

<style lang="less" scoped>
    .user-box {
        cursor: pointer;
        padding: 1px 10px 0;
        display: flex;
        min-width: 84px;
        background-color: transparent;
        &:hover {
            background-color: #f6f6f6;
        }
        .el-dropdown {
            align-items: center;
        }
        .el-dropdown-link {
            font-size: 14px;
            padding: 0 5px;
        }
        img {
            width: 25px;
            height: 25px;
            vertical-align: middle;
        }
    }
    .horizontalSidebar {
        .user-box {
            .el-dropdown-link {
                color: #fff;
            }
            &:hover {
                background-color: #000;
            }
        }
    }
</style>
