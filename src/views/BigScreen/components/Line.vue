<template>
    <div ref="pieRef" class="bar-box"></div>
</template>
<script lang="ts" setup>
    import { ref, onMounted } from 'vue'
    import { useDebounceFn } from '@/hooks/useDebounce'
    import * as echarts from 'echarts/core'
    import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
    import { LineChart } from 'echarts/charts'
    import { UniversalTransition } from 'echarts/features'
    import { CanvasRenderer } from 'echarts/renderers'

    echarts.use([TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer, UniversalTransition])

    const pieRef = ref()
    let myChart: any
    onMounted(() => {
        myChart = echarts.init(pieRef.value)
        const option = {
            tooltip: {
                trigger: 'axis'
            },
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
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLine: {
                    // x轴线条及文字样式
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    // x轴线条及文字样式
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            series: [
                {
                    name: 'Email',
                    type: 'line',
                    stack: 'Total',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Union Ads',
                    type: 'line',
                    stack: 'Total',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'Video Ads',
                    type: 'line',
                    stack: 'Total',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: 'Direct',
                    type: 'line',
                    stack: 'Total',
                    data: [320, 332, 301, 334, 390, 330, 320]
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
