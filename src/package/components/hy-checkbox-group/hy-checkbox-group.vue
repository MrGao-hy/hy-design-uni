<template>
    <view class="hy-checkbox-group" :class="[bemClass, customClass]" :style="customStyle">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { bem, useChildren } from '../../libs'
import type { ICheckBoxGroupEmits } from './typing'
import { CHECKBOX_GROUP_KEY } from './checkbox'
import checkboxGroupProps from './props'

/**
 * 复选框组件一般用于需要多个选择的场景，需要搭配hy-checkbox-item组件一起使用
 * @displayName hy-checkbox-group
 */
defineOptions({})

const props = defineProps(checkboxGroupProps)
const emit = defineEmits<ICheckBoxGroupEmits>()

const bemClass = computed(() => {
    return bem('checkbox-group', props, ['placement'])
})

const { linkChildren } = useChildren(CHECKBOX_GROUP_KEY)

/** 切换某项选中状态并同步双向绑定值 */
const setCheckedStatus = (value: string | number) => {
    let arr = props.modelValue ? [...props.modelValue] : []
    if (props.modelValue?.includes(value)) {
        arr = props.modelValue?.filter((item) => item !== value)
    } else {
        arr.push(value)
    }
    emit('update:modelValue', arr)
    emit('change', arr)
}

// 向子组件注入 props 代理与切换方法，子组件读取时保持响应性
linkChildren({ props, setCheckedStatus })
</script>

<style lang="scss">
@use './index';
</style>
