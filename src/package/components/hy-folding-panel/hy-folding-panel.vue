<template>
    <view class="hy-folding-panel">
        <slot></slot>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-folding-panel'
}
</script>

<script setup lang="ts">
import { provide, ref, watch, toRefs } from 'vue'
import type { IFoldingPanelGroupEmits } from './typing'
import foldingPanelProps from './props'

const props = defineProps(foldingPanelProps)
const emit = defineEmits<IFoldingPanelGroupEmits>()

// 内部激活索引
const activeIndex = ref(props.modelValue)

// 监听v-model变化
watch(
    () => props.modelValue,
    (newVal) => {
        activeIndex.value = newVal
    }
)

// 监听内部激活索引变化
watch(activeIndex, (newVal) => {
    emit('update:modelValue', newVal)
    emit('change', newVal)
})

// 提供给子组件的方法
const updateActiveIndex = (index: number) => {
    if (props.disabled) return

    if (props.accordion) {
        // 手风琴模式下，如果点击的是当前激活的索引，则关闭（设为-1）
        const wasActive = activeIndex.value === index
        activeIndex.value = wasActive ? -1 : index

        // 触发相应的事件
        if (!wasActive) {
            emit('open', index)
        } else {
            emit('close', index)
        }
    } else {
        // 非手风琴模式下，这里不做特殊处理，由子组件自己控制
        activeIndex.value = index
    }
}

// 提供给子组件的配置
provide('hy-folding-panel', {
    ...toRefs(props),
    activeIndex,
    updateActiveIndex
})
// 对外暴露的方法
defineExpose({
    /**
     * 打开指定索引的面板
     */
    open: (index: number | string) => {
        if (props.disabled) return
        activeIndex.value = index
        emit('open', index)
    },

    /**
     * 关闭所有面板
     */
    closeAll: () => {
        if (props.disabled) return
        const prevIndex = activeIndex.value
        activeIndex.value = -1
        if (prevIndex !== -1) {
            emit('close', prevIndex)
        }
    },

    /**
     * 切换指定索引面板的状态
     */
    toggle: (index: number | string) => {
        if (props.disabled) return
        updateActiveIndex(index)
    },

    /**
     * 关闭指定索引的面板
     */
    close: (index: number | string) => {
        if (props.disabled) return
        if (activeIndex.value === index) {
            activeIndex.value = -1
            emit('close', index)
        }
    }
})
</script>

<style lang="scss" scoped></style>
