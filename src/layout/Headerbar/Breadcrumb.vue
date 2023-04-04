<template>
    <el-breadcrumb class="breadcrumb-box" separator="/">
        <TransitionGroup name="breadcrumb" appear enter-active-class="animate__animated animate__fadeInRight">
            <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item">
                <span v-if="item.redirect == 'noredirect' || index === breadcrumbs.length - 1" class="no-redirect">{{ item.meta.title }}</span>
                <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
            </el-breadcrumb-item>
        </TransitionGroup>
    </el-breadcrumb>
</template>
<script lang="ts" setup>
    import { useRouter } from 'vue-router'
    import type { RouteLocationNormalizedLoaded } from 'vue-router'
    import { ref, watch } from 'vue'
    const { currentRoute } = useRouter() // 当前路由
    const router = useRouter()
    const breadcrumbs = ref<AppRouteRecordRaw[]>([])
    const getBreadcrumb = () => {
        breadcrumbs.value = (currentRoute.value.matched as AppRouteRecordRaw[]).filter(item => {
            return item.meta && item.meta.title && item.meta.breadcrumb !== false
        })
    }
    getBreadcrumb()
    // 进入路由
    const handleLink = (item: AppRouteRecordRaw) => {
        const { redirect } = item
        if (redirect) {
            router.push(redirect as string).catch(err => {
                console.warn(err)
            })
            return
        }
        // router.push(this.pathCompile(path)).catch(err => {
        //     console.warn(err)
        // })
    }
    // watch监听当前路由
    watch(
        () => currentRoute.value,
        (toPath: RouteLocationNormalizedLoaded) => {
            if (toPath.path.startsWith('/redirect/')) {
                return
            }
            getBreadcrumb()
        },
        { immediate: true, deep: true }
    )
</script>

<style lang="less" scoped>
    .breadcrumb-box {
        margin-left: 10px;
    }
    /deep/.el-breadcrumb__inner a {
        font-weight: bold !important;
    }

    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 8px;

        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }
</style>
