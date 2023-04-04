// 判断是否是外链链接
export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)
/**
 * 获取地址栏参数变化
 * @param queryName 可选参数，需要获取的地址栏的值的key
 * @param u 可选参数，可解析其他的地址字符串
 * @returns 默认返回当前url的值，传另外的url则获取对应url的所有参数
 */
export const getUrlQueryValue = (queryName?: string, u?: string): boolean | string | object => {
    const query = u ? u.split('?')[1] : decodeURI(window.location.href.split('?')[1])
    console.log(query, queryName, u)
    const q = query && query.split('&')
    const obj: any = {}
    if (q && q.length) {
        for (let i = 0; i < q.length; i++) {
            const keyValue = q[i].split('=')
            if (queryName && queryName === keyValue[0]) {
                return keyValue[1]
            } else {
                obj[keyValue[0]] = keyValue[1]
            }
        }
    }
    if (!queryName) {
        return obj
    } else {
        return false
    }
}
