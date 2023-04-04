// 使用import 或者 require需要用declare global{}包着
// 定义请求返回参数
interface IResult {
    code: number
    message: string
}
declare interface IResultData<T = any> extends IResult {
    data?: T
}
