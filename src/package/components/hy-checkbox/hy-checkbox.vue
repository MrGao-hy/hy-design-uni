<template>
    <hy-checkbox-group
        v-model="innerValue"
        :shape="shape"
        :size="size"
        :disabled="disabled"
        :activeColor="activeColor"
        :inactiveColor="inactiveColor"
        :iconSize="iconSize"
        :iconPlacement="iconPlacement"
        :borderBottom="borderBottom"
        :labelSize="labelSize"
        :labelColor="labelColor"
        :labelDisabled="labelDisabled"
        :placement="placement"
        :customStyle="customStyle"
        :customClass="customClass"
        @change="groupChangeHandler"
    >
        <template v-for="(item, i) in columns" :key="i">
            <!-- 小程序端 u-s 按组件节点静态收集插槽名（无视 v-if），必须拆互斥节点控制是否传插槽 -->
            <hy-checkbox-item v-if="$slots.icon && $slots.label" v-bind="itemBindings(item)">
                <template #icon="{ isChecked }">
                    <slot name="icon" :isChecked="isChecked" :iconSize="addUnit(iconSize)"></slot>
                </template>
                <template #label>
                    <slot name="label" :record="item"></slot>
                </template>
            </hy-checkbox-item>
            <hy-checkbox-item v-else-if="$slots.icon" v-bind="itemBindings(item)">
                <template #icon="{ isChecked }">
                    <slot name="icon" :isChecked="isChecked" :iconSize="addUnit(iconSize)"></slot>
                </template>
            </hy-checkbox-item>
            <hy-checkbox-item v-else-if="$slots.label" v-bind="itemBindings(item)">
                <template #label>
                    <slot name="label" :record="item"></slot>
                </template>
            </hy-checkbox-item>
            <!-- 均未传插槽：走 hy-checkbox-item 原生默认渲染 -->
            <hy-checkbox-item v-else v-bind="itemBindings(item)" />
        </template>
    </hy-checkbox-group>
</template>

<script lang="ts">
export default {
    name: 'hy-checkbox',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '../../libs'
import type { ICheckBoxEmits } from './typing'
import type { CheckboxColumnsVo } from '../hy-check-button/typing'
import checkboxProps from './props'
// 组件
import HyCheckboxGroup from '../hy-checkbox-group/hy-checkbox-group.vue'
import HyCheckboxItem from '../hy-checkbox-item/hy-checkbox-item.vue'

/**
 * 复选框组件一般用于需要多个选择的场景，基于 hy-checkbox-group 与 hy-checkbox-item 组合实现的便捷封装
 * @displayName hy-checkbox
 */
defineOptions({})

const props = defineProps(checkboxProps)
const emit = defineEmits<ICheckBoxEmits>()

/**
 * @description 提取列表项传递给 hy-checkbox-item 的属性，供四个互斥分支节点复用
 * */
const itemBindings = (item: CheckboxColumnsVo) => ({
    value: item[props.fieldNames.value],
    label: item[props.fieldNames.label] as string,
    disabled: item.disabled,
    checked: !!item[props.fieldNames.checked]
})

/**
 * @description group 的双向绑定值恒为数组，与外部 boolean（单列）/数组（多列）自动转换
 * */
const innerValue = computed<(string | number)[]>({
    get: () => {
        if (Array.isArray(props.modelValue)) return props.modelValue
        // 单列时支持 boolean
        const first = props.columns?.[0]
        return props.modelValue && first ? [first[props.fieldNames.value]] : []
    },
    set: (arr) => {
        if (props.columns?.length === 1) {
            emit(
                'update:modelValue',
                arr.includes(props.columns[0][props.fieldNames.value] as string)
            )
        } else {
            emit('update:modelValue', arr)
        }
    }
})

/**
 * @description group 的 change 仅携带数组，对比变化值回查 columns，保持原有 change(temp) 事件语义
 * */
const groupChangeHandler = (arr: (string | number)[]) => {
    // 事件时序上此刻 props.modelValue 仍为变化前的值
    const prev = Array.isArray(props.modelValue)
        ? props.modelValue
        : props.modelValue && props.columns?.[0]
          ? [props.columns[0][props.fieldNames.value]]
          : []
    const changedValue =
        arr.find((item) => !prev.includes(item)) ?? prev.find((item) => !arr.includes(item))
    const temp = props.columns?.find((item) => item[props.fieldNames.value] === changedValue)
    emit('change', (temp ?? arr) as CheckboxColumnsVo)
}
</script>
