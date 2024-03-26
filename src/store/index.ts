import { InjectionKey } from '@vue/runtime-core'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { store as user, IUserState } from './modules/user'
import { store as permission, IPermissionRoutesState } from './modules/permission'
import { store as tagsView, ITagsViewState } from './modules/tagsView'
import { store as app, IAppState } from './modules/app'
import { store as map, IMapState } from './modules/map'
// 为 store state 声明类型
export interface IRooteState {
    user: IUserState
    permission: IPermissionRoutesState
    tagsView: ITagsViewState
    app: IAppState
    map: IMapState
}
// 定义 injection key
export const key: InjectionKey<Store<IRooteState>> = Symbol()

export const store: Store<IRooteState> = createStore({
    modules: {
        user,
        permission,
        tagsView,
        app,
        map
    }
})
export function useStore() {
    return baseUseStore(key)
}
