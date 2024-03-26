<template>
    <div ref="barRef" class="bar-box"></div>
</template>
<script lang="ts" setup>
    import { ref, onMounted } from 'vue'
    import { useDebounceFn } from '@/hooks/useDebounce'
    import * as echarts from 'echarts/core'
    import { TooltipComponent, GridComponent, LegendComponent, MarkLineComponent } from 'echarts/components'
    import { BarChart } from 'echarts/charts'
    import { CanvasRenderer } from 'echarts/renderers'

    echarts.use([TooltipComponent, GridComponent, LegendComponent, MarkLineComponent, BarChart, CanvasRenderer])

    const barRef = ref()

    let myChart: any
    onMounted(() => {
        myChart = echarts.init(barRef.value)
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
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
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisLine: {
                        // x轴线条及文字样式
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        // y轴线条及文字样式
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: 'Email',
                    type: 'bar',
                    stack: 'Ad',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Union Ads',
                    type: 'bar',
                    stack: 'Ad',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'Video Ads',
                    type: 'bar',
                    stack: 'Ad',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [150, 232, 201, 154, 190, 330, 410]
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
