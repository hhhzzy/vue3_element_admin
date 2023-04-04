<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>防抖</span>
            </div>
        </template>
        <div>
            <el-input v-model="count" placeholder="Please input" @input="changeText" style="margin-top: 10px; width: 200px" />
            触发防抖，停止输入2s后出现提示
        </div>
        <div style="margin-top: 10px; margin-bottom: 10px">
            <el-select filterable remote :remote-method="remoteMethod" :loading="loading" v-model="value" class="m-2" placeholder="远程搜索">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            触发防抖，停止输入2s后下拉出现值
        </div>
        <input type="text" v-model="number" @input="change" />
        <p>触发防抖：{{ number }}</p>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px">
        <template #header>
            <div class="card-header">
                <span>节流</span>
            </div>
        </template>
        <el-button type="primary" @click="onClick">click</el-button>
        <p>第一次点击是会触发一次，后每2s触发一次，最后停止后触发一次</p>
        <p>点击事件时触发的次数：{{ clickNum }}</p>
    </el-card>
</template>
<script lang="ts" setup>
    import { useDebounceRef, useDebounceFn } from '@/hooks/useDebounce'
    import { useThrottleFn } from '@/hooks/useThrottle'
    import { ref, onMounted } from 'vue'
    const count = ref(1)
    const number = useDebounceRef(count.value, 1000)
    const change = () => {
        console.log(number)
    }
    const changeText = useDebounceFn(() => {
        alert(count.value)
    }, 2000)
    interface ListItem {
        value: string
        label: string
    }

    const list = ref<ListItem[]>([])
    const options = ref<ListItem[]>([])
    const loading = ref(false)
    const value = ref('')

    const remoteMethod = (query: string) => {
        if (query) {
            loading.value = true
            useDebounceFn(() => {
                setTimeout(() => {
                    loading.value = false
                    options.value = list.value.filter(item => {
                        return item.label.toLowerCase().includes(query.toLowerCase())
                    })
                }, 200)
            }, 2000)()
        }
    }
    const states = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
    ]
    onMounted(() => {
        list.value = states.map(item => {
            return { value: `value:${item}`, label: `label:${item}` }
        })
        console.log(list)
    })
    const clickNum = ref(0)
    const onClick = useThrottleFn(() => {
        clickNum.value++
    }, 2000)
</script>
