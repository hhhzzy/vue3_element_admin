<template>
    <div class="nav-tab-box">
        <ScrollNav ref="scrollNav">
            <el-dropdown trigger="contextmenu" v-for="(tag, index) in visitedTag" v-bind:key="index" @visible-change="visibleChange(tag, $event)" ref="dropdownRefs">
                <router-link ref="tagRefs" :to="{ path: tag.path, query: tag.query }" class="tag-a el-dropdown-link">
                    <el-tag :closable="!tag.meta?.affix" :effect="isActive(tag) ? 'dark' : 'plain'" :disable-transitions="false" @close.prevent.stop="closeTag(tag)">
                        {{ tag.title }}
                    </el-tag>
                </router-link>
                <template #dropdown>
                    <el-dropdown-menu :data-path="tag.fullPath">
                        <el-dropdown-item @click="refreshSelectedTag(tag)" :disabled="tag.fullPath != currentRoute.fullPath">重新加载</el-dropdown-item>
                        <el-dropdown-item @click="closeTag(tag)">关闭标签页</el-dropdown-item>
                        <el-dropdown-item @click="closeAllTag()">关闭全部标签页</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </ScrollNav>
        <div class="refresh-box" @click="refreshSelectedTag(currentRoute)">
            <svg-icon name="refresh" />
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent, computed, onMounted, unref, watch, ref, nextTick } from 'vue'
    import ScrollNav from './ScrollNav.vue'
    import { useStore } from '@/store/index'
    import { ITagNav } from '@/store/modules/tagsView'
    import { useRouter } from 'vue-router'

    export default defineComponent({
        components: {
            ScrollNav
        },
        setup() {
            const tagRefs = ref([])
            const scrollNav = ref()
            const path = require('path')
            const store = useStore()
            const { currentRoute } = useRouter()
            const router = useRouter()
            const dropdownRefs = ref([])
            // 获取所有的路由
            const routes = computed(() => {
                return store.state.permission.rotues
            })
            // 获取点击过得tag
            const visitedTag = computed(() => {
                return store.state.tagsView.visitedTag
            })
            // 初始化tag函数
            const initTags = () => {
                const affixTags = filterAffixTags(unref(routes))
                for (const tag of affixTags) {
                    if (tag.name) {
                        store.dispatch('tagsView/addVisitedTag', tag)
                    }
                }
            }
            // 添加当前页面的路由到tag中
            const addTags = () => {
                store.dispatch('tagsView/addTag', unref(currentRoute))
            }
            // 判断当前tag是否选中
            const isActive = (tag: ITagNav) => {
                return tag.path === unref(currentRoute).path
            }
            // 删除tag
            const closeTag = (tag: ITagNav) => {
                store.dispatch('tagsView/delTag', tag)
                if (isActive(tag)) {
                    toLastView(store.state.tagsView.visitedTag, tag)
                }
            }
            onMounted(() => {
                // 初始化tag
                initTags()
                // 增加tag
                addTags()
            })
            // 移动到最后一个tag
            const toLastView = (visitedTsg: ITagNav[], route: ITagNav) => {
                const latestTag = visitedTsg.slice(-1)[0]
                if (latestTag !== undefined && latestTag.fullPath !== undefined) {
                    router.push(latestTag.fullPath).catch(err => {
                        console.warn(err)
                    })
                } else {
                    // 如果没有路由，则默认定向到主页
                    if (route.name === 'home') {
                        router.replace({ path: '/redirect' + route.fullPath }).catch(err => {
                            console.warn(err)
                        })
                    } else {
                        router.push('/').catch(err => {
                            console.warn(err)
                        })
                    }
                }
            }
            // 重新加载
            const refreshSelectedTag = async (tag: ITagNav) => {
                if (!tag) return
                // 删除缓存
                store.dispatch('tagsView/delCachedTag', tag)
                await nextTick()
                router.replace({
                    path: '/redirect' + tag.path,
                    query: tag.query
                })
            }
            // 关闭所有标签页
            const closeAllTag = () => {
                store.commit('tagsView/DEL_ALL_CACHED_VIEW')
                store.commit('tagsView/DEL_ALL_VISITED_TAG')
                router.push('/').catch(err => {
                    console.warn(err)
                })
            }
            // 移动到当前选中的tag
            const moveToCurrentTag = () => {
                const tags = unref(tagRefs) as any[]
                nextTick(() => {
                    for (const tag of tags) {
                        if ((tag.to as ITagNav).path === unref(currentRoute).path) {
                            unref(scrollNav).moveToTarget(tag as any)
                            // When query is different then update
                            // if ((tag.to as ITagNav).fullPath !== this.$route.fullPath) {
                            //     TagsViewModule.updateVisitedView(this.$route)
                            // }
                            break
                        }
                    }
                })
            }
            //
            const visibleChange = (tag: ITagNav, visible: boolean) => {
                if (visible) {
                    for (const v of unref(dropdownRefs)) {
                        // 判定当前tag的自定义属性data-path和当前tag的路由path是否一致
                        if (tag.fullPath !== (unref(v) as any).contentRef.dataset.path) {
                            ;(unref(v) as any).handleClose()
                        }
                    }
                }
            }
            // watch监听当前路由
            watch(
                () => unref(currentRoute),
                () => {
                    addTags()
                    moveToCurrentTag()
                }
            )
            return {
                visitedTag,
                isActive,
                tagRefs,
                scrollNav,
                dropdownRefs,
                closeTag,
                refreshSelectedTag,
                closeAllTag,
                visibleChange,
                currentRoute
            }
            // 循环出路由中meta属性中affix为true的路由
            function filterAffixTags(routes: AppRouteRecordRaw[], basePath = '/') {
                let tags: ITagNav[] = []
                routes.forEach(route => {
                    if (route.meta && route.meta.affix) {
                        const tagPath = path.resolve(basePath, route.path)
                        tags.push({
                            fullPath: tagPath,
                            path: tagPath,
                            name: route.name,
                            meta: { ...route.meta }
                        })
                    }
                    if (route.children) {
                        const childTags = filterAffixTags(route.children, route.path)
                        if (childTags.length >= 1) {
                            tags = [...tags, ...childTags]
                        }
                    }
                })
                return tags
            }
        }
    })
</script>
<style lang="less" scoped>
    .nav-tab-box {
        border-bottom: 1px solid #eee;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
        display: flex;
        justify-content: space-between;
        position: relative;
        z-index: 999;
        .el-scrollbar {
            flex: 1 1 0%;
        }
        .el-dropdown {
            position: relative;
            top: 3px;
            height: 24px;
            padding-left: 8px;
            margin-left: 4px;
            font-size: 12px;
            text-align: center;
            line-height: 20px;
            cursor: pointer;
        }
        .close {
            position: absolute;
            top: 45%;
            right: 1px;
            transform: translateY(-50%);
            font-size: 14px;
            color: #409eff !important;
        }
        .refresh-box {
            width: 35px;
            text-align: center;
            line-height: 26px;
            border-right: 1px solid #eee;
            border-left: 1px solid #eee;
            cursor: pointer;
            .svg-icon {
                color: #333;
            }
        }
    }
</style>
