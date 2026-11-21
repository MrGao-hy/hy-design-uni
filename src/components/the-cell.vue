<template>
    <view v-if="title" class="hy-title">{{ title }}</view>
    <view class="hy-container">
        <hy-cell>
            <template v-for="(item, i) in list" :key="i">
                <!-- 常规单元格：通过 value 属性展示右侧值 -->
                <hy-cell-item
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

interface IProps {
    title?: string
    list: CommonType.CellItem[]
}

const props = withDefaults(defineProps<IProps>(), {})
const emit = defineEmits(['click'])

const onClick = (temp: CommonType.CellItem, index: number) => {
    emit('click', temp, index)
}
</script>
