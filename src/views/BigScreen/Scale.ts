// 屏幕适配 mixin 函数

import { ref } from 'vue'
import { useDebounceFn } from '@/hooks/useDebounce'

// * 默认缩放值
let scale = 1

// * 设计稿尺寸（px）
const baseWidth = 1920
const baseHeight = 1080

// * 需保持的比例（默认1.77778）
const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))

export default function userDraw() {
    const dataVRef = ref()
    const mapRef = ref()
    // 当前屏幕宽高比
    const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5))
    const calcRte = () => {
        console.log(dataVRef)
        if (!dataVRef.value) return
        if (dataVRef.value) {
            if (currentRate > baseProportion) {
                // 表示更宽
                scale = Number((window.innerHeight / baseHeight).toFixed(5))
                dataVRef.value.style.transform = `scale(${scale}) translate(-50%, -50%)`
            } else {
                // 表示更高
                scale = Number((window.innerWidth / baseWidth).toFixed(5))
                dataVRef.value.style.transform = `scale(${scale}) translate(-50%, -50%)`
            }
        }
    }
    // 改变窗口大小重新绘制 添加防抖
    const windowDraw = () => {
        window.addEventListener('resize', useDebounceFn(calcRte, 200))
    }
    // 解绑resize事件
    const unWindowDraw = () => {
        window.removeEventListener('resize', calcRte)
    }
    // 等比例缩放地图容器
    const resizeMap = () => {
        console.log(scale)
        const { offsetWidth, offsetHeight } = mapRef.value
        // 每次响应式，根据上次缩放比例计算是地图的设计宽高 offsetWidth / preScale
        const newWidth = offsetWidth * scale
        const newHeight = offsetHeight * scale
        mapRef.value.style.transform = `scale(${1 / scale})` // 抵消父级的scale，还原map容器
        //   改变map容器真实宽高来适应屏幕变化
        mapRef.value.style.width = newWidth + 'px'
        mapRef.value.style.height = newHeight + 'px'
    }
    return {
        dataVRef,
        mapRef,
        calcRte,
        windowDraw,
        unWindowDraw,
        resizeMap
    }
}
