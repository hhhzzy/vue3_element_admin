<template>
    <div ref="container" class="lf-container"></div>
    <!-- 节点面板 -->
    <NodePanel :lf="lf" :nodeList="nodeList" />
    <!--  节点添加流程组件  -->
    <el-dialog v-model="propertyVisible" title="设置流程步骤" width="30%">
        <Approvel :nodeData="clickNodeData" :lf="lf" :key="clickNodeData.id" ref="approvelRef" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="propertyVisible = false">取消</el-button>
                <el-button type="primary" @click="SaveApprove">保存</el-button>
            </span>
        </template>
    </el-dialog>
    <!--  辅助工具组件   -->
    <Control class="control-box" :lf="lf" v-if="lf" @catData="lfCatData" />
    <!--  流程图数据  -->
    <el-dialog v-model="approvelVisible" title="设置流程步骤" width="30%">
        <VueJsonPretty :data="jsonData" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="approvelVisible = false">取消</el-button>
                <el-button type="primary" @click="approvelVisible = false">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
    import VueJsonPretty from 'vue-json-pretty'
    import 'vue-json-pretty/lib/styles.css'
    import LogicFlow from '@logicflow/core'
    import { Snapshot } from '@logicflow/extension'
    import '@logicflow/core/dist/style/index.css'
    import { ref, onMounted } from 'vue'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import NodePanel from './components/NodePanel.vue'
    import Approvel from './components/ApprovelPropertySetting/Approvel.vue'
    import Control from './components/LFComponents/Control.vue'
    import { nodeList } from './config'
    import { registerStart, registerApprovel, registerJugement, registerEnd, registerConnect } from './components/RegisterNode'

    console.log(nodeList)
    // 声明容器的对应ref对象和LF对象
    const container = ref()
    const approvelRef = ref()
    const lf = ref()
    const propertyVisible = ref(false)
    const clickNodeData = ref({
        id: String
    })
    // 创建自定义组件
    const registerNode = () => {
        registerStart(lf.value)
        registerApprovel(lf.value)
        registerJugement(lf.value)
        registerEnd(lf.value)
        registerConnect(lf.value)
    }
    onMounted(() => {
        lf.value = new LogicFlow({
            // 通过选项指定了渲染的容器和需要显示网格
            container: container.value,
            keyboard: {
                enabled: true,
                // 自定义键盘事件
                shortcuts: [
                    {
                        keys: ['backspace'],
                        callback: () => {
                            ElMessageBox.confirm('是否要删除该节点？', '警告', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                const elements = lf.value.getSelectElements(true)
                                lf.value.clearSelectElements()
                                elements.edges.forEach((edge: any) => lf.value.deleteEdge(edge.id))
                                elements.nodes.forEach((node: any) => lf.value.deleteNode(node.id))
                            })
                        }
                    }
                ]
            },
            plugins: [Snapshot],
            grid: true
        })
        console.log(lf.value)
        registerNode()
        lf.value.render()
        // 初始化事件
        lfInitEvent(lf.value)
    })
    //  初始化事件
    const lfInitEvent = (lf: LogicFlow) => {
        // 节点单击事件
        lf.on('node:click', (data: any) => {
            console.log('node:click', data)
            propertyVisible.value = true
            clickNodeData.value = data.data
        })
        // 不允许建立连接事件
        lf.on('connection:not-allowed', (data: any) => {
            ElMessage.error(data.msg)
        })
        // 边点击事件
        lf.on('edge:click', (data: any) => {
            console.log(444)
        })
    }

    // 保存流程
    const SaveApprove = () => {
        // 调用子组件的方法
        approvelRef.value.SaveApprove()
    }

    // 查看数据
    const approvelVisible = ref(false)
    const jsonData = ref()
    const lfCatData = () => {
        console.log(44)
        approvelVisible.value = true
        jsonData.value = lf.value.getGraphData()
    }
</script>
<style lang="less" scoped>
    .lf-container {
        width: 100%;
        height: calc(100vh - 120px);
    }
    .control-box {
        position: absolute;
        top: 110px;
        right: 50px;
        z-index: 2;
    }
</style>
