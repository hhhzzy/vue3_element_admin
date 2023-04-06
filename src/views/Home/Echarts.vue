<template>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-card>
                <div ref="elPieRef" class="echart-box"></div>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card>
                <div ref="elBarRef" class="echart-box"></div>
            </el-card>
        </el-col>
    </el-row>

    <el-card>
        <div ref="elLineRef" class="echart-box"></div>
    </el-card>
</template>
<script lang="ts" setup>
    import { ref, onMounted, unref } from 'vue'
    import * as echarts from 'echarts/core'
    import { PieChart } from 'echarts/charts'
    import { LabelLayout } from 'echarts/features'
    import { CanvasRenderer } from 'echarts/renderers'
    import {
        TitleComponent,
        TooltipComponent,
        LegendComponent,
        GridComponent,
        ToolboxComponent,
        TitleComponentOption,
        ToolboxComponentOption,
        TooltipComponentOption,
        GridComponentOption,
        LegendComponentOption
    } from 'echarts/components'
    import { UniversalTransition } from 'echarts/features'
    import { BarChart, LineChart, LineSeriesOption } from 'echarts/charts'
    echarts.use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout])
    const elPieRef = ref()
    const elBarRef = ref()
    const elLineRef = ref()
    onMounted(() => {
        InitEchartPie()
        InitEchartBar()
        InitEchartLine()
    })
    function InitEchartPie() {
        var myChart = echarts.init(unref(elPieRef))
        var option

        option = {
            title: {
                text: 'Referer of a Website',
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
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
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
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
    }
    function InitEchartBar() {
        echarts.use([TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer])

        var myChart = echarts.init(unref(elBarRef))
        var option

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // Use axis to trigger tooltip
                    type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [320, 302, 301, 334, 390, 330, 320]
                },
                {
                    name: 'Mail Ad',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Affiliate Ad',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'Video Ad',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [150, 212, 201, 154, 190, 330, 410]
                },
                {
                    name: 'Search Engine',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [820, 832, 901, 934, 1290, 1330, 1320]
                }
            ]
        }

        option && myChart.setOption(option)
    }
    function InitEchartLine() {
        echarts.use([TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer, UniversalTransition])

        type EChartsOption = echarts.ComposeOption<TitleComponentOption | ToolboxComponentOption | TooltipComponentOption | GridComponentOption | LegendComponentOption | LineSeriesOption>

        var myChart = echarts.init(unref(elLineRef))
        var option: EChartsOption

        option = {
            title: {
                text: 'Stacked Line'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
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
                },
                {
                    name: 'Search Engine',
                    type: 'line',
                    stack: 'Total',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        }

        option && myChart.setOption(option)
    }
</script>
<style lang="less" scoped>
    .el-card {
        margin-top: 20px;
    }
    .echart-box {
        height: 400px;
    }
</style>
