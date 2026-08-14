<template>
    <view v-if="title" class="hy-title">{{ title }}</view>
    <view class="hy-container">
        <hy-cell>
            <hy-cell-item
                v-for="(item, i) in list"
                :key="i"
                :title="item.title"
                :value="typeof item.value === 'boolean' ? '' : String(item.value)"
                :url="item.url"
                @click="onClick(item, i)"
            >
                <template #value v-if="!item.value && showRate">
                    <!-- 评分组件，阻止冒泡避免触发单元格跳转 -->
                    <view @click.stop @touch.stop>
                        <hy-rate
                            v-model="rateMap[item.url]"
                            @change="(val: number) => onRateChange(item.url, val)"
                        ></hy-rate>
                    </view>
                </template>
            </hy-cell-item>
        </hy-cell>
    </view>
</template>
<script setup lang="ts">
import HyCellItem from '@/package/components/hy-cell-item/hy-cell-item.vue'
import HyCell from '@/package/components/hy-cell/hy-cell.vue'
import { reactive } from 'vue'

interface IProps {
    title?: string
    list: CommonType.CellItem[]
    showRate?: boolean
}

const props = withDefaults(defineProps<IProps>(), {})
const emit = defineEmits(['click'])

// 评分映射，key 为页面 url，value 为评分值（0-5）
const rateMap = reactive<Record<string, number>>({})

// 初始化：从本地存储读取评分，初始值为 0
props.list.forEach((item) => {
    if (item.url) {
        const stored = uni.getStorageSync(`rate_${item.url}`)
        rateMap[item.url] = typeof stored === 'number' ? stored : 0
    }
})

// 评分变化时存入本地存储
const onRateChange = (url: string, value: number) => {
    uni.setStorageSync(`rate_${url}`, value)
}

const onClick = (temp: CommonType.CellItem, index: number) => {
    emit('click', temp, index)
}
</script>
