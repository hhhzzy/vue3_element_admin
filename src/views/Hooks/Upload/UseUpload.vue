<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>文件上传</span>
            </div>
        </template>
        <Upload :url="'http://localhost:7002/api/upload'" :file-list="unref(fileList)" @on-success="handleSucess" @on-exceed="handleExceed" @before-remove="beforeRemove" />
    </el-card>
    <el-card class="box-card" style="margin-top: 10px">
        <template #header>
            <div class="card-header">
                <span>文件上传</span>
            </div>
        </template>
        <Upload :url="'http://localhost:7002/api/upload'" :file-list="unref(fileList2)" @on-success="handleSucess2" @on-exceed="handleExceed2" @before-remove="beforeRemove2" />
    </el-card>
</template>
<script lang="ts" setup>
    import { unref } from 'vue'
    // import type { UploadUserFile } from 'element-plus'
    import Upload from '@/components/Upload/Upload.vue'
    import { useUpload } from '@/hooks/useUpload'
    // 模拟附件删除接口
    const deleteFile = async () => {
        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, 1000)
        })
    }
    const { methods, fileList } = useUpload({
        deleteFile: deleteFile
    })
    const { handleSucess, beforeRemove, handleExceed } = methods
    fileList.value = [
        {
            name: '技术服务类.excel',
            url: 'https://element-plus.org/images/element-plus-logo.svg'
        },
        {
            name: '环保及环境工程类.pdf',
            url: 'https://element-plus.org/images/element-plus-logo.svg'
        }
    ]
    const { methods: methods2, fileList: fileList2 } = useUpload()
    const { handleSucess: handleSucess2, beforeRemove: beforeRemove2, handleExceed: handleExceed2 } = methods2
    fileList2.value = [
        {
            name: '飞机大炮类.excel',
            url: 'https://element-plus.org/images/element-plus-logo.svg'
        },
        {
            name: '测试工具类.pdf',
            url: 'https://element-plus.org/images/element-plus-logo.svg'
        }
    ]
</script>
