<template>
    <hy-step-group
        :current="current"
        :direction="direction"
        :dot="dot"
        :align-center="alignCenter"
        :active-color="activeColor"
        :inactive-color="inactiveColor"
        :icon-size="iconSize"
        :custom-class="customClass"
        :custom-style="customStyle"
    >
        <hy-step-item
            v-for="(item, i) in list"
            :key="i"
            :title="item.title"
            :description="itemDescription(item)"
            :status="item.error && current === i ? 'error' : undefined"
        ></hy-step-item>
        <slot v-if="!list.length"></slot>
    </hy-step-group>
</template>

<script lang="ts">
export default {
    name: 'hy-steps',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { watch } from 'vue'
import type { IStepsEmits, StepListVo } from './typing'
import stepsProps from './props'
// 组件
import HyStepGroup from '../hy-step-group/hy-step-group.vue'
import HyStepItem from '../hy-step-item/hy-step-item.vue'

/**
 * 一般用于完成一个任务要分几个步骤，标识目前处于第几步的场景。
 * 支持两种用法：传入 list 数据集，或直接嵌套 hy-step-item 子组件，内部统一经 hy-step-group + hy-step-item 渲染。
 * @displayName hy-steps
 */
defineOptions({})

const props = defineProps(stepsProps)
const emit = defineEmits<IStepsEmits>()

// 上一步为错误步骤时回跳到首个错误步骤（沿用 list 数据的联动行为）
watch(
    () => props.current,
    (newVal: number) => {
        if (props.list[newVal - 1]?.error) {
            const index = props.list.findIndex((item) => item.error)
            emit('update:current', index)
            emit('change', index)
        }
    }
)

/** list 数据的描述文案：描述与时间拼接展示 */
const itemDescription = (item: StepListVo): string => {
    return [item.docs, item.date].filter(Boolean).join(' ')
}
</script>
