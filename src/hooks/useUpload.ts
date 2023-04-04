import { ref, unref } from 'vue'
import type { UploadUserFile, UploadFile, UploadFiles } from 'element-plus'
import { ElMessageBox, ElMessage } from 'element-plus'
interface UseUploadConfig {
    deleteFile: () => {} // 删除附件接口
}
// interface IFileObject {
//     name: string
//     url: string
// }
export const useUpload = (config?: UseUploadConfig) => {
    const fileList = ref<UploadUserFile[]>([])
    //
    const methods = {
        /**
         * 上传成功函数
         * @param response 上传成功返回的数据
         * @param uploadFile 当前的上传数据
         * @param uploadFiles  已上传的所有数据
         */
        handleSucess: async (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
            fileList.value.push(response.data)
            console.log(response, fileList, uploadFile, uploadFiles)
        },
        /**
         * 删除之前函数
         * @param uploadFile
         * @param uploadFiles
         */
        beforeRemove: async (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
            console.log(uploadFile, uploadFiles)

            ElMessageBox({
                title: '提示',
                message: `是否删除${uploadFile.name}文件？删除后不可恢复！`,
                showCancelButton: true,
                beforeClose: async (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true
                        instance.confirmButtonText = '删除中...'
                        // 调用删除事件
                        const response = await config?.deleteFile()
                        instance.confirmButtonLoading = false
                        // 模拟删除
                        fileList.value = unref(fileList).filter((item: any) => item.uid !== uploadFile.uid)
                        console.log(response)
                        done()
                    } else {
                        done()
                    }
                }
            }).then(async () => {
                console.log(fileList)
                ElMessage({
                    type: 'success',
                    message: '删除成功'
                })
            })
        },
        /**
         * 当超出限制时，执行的钩子函数
         * @param data 超出提示
         */
        handleExceed: async (data: string) => {
            console.log(data)
            ElMessage({
                type: 'error',
                message: data
            })
        }
    }
    return {
        methods,
        fileList
    }
}
