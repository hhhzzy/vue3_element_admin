export const useThrottleFn = <T extends Function>(fn: T, delay?: number) => {
    if (!delay) return fn
    let timer: ReturnType<typeof setTimeout> | null
    let startTime = Date.now() // 第一次进来的时间，在下面通过闭包存储起来
    return function (this: any, ...arg: any[]) {
        const newTime = Date.now()
        const remaining = delay - (newTime - startTime) // 下次执行fn的剩余时间，当前时间减去第一次进来的时间大于设置的节流时间，便于第一次点击的时候执行
        // 没有剩余时间，执行函数
        if (remaining <= 0) {
            // 执行函数时，清空当前定时器
            if (timer) {
                clearTimeout(timer)
            }
            fn.apply(this, arg)
            // 重置第一次进来的时间
            startTime = Date.now()
        } else {
            if (!timer) {
                timer = setTimeout(() => {
                    startTime = Date.now()
                    timer = null
                    fn.apply(this, arg)
                }, remaining)
            }
        }
    }
}
