<template>
    <div class="setting-box">
        <div class="setting-svg" @click="toggleDrawe">
            <svg-icon name="setup" />
        </div>
        <el-drawer v-model="drawer" :append-to-body="true" title="项目配置" direction="rtl" size="350" class="layout-drawer">
            <el-divider>布局</el-divider>
            <div class="flex-box" style="justify-content: space-around">
                <div :class="[mode == 'vertical' ? 'is-active layout-img vertical' : 'layout-img vertical']" @click="toogleLayout('vertical')"></div>
                <div :class="[mode == 'horizontal' ? 'is-active layout-img horizontal' : 'layout-img horizontal']" @click="toogleLayout('horizontal')"></div>
            </div>
            <el-divider>界面设置</el-divider>
            <div class="flex-box">
                <p>系统主题</p>
                <el-color-picker v-model="sysColor" :predefine="predeSysColors" @change="ChangeSystemColor" />
            </div>
            <div class="flex-box">
                <p>菜单主题</p>
                <el-color-picker v-model="menuColor" :predefine="predeMenuColors" @change="ChangeMenuColor" />
            </div>
        </el-drawer>
    </div>
</template>
<script lang="ts" setup>
    import { ref, computed, onMounted } from 'vue'
    import { useAppStore } from '@/store/modules/app'
    import { setCookie, getSysColor, getMenuColor } from '@/utils/cookies'
    import { ElMessage } from 'element-plus'
    import { mix, getCloseWhite } from './setting'
    const appStore = useAppStore()
    const drawer = ref(false)
    const mode = computed(() => appStore.mode)
    const toggleDrawe = () => {
        drawer.value = !drawer.value
    }
    const toogleLayout = (type: string) => {
        setCookie('layout', type)
        appStore.changeLayout(type)
    }
    const sysColor = getSysColor() ? ref(getSysColor()) : ref('#409eff')
    const menuColor = getMenuColor() ? ref(getMenuColor()) : ref('#001529')
    const predeSysColors = ref(['#409eff', '#ff5c93', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', 'rgb(255, 120, 0)'])
    const predeMenuColors = ref(['#ffffff', '#001529', '#212121', '#273352', '#191b24', '#001628', '#344058', '#07121E', '#020810', '#011734', '#010203'])

    const node = document.documentElement
    // 前缀
    const pre = '--el-color-primary'
    // 主色调(可以使用el-color-picker绑定)
    // 源码中的$color-white，也就是白色
    const mixWhite = '#ffffff'
    const mixBlack = '#000000'
    /**
     * 设置主体颜色
     */
    const setSystemColor = () => {
        // 判断是否接近白色
        if (getCloseWhite(sysColor.value) === 'white') {
            ElMessage.error('主题请勿选择浅色')
            return
        }
        node.style.setProperty(pre, sysColor.value)
        for (let i = 1; i < 10; i += 1) {
            // 同理
            for (let i = 1; i < 10; i += 1) {
                if (i === 1 || i === 4 || i === 6) {
                    //
                } else {
                    // 直接为根设置内联样式覆盖:root选择器的样式
                    node.style.setProperty(`${pre}-${i === 2 ? 'dark' : 'light'}-${i}`, mix(sysColor.value, i === 2 ? mixBlack : mixWhite, i * 0.1))
                }
            }
            node.style.setProperty('--el-menu-active-color', sysColor.value)
        }
        // 存储所选颜色
        appStore.setSysColor(sysColor.value)
    }
    onMounted(() => {
        setSystemColor()
        ChangeMenuColor()
    })
    const ChangeSystemColor = () => {
        setSystemColor()
    }
    const ChangeMenuColor = () => {
        // 判断是否接近白色
        if (getCloseWhite(menuColor.value) === 'white') {
            node.style.setProperty('--left-menu-bg-color', '#ffffff')
            node.style.setProperty('--left-menu-bg-light-color', '#ffffff')
            node.style.setProperty('--left-menu-text-color', '#333333')
            node.style.setProperty('--left-menu-border-color', '#eeeeee')
        } else {
            node.style.setProperty('--left-menu-bg-color', menuColor.value)
            node.style.setProperty('--left-menu-bg-light-color', mix(menuColor.value, mixBlack, 0.5))
            node.style.setProperty('--left-menu-text-color', '#ffffff')
            node.style.setProperty('--left-menu-border-color', 'transparant')
        }
        appStore.setMenuColor(menuColor.value)
    }
</script>
<style lang="less" scoped>
    .setting-box {
        position: fixed;
        top: 45%;
        right: 0;
        z-index: 999;
        .setting-svg {
            border-radius: 6px 0 0 6px;
            width: 40px;
            height: 40px;
            background-color: var(--el-color-primary);
            line-height: 35px;
            text-align: center;
            cursor: pointer;
        }
        .svg-icon {
            color: #fff !important;
            font-size: 18px;
        }
    }
</style>
<style lang="less" scoped>
    .layout-drawer {
        .flex-box {
            display: flex;
            justify-content: space-between;
            .layout-img {
                position: relative;
                border: 2px solid #e5e7eb;
                border-radius: 4px;
                width: 56px;
                height: 48px;
                background-color: rgba(209, 213, 219);
                cursor: pointer;
                &:before {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 1;
                    width: 33%;
                    height: 100%;
                    background-color: #273352;
                    border-radius: 4px 0 0 4px;
                    content: '';
                }
                &:after {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 25%;
                    background-color: #fff;
                    border-radius: 4px 4px 0;
                    content: '';
                }
            }
            .is-active {
                border-color: var(--el-color-primary);
            }
            .horizontal {
                &:before {
                    background-color: #fff;
                }
                &:after {
                    background-color: #273352;
                    z-index: 2;
                    height: 33%;
                }
            }
        }
    }
</style>
<style lang="less">
    .el-color-dropdown__link-btn {
        display: none !important;
    }
</style>
