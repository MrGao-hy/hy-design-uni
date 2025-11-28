<template>
    <view
        :class="['hy-input', inputClass, customClass]"
        :style="[wrapperStyle, borderStyle(focused)]"
    >
        <view class="hy-input__content">
            <view
                class="hy-input__content--prefix-icon"
                v-if="prefixIcon?.name || $slots.prefix"
                @tap.stop="onPrefix"
            >
                <slot v-if="$slots.prefix" name="prefix"></slot>
                <hy-icon
                    v-else
                    :name="prefixIcon?.name"
                    :size="prefixIcon?.size"
                    :color="prefixIcon?.color"
                    :bold="prefixIcon?.bold"
                    :customPrefix="prefixIcon?.customPrefix"
                    :imgMode="prefixIcon?.imgMode"
                    :width="prefixIcon?.width"
                    :height="prefixIcon?.height"
                    :top="prefixIcon?.top"
                    :stop="prefixIcon?.stop"
                    :round="prefixIcon?.round"
                    :customStyle="prefixIcon?.customStyle"
                ></hy-icon>
            </view>
            <view class="hy-input__content--field-wrapper" @tap="clickHandler">
                <!-- 根据uni-app的input组件文档，H5和APP中只要声明了password参数(无论true还是false)，type均失效，此时
					为了防止type=number时，又存在password属性，type无效，此时需要设置password为undefined
				 -->
                <input
                    ref="input-native"
                    :class="[
                        'hy-input__content--field-wrapper__field',
                        disabled && 'hy-input__disabled-text'
                    ]"
                    :style="[inputStyle]"
                    :type="type"
                    :focus="focus"
                    :cursor="cursor"
                    :value="innerValue"
                    :auto-blur="autoBlur"
                    :disabled="disabled || readonly"
                    :maxlength="maxlength"
                    :placeholder="placeholder || ''"
                    :placeholder-style="formatObject(placeholderStyle)"
                    :placeholder-class="placeholderClass"
                    :confirm-type="confirmType"
                    :confirm-hold="confirmHold"
                    :hold-keyboard="holdKeyboard"
                    :cursor-spacing="cursorSpacing"
                    :adjust-position="adjustPosition"
                    :selection-end="selectionEnd"
                    :selection-start="selectionStart"
                    :password="password || type === 'safe-password' || false"
                    :ignoreCompositionEvent="ignoreCompositionEvent"
                    @input="onInput"
                    @blur="onBlur"
                    @focus="onFocus"
                    @confirm="onConfirm"
                    @keyboardheightchange="onkeyboardheightchange"
                />
            </view>
            <view class="hy-input__content--clear" v-if="isShowClear" @tap.stop="onClear">
                <hy-icon
                    :name="IconConfig.CLOSE"
                    size="11"
                    color="#ffffff"
                    :customStyle="{ lineHeight: '12px' }"
                ></hy-icon>
            </view>
            <view
                class="hy-input__content--subfix-icon"
                v-if="suffixIcon?.name || $slots.suffix"
                @tap.stop="onSuffix"
            >
                <slot v-if="$slots.suffix" name="suffix"></slot>
                <hy-icon
                    v-else
                    :name="suffixIcon?.name"
                    :size="suffixIcon?.size"
                    :color="suffixIcon?.color"
                    :bold="suffixIcon?.bold"
                    :customPrefix="suffixIcon?.customPrefix"
                    :imgMode="suffixIcon?.imgMode"
                    :width="suffixIcon?.width"
                    :height="suffixIcon?.height"
                    :top="suffixIcon?.top"
                    :stop="suffixIcon?.stop"
                    :round="suffixIcon?.round"
                    :customStyle="suffixIcon?.customStyle"
                ></hy-icon>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-input',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, nextTick, ref, watch, inject } from 'vue'
import type { CSSProperties } from 'vue'
import HyIcon from '../hy-icon/hy-icon.vue'
import { addUnit, formatObject, sleep, IconConfig } from '../../libs'
import type { IInputEmits } from './typing'
import type { FormItemContext } from '../hy-form-item/typing'
import type {
    InputOnBlurEvent,
    InputOnConfirmEvent,
    InputOnFocusEvent,
    InputOnKeyboardheightchange
} from '@uni-helper/uni-types'
import inputProps from './props'

/**
 * 为一个输入框，利用它可以快速实现表单验证，输入内容，下拉选择等功能。
 * @displayName hy-input
 */
defineOptions({})

const props = defineProps(inputProps)
const emit = defineEmits<IInputEmits>()
const formItem = inject<FormItemContext | null>('formItem', null)

