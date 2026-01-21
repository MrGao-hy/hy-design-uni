<template>
    <view class="hy-check-button">
        <template v-for="(item, i) in columns" :key="i">
            <hy-tag
                :text="item?.[fieldNames.label]"
                :name="item?.[fieldNames.value]"
                :type="type"
                :size="size"
                :shape="shape"
                :disabled="isDisabled(item.disabled)"
                :plain="!isSelect(item?.[fieldNames.value])"
                @click="onCheckbox"
            >
                <template #default>
                    <slot :record="item"></slot>
                </template>
            </hy-tag>
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
import { watch, ref, computed } from 'vue'
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

type CurrentValue = string | number | (string | number)[]

const current = ref<CurrentValue>([])

/**
 * 判断是否有选中值，true选中、false未选中
 * */
const isSelect = computed(() => {
    return (check: string | number) => {
        if (isArray(current.value)) {
            return current.value.includes(check)
        } else {
            return current.value === check
        }
    }
})
/**
 * 获取当前索引
 * */
const index = computed(() => {
    return (check: string | number) => {
        return props.columns?.findIndex((item: any) => item[props.fieldNames?.value] === check)
    }
})

watch(
    () => props.modelValue,
    (newValue: CurrentValue) => {
        current.value = newValue
    },
    { immediate: true }
)

/**
 * 点击执行函数
 * */
const onCheckbox = ({ name }: TagParamsVo) => {
    if (name === undefined) return
    changeCheckFn(name)
    changeRadioFn(name)

    emit('update:modelValue', current.value)
}

/**
 * 单选框执行函数
 * @param check 选择的值
 * */
const changeRadioFn = (check: string | number) => {
    if (props.selectType === 'radio') {
        if (check !== current.value) {
            current.value = check
            emit('change', props.columns[index.value(check)])
        }
    }
}

/**
 * 多选框执行函数
 * @param check 选择的值
 * */
const changeCheckFn = (check: string | number) => {
    if (props.selectType === 'checkbox') {
        if (!isArray(current.value)) current.value = []
        if (current.value.includes(check)) {
            current.value = current.value.filter((item) => item !== check)
        } else {
            current.value.push(check)
        }
        emit('change', props.columns[index.value(check)])
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
