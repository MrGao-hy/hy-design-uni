<template>
    <view class="hy-check-button">
        <template v-for="(item, i) in columns" :key="i">
            <view
                :class="getItemClass(item)"
                @click="onCheckbox(item?.[fieldNames.value] as string | number | undefined)"
            >
                <slot v-if="$slots.default" :record="item"></slot>
                <text v-else>{{ item?.[fieldNames.label] }}</text>
            </view>
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
import { isArray, isBoolean } from '../../libs'
import checkButtonProps from './props'

/**
 * 该组件实现按钮复选框和单选框
 * @displayName hy-check-button
 */
defineOptions({})

const props = defineProps(checkButtonProps)
const emit = defineEmits<ICheckButtonEmits>()

const isDisabled = (disabledVal?: boolean): boolean => props.disabled || !!disabledVal

type CurrentValue = string | number | (string | number)[]

const current = ref<CurrentValue>([])

const isSelect = computed(() => {
    return (check?: string | number | boolean) => {
        if (check && !isBoolean(check) && isArray(current.value)) {
            return current.value.includes(check)
        } else {
            return current.value === check
        }
    }
})

const index = computed(() => {
    return (check: string | number) => {
        return props.columns?.findIndex((item: any) => item[props.fieldNames?.value] === check)
    }
})

const getItemClass = (item: any) => {
    const classes = [
        'hy-check-button__item',
        `hy-check-button__item--${props.shape}`,
        `hy-check-button__item--${props.size}`
    ]
    const selected = isSelect.value(item?.[props.fieldNames?.value])
    const disabled = isDisabled(item.disabled)

    if (disabled) {
        classes.push('hy-check-button__item--disabled')
    } else {
        if (selected) {
            classes.push(`hy-check-button__item--${props.type}`)
        } else {
            classes.push(`hy-check-button__item--${props.type}--plain`)
        }
    }

    return classes
}

watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue) current.value = newValue
    },
    { immediate: true }
)

const onCheckbox = (value: string | number | undefined) => {
    if (value === undefined) return
    changeCheckFn(value)
    changeRadioFn(value)
    emit('update:modelValue', current.value)
}

const changeRadioFn = (check: string | number) => {
    if (props.selectType === 'radio') {
        if (check !== current.value) {
            current.value = check
            emit('change', props.columns[index.value(check)])
        }
    }
}

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

<style lang="scss">
@use './index.scss';

.hy-check-button {
    grid-template-columns: v-bind(col);
    gap: v-bind(gap);
}
</style>
