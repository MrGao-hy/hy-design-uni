<template>
    <view
        class="hy-checkbox cursor-pointer"
        @tap.stop="wrapperClickHandler"
        :style="checkboxStyle"
        :class="[
            `hy-checkbox--label__${checkboxGroup?.iconPlacement?.value}`,
            checkboxGroup?.borderBottom?.value &&
                checkboxGroup?.placement?.value === 'column' &&
                'hy-border__bottom'
        ]"
    >
        <view @tap.stop="iconClickHandler" :class="iconClasses" :style="iconWrapStyle">
            <template v-if="isChecked">
                <slot v-if="$slots.icon" name="icon"></slot>
                <HyIcon
                    v-else
                    class="hy-checkbox--icon-wrap__icon"
                    :name="IconConfig.CHECK_MASK"
                    :size="
                        addUnit(
                            sizeType[checkboxGroup?.size?.value] || checkboxGroup?.iconSize?.value
                        )
                    "
                    :color="checkboxGroup?.iconColor?.value || '#ffffff'"
                />
            </template>
        </view>
        <view
            :class="[
                'hy-checkbox--label__wrap',
                'cursor-pointer',
                disabled && 'hy-checkbox--label__wrap--disabled'
            ]"
            @tap.stop="labelClickHandler"
        >
            <slot name="label">
                <text
                    :style="{
                        color: checkboxGroup?.labelColor?.value,
                        fontSize: addUnit(
                            sizeType[checkboxGroup?.size?.value] || checkboxGroup?.labelSize?.value
                        )
                    }"
                >
                    {{ label }}
                </text>
            </slot>
        </view>
    </view>
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
import { computed, watch, ref, reactive, inject } from 'vue'
import type { CSSProperties } from 'vue'
import { IconConfig, addUnit, error } from '../../libs'
import type { ICheckboxGroupContext } from './typing'
import checkboxItemProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 复选框组件一般用于需要多个选择的场景，需要搭配hy-checkbox-group一起使用
 * @displayName hy-checkbox-item
 */
defineOptions({})

const props = defineProps(checkboxItemProps)

// 注入表单上下文
const checkboxGroup = inject<ICheckboxGroupContext>('hy-checkbox-group')
const isChecked = ref(false)
const sizeType: AnyObject = reactive({
    small: 14,
    medium: 18,
    large: 24
})

watch(
    () => props.checked,
    (newValue) => {
        isChecked.value = newValue
        if (props.checked) checkboxGroup?.setCheckedStatus(props.value)
    },
    { immediate: true }
)

watch(
    () => checkboxGroup?.modelValue.value,
    (newVal) => {
        if (newVal?.length) {
            isChecked.value = newVal.includes(props.value)
        } else {
            isChecked.value = false
        }
    },
    { immediate: true }
)

const isDisabled = (): boolean => checkboxGroup?.disabled?.value || props.disabled

const checkboxStyle = computed(() => {
    const style: CSSProperties = {}
    if (checkboxGroup?.borderBottom?.value && checkboxGroup?.placement?.value === 'row') {
        error(
            '检测到您将borderBottom设置为true，需要同时将hy-checkbox-group的placement设置为column才有效'
        )
    }
    // 当父组件设置了显示下边框并且排列形式为纵向时，给内容和边框之间加上一定间隔
    if (checkboxGroup?.borderBottom?.value && checkboxGroup?.placement?.value === 'column') {
        style.paddingBottom = '8px'
    }
    return Object.assign(style, checkboxGroup?.customStyle?.value)
})
/**
 * @description 定义icon的Class类名
 * */
const iconClasses = computed(() => {
    let classes: string[] = ['hy-checkbox--icon-wrap', 'cursor-pointer']
    // 组件的形状
    classes.push('hy-checkbox--icon-wrap--' + checkboxGroup?.shape?.value)
    if (isDisabled()) {
        classes.push('hy-checkbox--icon-wrap--disabled')
    }
    if (isChecked.value) {
        classes.push('hy-checkbox--icon-wrap--checked')
        if (isDisabled()) {
            classes.push('hy-checkbox--icon-wrap--disabled--checked')
        }
    }
    return classes
})

/**
 * @description 定义icon的样式
 * */
const iconWrapStyle = computed(() => {
    // checkbox的整体样式
    const style: CSSProperties = {}
    style.backgroundColor =
        isChecked.value && !isDisabled() ? checkboxGroup?.activeColor?.value : ''
    style.borderColor =
        isChecked.value && !isDisabled()
            ? checkboxGroup?.activeColor?.value
            : checkboxGroup?.inactiveColor?.value
    if (checkboxGroup?.size?.value) {
        style.width = addUnit(sizeType[checkboxGroup.size.value] || checkboxGroup.size.value)
        style.height = addUnit(sizeType[checkboxGroup.size.value] || checkboxGroup.size.value)
    }
    return style
})

/**
 * @description 点击图标
 * */
const iconClickHandler = (e: Event) => {
    e.stopPropagation()
    if (!isDisabled()) {
        setCheckedStatus()
    }
}
/**
 * @description 点击整行
 * */
const wrapperClickHandler = (e: Event) => {
    e.stopPropagation()
    if (checkboxGroup?.labelDisabled?.value || isDisabled()) return
    setCheckedStatus()
}
/**
 * @description 点击label
 * */
const labelClickHandler = (e: Event) => {
    e.stopPropagation()
    if (checkboxGroup?.labelDisabled?.value || isDisabled()) return
    setCheckedStatus()
}

const setCheckedStatus = () => {
    // 将本组件标记为与原来相反的状态
    isChecked.value = !isChecked.value
    checkboxGroup?.setCheckedStatus(props.value)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
