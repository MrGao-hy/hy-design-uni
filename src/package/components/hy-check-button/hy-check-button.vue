<template>
    <view class="hy-check-button">
        <template v-for="(item, i) in columns_1" :key="i">
            <HyTag
                :text="item?.[fieldNames.label] as string"
                :name="i"
                :type="type"
                :size="size"
                :shape="shape"
                :disabled="isDisabled(item.disabled)"
                :plain="!item?.[fieldNames.checked]"
                @click="onCheckbox"
            ></HyTag>
        </template>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-check-button',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { watch, ref } from 'vue'
import type { ICheckButtonEmits } from './typing'
import type { CheckboxColumnsVo } from './typing'
import HyTag from '../hy-tag/hy-tag.vue'
import { isArray, isNumber } from '../../libs'
import type { TagParamsVo } from '../hy-tag/typing'
import checkButtonProps from './props'

/**
 * 该组件内部实现以tag二次封装按钮复选框和单选框
 * @displayName hy-check-button
 */
defineOptions({})

const props = defineProps(checkButtonProps)
const emit = defineEmits<ICheckButtonEmits>()

const isDisabled = (disabledVal?: boolean): boolean => props.disabled || !!disabledVal

const columns_1 = ref<CheckboxColumnsVo[]>()

watch(
    () => props.modelValue,
    (newValue: string | number | (string | number)[]) => {
        if (!isArray(props.columns) || !props.columns.length) return
        columns_1.value = props.columns.map((item) => {
            if (isArray(newValue)) {
                item[props.fieldNames.checked] = newValue.includes(
                    item[props.fieldNames.value] as string
                )
            } else {
                item[props.fieldNames.checked] = newValue === item[props.fieldNames.value]
            }
            return item
        })
    },
    { immediate: true }
)

const onCheckbox = ({ name }: TagParamsVo) => {
    if (name !== undefined && isNumber(name)) {
        const index = Number(name)
        if (props.selectType === 'checkbox') {
            props.columns[index][props.fieldNames.checked] =
                !props.columns[index][props.fieldNames.checked]
            emit(
                'update:modelValue',
                props.columns
                    .filter((item) => item[props.fieldNames.checked])
                    .map((item) => item[props.fieldNames.value])
            )
        } else {
            emit('update:modelValue', props.columns[index][props.fieldNames.value])
        }
        emit('change', props.columns[index])
    }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/mixin';
@include b(check-button) {
    display: grid;
    grid-template-columns: v-bind(col);
    gap: v-bind(gap);
}
</style>
