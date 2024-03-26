<template>
    <div class="switch-map">
        <div class="maps-list-wrapper">
            <ul class="maps-list">
                <li class="maps-list-item" :class="{ active: basemap === item.basemap }" v-for="(item, index) in maps" :key="'map' + index" @click="onChangeMap(item)">
                    <img class="maps-list-item__img" :src="item.img" />
                    <span class="maps-list-item__name">{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref, inject } from 'vue'
    import imageImg from '@/assets/map/map-1.jpg'
    import vectorImg from '@/assets/map/map-2.jpg'
    import terrainImg from '@/assets/map/map-3.jpg'
    import '@/common/mapEvent/index'
    import { useStore } from '@/store/index'

    import { dispatchMapEvent } from '@/common/index'
    import { getBasemap } from '@/utils/injectionKey'
    // 地图底图
    const basemap = inject(getBasemap)
    const maps = ref([
        {
            basemap: 'img',
            name: '影像',
            img: imageImg
        },
        {
            basemap: 'vec',
            name: '矢量',
            img: vectorImg
        },
        {
            basemap: 'ter',
            name: '地形',
            img: terrainImg
        }
    ])
    const emit = defineEmits(['change-basemap', 'map-set-view-scale'])
    const store = useStore()
    // 切换底图
    const onChangeMap = (item: { basemap: string }) => {
        emit('change-basemap', item.basemap)
        console.log(store)
        // 底图为地形图时，改变scale
        if (item.basemap === 'ter') {
            emit('map-set-view-scale', { scale: 30000 })
        } else {
            emit('map-set-view-scale', { scale: 10000 })
        }
        // 切换底图方法
        dispatchMapEvent('onChangeBasemap', { basemap: item.basemap })
    }
</script>
<style lang="less" scoped>
    .switch-map {
        position: absolute;
        bottom: 10px;
        right: 65px;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 2px #0003;
        width: 120px;
        overflow: hidden;
        transition: 0.5s;

        &:hover {
            width: 274px;
        }

        &.has-operate-panel {
            right: 65px;
        }
    }

    .maps-list {
        &-wrapper {
            margin: 8px;
            overflow: hidden;
        }

        float: left;
        width: 274px;
        height: 50px;

        &-item {
            float: left;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            margin: 0 4px;
            position: relative;
            overflow: hidden;

            &:first-child {
                margin-left: 0;
            }

            &:last-child {
                margin-right: 0;
            }

            &.active {
                .maps-list-item__img {
                    border: 1px solid var(--el-color-primary);
                }

                .maps-list-item__name {
                    text-shadow: none;
                    background: var(--el-color-primary);
                }
            }

            &__img {
                width: 80px;
                height: 50px;

                border-radius: 4px;
                overflow: hidden;
            }
            &__name {
                border-radius: 4px 0 0 0;
                position: absolute;
                text-align: center;
                // width: 100%;
                right: 0;
                bottom: 0;
                font-size: 12px;
                padding: 2px 4px;
                color: #fff;
                background: rgba(0, 0, 0, 0.5);
            }
        }
    }
</style>
