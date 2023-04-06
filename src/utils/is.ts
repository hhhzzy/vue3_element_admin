const toString = Object.prototype.toString

// 判断数据类型
export const is = (val: any, type: string) => {
    return toString.call(val) === `[object ${type}]`
}

export const isNumber = (val: any) => {
    return is(val, 'Number')
}
