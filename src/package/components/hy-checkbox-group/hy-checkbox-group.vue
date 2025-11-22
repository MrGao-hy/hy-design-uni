<template>
    <view class="hy-checkbox-group" :class="bemClass">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import { computed, provide, toRefs } from 'vue'
import { bem } from '../../libs'
import type { ICheckBoxGroupEmits } from './typing'
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

const context = {
    ...toRefs(props),
    setCheckedStatus(value: string | number) {
        let arr = [...props.modelValue]
        if (props.modelValue?.includes(value)) {
            arr = props.modelValue?.filter((item) => item !== value)
        } else {
            arr.push(value)
        }
        emit('update:modelValue', arr)
        emit('change', arr)
    }
}

provide('hy-checkbox-group', context)
</script>

<style lang="scss" scoped>
@import './index';
</style>
