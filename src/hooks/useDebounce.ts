import { customRef, ref } from 'vue'
export const useDebounceRef = (data: any, delay?: number) => {
    // 创建定时器
    let timer: any = null
    return delay == null
        ? ref(data)
        : customRef((track, trigger) => {
              return {
                  get() {
                      // 收集依赖
                      track()
                      return data
                  },
                  set(value) {
                      console.log(value)
                      // 清除定时器
                      if (timer != null) {
                          clearTimeout(timer)
                          timer = null
                      }
                      timer = setTimeout(() => {
                          data = value
                          // 派发更新
                          trigger()
                      }, delay)
                  }
              }
          })
}
/**
 * 函数防抖
 * @param fn 需要执行的函数
 * @param delay 延迟执行的时间
 * @returns
 */
export const useDebounceFn = <T extends Function>(fn: T, delay?: number) => {
    if (!delay) return fn
    let timer: ReturnType<typeof setTimeout> | null
    return function (this: any, ...arg: any[]) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arg)
        }, delay)
    }
}
