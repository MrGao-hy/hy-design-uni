<template>
    <view v-if="title" class="hy-title">{{ title }}</view>
    <view class="hy-container">
        <hy-cell>
            <template v-for="(item, i) in list" :key="i">
                <!-- 需要评分时渲染插槽版单元格
                     注意：禁止在 template #value 上使用 v-if，小程序端 u-s 插槽声明为编译期
                     静态生成，会使子组件 $slots.value 恒为 true，导致 value 文本无法显示 -->
                <hy-cell-item
                    v-if="showRate && !item.value"
                    :title="item.title"
                    :url="item.url"
                    @click="onClick(item, i)"
                >
                    <template #value>
                        <!-- 评分组件，阻止冒泡避免触发单元格跳转 -->
                        <view @click.stop @touch.stop>
                            <hy-rate
                                v-model="rateMap[item.url]"
                                @change="(val: number) => onRateChange(item.url, val)"
                            ></hy-rate>
                        </view>
                    </template>
                </hy-cell-item>
                <!-- 常规单元格：通过 value 属性展示右侧值 -->
                <hy-cell-item
                    v-else
                    :title="item.title"
                    :value="typeof item.value === 'boolean' ? '' : String(item.value)"
                    :url="item.url"
                    @click="onClick(item, i)"
                ></hy-cell-item>
            </template>
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
