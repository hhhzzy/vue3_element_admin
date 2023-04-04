import url from './url'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from './cookies'

const ajax = axios.create({
    // baseURL: '/api', // 允许proxy跨域
    baseURL: url, // 请求地址
    timeout: 30000, // 请求超时
    withCredentials: true // 设置携带cooki
})
ajax.defaults.headers.post['Content-Type'] = 'application/json' // post 的 请求头设置
// 请求拦截
ajax.interceptors.request.use(
    (config: any) => {
        // 每次请求之前判断vuex中的token是否存在（也可以存在stroge里面）
        // 如果存在，则统一在请求的header中加上token，后台判断是否登录
        // 即使存在token，也有可能过期，所以在响应拦截中也要判断状态
        // 先把config.url进行URI编码，然后全局替换其中的特殊字符，然后再URI解码
        config.url = config.url ? decodeURI(encodeURI(config.url).replace(/%E2%80%8B/g, '')) : config.url
        const token = getToken()
        return {
            ...config,
            headers: {
                Authorization: `Bearer ${token}` // jwt验证
            }
        }
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)
// 响应拦截器
ajax.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log(response)
        const { data } = response
        return data
    },
    (err: AxiosError) => {
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = (err.response.data as any).error || '请求出错(400)'
                    break
                case 401:
                    // router.push({
                    //     path: '/login',
                    //     query: {
                    //         redirect: router.currentRoute.fullPath
                    //     }
                    // })
                    err.message = '未授权，请重新登录(401)'
                    break
                case 403:
                    // 删除token
                    // localStorage.removeItem('token')
                    // 跳转到登录页面可以吧当前浏览的页面传过去，登录成功后返回当前页面
                    // router.push({
                    //     path: 'login',
                    //     query: {
                    //         redirect: router.currentRoute.fullPath
                    //     }
                    // })
                    err.message = '拒绝访问(403)'
                    break
                case 404:
                    err.message = '请求出错(404)'
                    break
                case 408:
                    err.message = '请求超时(408)'
                    break
                case 500:
                    // Message.error('错了哦，这是一条错误消息')
                    // 取消请求
                    // source.cancel('stop')
                    err.message = '服务器错误(500)'
                    break
                case 501:
                    err.message = '服务未实现(501)'
                    break
                case 502:
                    err.message = '网络错误(502)'
                    break
                case 503:
                    err.message = '服务不可用(503)'
                    break
                case 504:
                    err.message = '网络超时(504)'
                    break
                case 505:
                    err.message = 'HTTP版本不受支持(505)'
                    break
                default:
                    err.message = `连接出错(${err.response.status})!`
            }
        } else {
            err.message = '连接服务器失败!'
        }
        ElMessage.error(err.message)
        return Promise.reject(err.message)
    }
)
// 常用方法封装
export const http = {
    get<T = any>(url: string, params?: object): Promise<IResultData<T>> {
        return ajax.get(url, { params })
    },
    post<T = any>(url: string, params?: object, config?: any): Promise<IResultData<T>> {
        return ajax.post(url, params, config)
    },
    put<T = any>(url: string, params?: object): Promise<IResultData<T>> {
        return ajax.put(url, params)
    },
    delete<T = any>(url: string, params?: object): Promise<IResultData<T>> {
        return ajax.delete(url, { params })
    }
}
export const Ajax = ajax
export default http
