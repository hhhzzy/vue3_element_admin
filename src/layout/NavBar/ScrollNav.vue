<template>
    <el-scrollbar height="30px" ref="scrollContainerRef">
        <slot></slot>
    </el-scrollbar>
</template>
<script lang="ts">
    import { defineComponent, ref, unref, computed, getCurrentInstance } from 'vue'

    export default defineComponent({
        setup() {
            const tagSpacing = 4
            const instance = getCurrentInstance()?.parent
            const scrollContainerRef = ref()
            const scrollContainer = computed(() => {
                console.log(scrollContainerRef, 989898)
                return unref(scrollContainerRef)
            })
            //
            const moveToTarget = (currentTag: HTMLElement) => {
                const container = unref(scrollContainer).$el as HTMLElement
                const containerWidth = container.offsetWidth
                const scrollWrapper = unref(scrollContainer).wrapRef
                const tagList = (instance as any).devtoolsRawSetupState.tagRefs.value as any[]
                console.log(tagList, 444)
                let firstTag = null
                let lastTag = null

                // find first tag and last tag
                if (tagList.length > 0) {
                    firstTag = tagList[0]
                    lastTag = tagList[tagList.length - 1]
                }

                if (firstTag === currentTag) {
                    scrollWrapper.scrollLeft = 0
                } else if (lastTag === currentTag) {
                    scrollWrapper.scrollLeft = scrollWrapper.scrollWidth - containerWidth
                } else {
                    // find preTag and nextTag
                    const currentIndex = tagList.findIndex(item => item === currentTag)
                    const prevTag = tagList[currentIndex - 1]
                    const nextTag = tagList[currentIndex + 1]
                    // the tag's offsetLeft after of nextTag
                    const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagSpacing
                    // the tag's offsetLeft before of prevTag
                    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagSpacing

                    if (afterNextTagOffsetLeft > scrollWrapper.scrollLeft + containerWidth) {
                        scrollWrapper.scrollLeft = afterNextTagOffsetLeft - containerWidth
                    } else if (beforePrevTagOffsetLeft < scrollWrapper.scrollLeft) {
                        scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
                    }
                }
            }
            return {
                scrollContainerRef,
                moveToTarget
            }
        }
    })
</script>

<style lang="less" scoped></style>
