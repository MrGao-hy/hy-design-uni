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
import { computed, provide, watch } from 'vue'
import type {
    IFoldingPanelContext,
    IFoldingPanelGroupEmits,
    IFoldingPanelExpose,
    FoldingPanelModelValue,
    FoldingPanelValue
} from './typing'
import foldingPanelProps from './props'

const props = defineProps(foldingPanelProps)
const emit = defineEmits<IFoldingPanelGroupEmits>()

/** 归一化当前展开项，兼容旧的 -1 与空字符串表示空值 */
const activeValues = computed<FoldingPanelValue[]>(() => {
    const value = props.modelValue

    if (props.accordion) {
        return Array.isArray(value) || value === -1 || value === '' ? [] : [value]
    }
    if (Array.isArray(value)) return value
    return value === -1 || value === '' ? [] : [value]
})

/** 手风琴与普通模式的空值类型不同，切换模式时同步修正绑定值 */
watch(
    () => props.accordion,
    (accordion) => {
        const next: FoldingPanelModelValue = accordion ? '' : []
        if (next !== props.modelValue) {
            emit('update:modelValue', next)
            emit('change', next)
        }
    }
)

/** 统一更新受控值 */
const updateValue = (value: FoldingPanelModelValue) => {
    emit('update:modelValue', value)
    emit('change', value)
}

/** 由子项驱动状态变化，父组件始终是唯一状态源 */
const toggle = (index: FoldingPanelValue, expanded: boolean) => {
    if (props.disabled) return

    if (props.accordion) {
        const current = activeValues.value[0]
        const next = expanded ? index : ''

        if (current && current !== index) emit('close', current)
        updateValue(next)

        if (expanded) {
            emit('open', index)
        } else if (current === index) {
            emit('close', index)
        }
        return
    }

    const current = activeValues.value
    const next = expanded
        ? current.includes(index)
            ? current
            : current.concat(index)
        : current.filter((activeIndex) => activeIndex !== index)

    updateValue(next)
    if (expanded && !current.includes(index)) emit('open', index)
    if (!expanded && current.includes(index)) emit('close', index)
}

/** 判断面板是否展开 */
const isExpanded = (index: FoldingPanelValue) => activeValues.value.includes(index)

provide<IFoldingPanelContext>('hy-folding-panel', {
    props,
    toggle,
    isExpanded
})

/** 批量关闭当前展开项 */
const closeActivePanels = () => {
    activeValues.value.forEach((index) => emit('close', index))
}

// 对外暴露的方法
defineExpose<IFoldingPanelExpose>({
    /**
     * 打开指定索引的面板
     */
    open: (index: number | string) => {
        if (props.disabled || isExpanded(index)) return
        toggle(index, true)
    },

    /**
     * 关闭所有面板
     */
    closeAll: () => {
        if (props.disabled || activeValues.value.length === 0) return
        closeActivePanels()
        updateValue(props.accordion ? '' : [])
    },

    /**
     * 切换指定索引面板的状态
     */
    toggle: (index: number | string) => {
        toggle(index, !isExpanded(index))
    },

    /**
     * 关闭指定索引的面板
     */
    close: (index: number | string) => {
        if (props.disabled || !isExpanded(index)) return
        toggle(index, false)
    }
})
</script>

<style lang="scss" scoped></style>
