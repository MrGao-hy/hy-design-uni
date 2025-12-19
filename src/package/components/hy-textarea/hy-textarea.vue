<template>
    <view
        :class="['hy-textarea', customClass, textareaClass]"
        :style="[textareaStyle, borderStyle(isFocus)]"
    >
        <textarea
            :class="['hy-textarea__field', disabled && 'hy-textarea__disabled-test']"
            :value="innerValue"
            :style="`height: ${autoHeight ? 'auto' : addUnit(height)}`"
            :placeholder="placeholder || ''"
            :placeholder-style="placeholderStyle"
            :placeholder-class="placeholderClass"
            :disabled="disabled"
            :focus="focus"
            :autoHeight="autoHeight"
            :fixed="fixed"
            :cursorSpacing="cursorSpacing"
            :cursor="cursor"
            :showConfirmBar="showConfirmBar"
            :selectionStart="selectionStart"
            :selectionEnd="selectionEnd"
            :adjustPosition="adjustPosition"
            :disableDefaultPadding="disableDefaultPadding"
            :holdKeyboard="holdKeyboard"
            :maxlength="maxlength"
            :confirm-type="confirmType"
            @focus="onFocus"
            @blur="onBlur"
            @linechange="onLineChange"
            @input="onInput"
            @confirm="onConfirm"
            @keyboardheightchange="onKeyboardheightchange"
        ></textarea>
        <!-- #ifndef MP-ALIPAY -->
        <text
            class="hy-textarea__count"
            :style="{
                'background-color': disabled ? 'transparent' : ''
            }"
            v-if="count"
        >
            {{ innerValue.length }}/{{ maxlength }}
        </text>
        <!-- #endif -->
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-textarea',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, ref, watch, nextTick, inject } from 'vue'
import type { CSSProperties } from 'vue'
import type { ITextareaEmits } from './typing'
import { addUnit } from '../../libs'
import type { FormItemContext } from '../hy-form-item/typing'
import type {
    InputOnBlurEvent,
    InputOnConfirmEvent,
    InputOnFocusEvent,
    InputOnKeyboardheightchangeEvent
} from '@uni-helper/uni-types'
import textareaProps from './props'

/**
 * 用于输入多行文本信息,聊天输入框等。
 * @displayName hy-textarea
 */
defineOptions({})

const props = defineProps(textareaProps)
const emit = defineEmits<ITextareaEmits>()
const formItem = inject<FormItemContext>('formItem')

// 输入框的值
const innerValue = ref<string>('')
// value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
const firstChange = ref<boolean>(true)
// value绑定值的变化是由内部还是外部引起的
const changeFromInner = ref<boolean>(false)
// 是否获取焦点
const isFocus = ref<boolean>(false)
// 过滤处理方法
let innerFormatter = (value: string) => value

watch(
    () => props.modelValue,
    (newVal) => {
        innerValue.value = newVal
        /* #ifdef H5 */
        // 在H5中，外部value变化后，修改input中的值，不会触发@input事件，此时手动调用值变化方法
        if (firstChange.value === false && changeFromInner.value === false) {
            valueChange()
        }
        /* #endif */
        firstChange.value = false
        // 重置changeFromInner的值为false，标识下一次引起默认为外部引起的
        changeFromInner.value = false
    },
    { immediate: true }
)

// 组件的类名
const textareaClass = computed(() => {
    let classes: string[] = []
    props.border === 'surround' &&
        (classes = classes.concat(['hy-textarea__border', 'hy-textarea__radius']))
    props.border === 'bottom' &&
        (classes = classes.concat(['hy-border__bottom', 'hy-textarea__no-radius']))
    props.disabled && classes.push('hy-textarea__disabled')
    return classes.join(' ')
})
// 组件的样式
const textareaStyle = computed(() => {
    const style: CSSProperties = {}

    return Object.assign(style, props.customStyle)
})
/**
 * @description 边框颜色
 * */
const borderStyle = computed(() => {
    return (isFocus: boolean) => {
        let style: CSSProperties = {}
        if (isFocus) {
            switch (props.border) {
                case 'surround':
                    style = { border: `1px solid var(--hy-theme-color, #3c9cff)` }
                    break
                case 'bottom':
                    style = { borderBottom: `1px solid var(--hy-theme-color, #3c9cff)` }
                    break
                default:
                    break
            }
        }
        return style
    }
})

const onFocus = (e: InputOnFocusEvent) => {
    isFocus.value = true
    emit('focus', e)
}
const onBlur = (e: InputOnBlurEvent) => {
    isFocus.value = false
    emit('blur', e)
    if (formItem) formItem.handleBlur(e.detail.value)
    // 尝试调用u-form的验证方法
    // formValidate(this, "blur");
}
const onLineChange = (e: any) => {
    emit('lineChange', e)
}
const onInput = (e: any) => {
    let { value } = e?.detail
    // 格式化过滤方法
    const format = props.formatter || innerFormatter
    const formatValue = format(value)
    // 为了避免props的单向数据流特性，需要先将innerValue值设置为当前值，再在$nextTick中重新赋予设置后的值才有效
    innerValue.value = value
    nextTick(() => {
        innerValue.value = formatValue
        valueChange()
    })
}
/**
 * @description 内容发生变化，进行处理
 * */
const valueChange = () => {
    const value = innerValue.value
    nextTick(() => {
        emit('update:modelValue', value)
        // 标识value值的变化是由内部引起的
        changeFromInner.value = true
        emit('change', value)
        if (formItem) formItem.handleChange(value)
    })
}
const onConfirm = (e: InputOnConfirmEvent) => {
    emit('confirm', e)
}
const onKeyboardheightchange = (e: InputOnKeyboardheightchangeEvent) => {
    emit('keyboardheightchange', e)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
