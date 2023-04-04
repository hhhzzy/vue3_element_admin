<template>
    <el-upload
        v-model:file-list="toRefs(props).fileList.value"
        class="upload-demo"
        :action="props.url"
        multiple
        :on-preview="handlePreview"
        :before-remove="beforeRemove"
        :limit="props.limit"
        :accept="props.accept"
        :on-exceed="handleExceed"
        :on-success="handleSucess"
        :headers="props.headers"
        :on-error="handleError"
    >
        <el-button type="primary">{{ props.buttonText }}</el-button>
        <template #tip>
            <div class="el-upload__tip">{{ props.tips }}</div>
        </template>
    </el-upload>
</template>
<script lang="ts" setup>
    import { toRefs } from 'vue'

    import type { UploadProps, UploadUserFile, UploadFile, UploadFiles } from 'element-plus'
    interface IUploadProps {
        fileList: Array<UploadUserFile>
        url: string // 上传地址
        tips?: string // 文件提示
        buttonText?: string // 上传按钮文字
        limit?: number // 上传文件个数限制
        accept?: string // 上传文件类型限制
        headers?: object // 上传接口的请求头部
    }

    const props = withDefaults(defineProps<IUploadProps>(), {
        tips: '为方便阅读，建议上传pdf格式文件。',
        fileList: () => [],
        limit: 10, // 默认上传10个附件
        accept: '',
        buttonText: '上传文件',
        headers: () => {
            return {
                Authorization: 'Bearer '
            }
        }
    })
    const emit = defineEmits(['on-success', 'before-remove', 'on-exceed'])
    /**
     * 上传成功函数
     * @param response 上传成功返回的数据
     * @param uploadFile 当前的上传数据
     * @param uploadFiles  已上传的所有数据
     */
    const handleSucess: UploadProps['onSuccess'] = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
        emit('on-success', response, uploadFile, uploadFiles)
    }

    const handlePreview: UploadProps['onPreview'] = uploadFile => {
        console.log(uploadFile)
    }
    /**
     *
     * @param files
     * @param uploadFiles
     */
    const handleExceed: UploadProps['onExceed'] = () => {
        emit('on-exceed', '超出上传附件个数！')
    }
    /**
     * 删除之前函数
     * @param uploadFile
     * @param uploadFiles
     */
    const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
        emit('before-remove', uploadFile, uploadFiles)
        return false
    }
    const handleError: UploadProps['onError'] = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
        console.log(error, uploadFile, uploadFiles)
    }
</script>
<style lang="less" scoped>
    .el-upload--text {
        display: inline-block;
    }
    .el-upload__tip {
        display: inline-block;
        font-size: 14px;
        color: #d7d7d7;
        margin-left: 10px;
    }
    /deep/.el-upload-list {
        .el-upload-list__item {
            height: 20px;
            line-height: 20px;
            &:hover {
                background-color: transparent;
            }
            .el-upload-list__item-info {
                width: auto;
            }
            .el-icon--upload-success {
                display: none;
            }
            .el-icon--close {
                right: auto;
                opacity: 1;
                display: inline-flex;
                svg {
                    display: none;
                }
                &:before {
                    content: '';
                    background-image: url('../../assets/lajiton.png');
                    display: block;
                    width: 14px;
                    height: 14px;
                    background-size: 100% 100%;
                }
            }
        }
    }
</style>
