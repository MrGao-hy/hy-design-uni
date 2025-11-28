<template>
    <view class="hy-title">{{ title }}</view>
    <view class="hy-container">
        <hy-cell>
            <hy-cell-item
                v-for="item in list"
                :key="item.title"
                :title="item.title"
                :url="item.url"
            ></hy-cell-item>
        </hy-cell>
    </view>
</template>
<script setup lang="ts">
import HyCellItem from '@/package/components/hy-cell-item/hy-cell-item.vue'
import HyCell from '@/package/components/hy-cell/hy-cell.vue'

interface ILists {
    title: string
    icon?: string
    url: string
}
interface IProps {
    title: string
    list: ILists[]
}

const props = withDefaults(defineProps<IProps>(), {})
</script>