// 清除操作
const clearInput = ref<boolean>(false)
// 输入框的值
const innerValue = ref<string | number>('')
// 是否处于获得焦点状态
const focused = ref<boolean>(false)
// value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
const firstChange = ref<boolean>(true)
// value绑定值的变化是由内部还是外部引起的
const changeFromInner = ref<boolean>(false)
const innerFormatter = (value: string) => value

watch(
    () => props.modelValue,
    (newVal) => {
        if (changeFromInner.value || innerValue.value === newVal || newVal === undefined) {
            changeFromInner.value = false
            return
        }
        console.log(newVal, 'newVal')
        innerValue.value = newVal
        // 在H5中，外部value变化后，修改input中的值，不会触发@input事件，此时手动调用值变化方法
        if (!firstChange.value && !changeFromInner.value) {
            valueChange(innerValue.value, true)
        }
        firstChange.value = false
        // 重置changeFromInner的值为false，标识下一次引起默认为外部引起的
        changeFromInner.value = false
    },
    { immediate: true }
)

/**
 * 是否显示清除控件
 * */
const isShowClear = computed(() => {
    const { clearable, readonly, disabled } = props
    return clearable && !readonly && !disabled && innerValue.value !== ''
})
/**
 * 组件的类名
 * */
const inputClass = computed((): string => {
    let classes: string[] = [],
        { border, shape } = props
    border === 'surround' && (classes = classes.concat(['hy-border', 'hy-input__radius']))
    classes.push(`hy-input__${shape}`)
    border === 'bottom' && (classes = classes.concat(['hy-border__bottom', 'hy-input__no-radius']))
    props.disabled && classes.push('hy-input__disabled')
    return classes.join(' ')
})

/**
 * 组件的样式
 * */
const wrapperStyle = computed((): CSSProperties => {
    const style: CSSProperties = {}
    style.paddingTop = '6px'
    style.paddingBottom = '6px'
    style.paddingLeft = '9px'
    style.paddingRight = '9px'
    // 禁用状态下，被背景色加上对应的样式
    if (props.disabled) {
        style.backgroundColor = props.disabledColor
    }
    return Object.assign(style, props.customStyle)
})
/**
 * 输入框的样式
 * */
const inputStyle = computed(() => {
    return {
        color: props.color,
        fontSize: addUnit(props.fontSize),
        textAlign: props.inputAlign
    }
})

/**
 * 边框颜色
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

/**
 * 当键盘输入时，触发input事件
 */
const onInput = (e: any) => {
    let { value = '' } = e.detail || {}
    nextTick(() => {
        let formatValue = innerFormatter(value)
        innerValue.value = formatValue
        valueChange(formatValue)
    })
}
/**
 * 输入框失去焦点时触发
 * */
const onBlur = async (event: InputOnBlurEvent) => {
    emit('blur', event, event.detail.value)
    if (formItem) formItem.handleBlur(event.detail.value)
    await sleep()
    focused.value = false
}
/**
 * 输入框聚焦时触发
 * */
const onFocus = (e: InputOnFocusEvent) => {
    focused.value = true
    emit('focus', e)
}

/**
 * 点击完成按钮时触发
 * */
const onConfirm = (e: InputOnConfirmEvent) => {
    emit('confirm', e, innerValue.value)
}
/**
 * 键盘高度发生变化的时候触发此事件
 * 兼容性：微信小程序2.7.0+、App 3.1.0+
 * */
const onkeyboardheightchange = (event: InputOnKeyboardheightchange) => {
    emit('keyboardheightchange', event)
}
/**
 * 内容发生变化，进行处理
 */
const valueChange = (value: string | number, isOut = false) => {
    if (clearInput.value) {
        innerValue.value = ''
        clearInput.value = false
    }
    nextTick(() => {
        if (!isOut || clearInput.value) {
            // 标识value值的变化是由内部引起的
            changeFromInner.value = true
            emit('update:modelValue', value)
            emit('change', value)
            if (formItem) formItem.handleChange(value)
        }
    })
}
/**
 * 点击清除控件
 */
const onClear = () => {
    clearInput.value = true
    innerValue.value = ''
    nextTick(() => {
        valueChange('')
        emit('clear')
    })
}
/**
 * 在安卓nvue上，事件无法冒泡
 * 在某些时间，我们希望监听u-from-item的点击事件，此时会导致点击u-form-item内的u-input后
 * 无法触发u-form-item的点击事件，这里通过手动调用u-form-item的方法进行触发
 */
const clickHandler = () => {
    // 隐藏键盘
    if (props.disabled || props.readonly) {
        uni.hideKeyboard()
    }
}

/**
 * 点击前缀
 * */
const onPrefix = () => {
    emit('onPrefix')
}
/**
 * 点击后缀
 * */
const onSuffix = () => {
    emit('onSuffix')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
