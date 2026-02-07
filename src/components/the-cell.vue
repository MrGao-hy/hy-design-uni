<template>
    <view v-if="title" class="hy-title">{{ title }}</view>
    <view class="hy-container">
        <hy-cell>
            <hy-cell-item
                v-for="(item, i) in list"
                :key="i"
                :title="item.title"
                :url="item.url"
                @click="onClick(item, i)"
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
    title?: string
    list: ILists[]
}

const props = withDefaults(defineProps<IProps>(), {})
const emit = defineEmits(['click'])

const onClick = (temp: AnyObject, index: number) => {
    emit('click', temp, index)
}
</script>
