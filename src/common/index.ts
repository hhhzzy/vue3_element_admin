import { store } from '@/store/index'
export const dispatchMapEvent = (events: string | object, data: any) => {
    const types = typeof events
    // 以字符串方式传递调用一个方法
    if (types === 'string') {
        store.dispatch('map/changeMapEvent', [
            {
                event: events,
                data
            }
        ])
    } else if (types === 'object') {
        // 以数组方式调用多个方法
        store.dispatch('map/changeMapEvent', events)
    }
}
