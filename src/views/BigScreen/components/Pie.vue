<template>
    <div ref="pieRef" class="bar-box"></div>
</template>
<script lang="ts" setup>
    import { ref, onMounted } from 'vue'
    import { useDebounceFn } from '@/hooks/useDebounce'
    import * as echarts from 'echarts/core'
    import { ToolboxComponent, LegendComponent } from 'echarts/components'
    import { PieChart } from 'echarts/charts'
    import { LabelLayout } from 'echarts/features'
    import { CanvasRenderer } from 'echarts/renderers'

    echarts.use([ToolboxComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout])

    const pieRef = ref()
    let myChart: any
    onMounted(() => {
        myChart = echarts.init(pieRef.value)
        const option = {
            legend: {
                // 图例设置
                itemWidth: 15,
                itemHeight: 10,
                top: '20', // 图例位置
                textStyle: {
                    color: '#fff' // 图例选中时的文字颜色
                },
                inactiveColor: '#999' // 图例关闭时的颜色
            },
            toolbox: {
                show: false
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }

        option && myChart.setOption(option)
    })
    window.addEventListener(
        'resize',
        useDebounceFn(() => {
            myChart.resize()
        }, 100)
    )
</script>
<style lang="less">
    .bar-box {
        height: 100%;
        width: 100%;
    }
</style>
