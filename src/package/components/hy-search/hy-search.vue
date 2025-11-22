<template>
    <view
        :class="['hy-search', customStyle]"
        @tap="clickHandler"
        :style="[
            {
                margin: margin
            },
            customStyle
        ]"
    >
        <view
            class="hy-search__content"
            :style="{
                backgroundColor: bgColor,
                borderRadius: shape == 'circle' ? '100px' : '4px',
                borderColor: borderColor
            }"
        >
            <template>
                <slot v-if="$slots.label" name="label"></slot>
                <text v-else-if="label" class="hy-search__content__label">{{ label }}</text>
            </template>
            <view class="hy-search__content__icon" v-if="searchIcon">
                <hy-icon
                    :name="searchIcon?.name || IconConfig.SEARCH"
                    :size="searchIcon?.size"
                    :color="searchIcon?.color || color"
                    :bold="searchIcon?.bold"
                    :customPrefix="searchIcon?.customPrefix"
                    :imgMode="searchIcon?.imgMode"
                    :width="searchIcon?.width"
                    :height="searchIcon?.height"
                    :top="searchIcon?.top"
                    :stop="searchIcon?.stop"
                    :round="searchIcon?.round"
                    :customStyle="searchIcon?.customStyle"
                    @tap="clickIcon"
                ></hy-icon>
            </view>
            <input
                :confirm-type="confirmType"
                :value="keyword"
                :disabled="disabled"
                :maxlength="maxlength"
                :adjust-position="adjustPosition"
                :focus="autoFocus"
                :auto-blur="autoBlur"
                placeholder-class="hy-search__content__input--placeholder"
                :placeholder="placeholder"
                :placeholder-style="`color: ${placeholderColor}`"
                :class="[
                    'hy-search__content__input',
                    disabled && 'hy-search__content__input--disabled'
                ]"
                type="text"
                :always-embed="true"
                :style="[
                    {
                        pointerEvents: disabled ? 'none' : 'auto',
                        textAlign: inputAlign,
                        color: color,
                        backgroundColor: bgColor,
                        height: addUnit(height)
                    },
                    inputStyle
                ]"
                @blur="onBlur"
                @focus="onFocus"
                @confirm="onSearch"
                @input="inputChange"
            />
            <view
                class="hy-search__content__icon hy-search__content__close"
                v-if="showClear"
                @click="onClear"
            >
                <hy-icon :name="IconConfig.CLOSE"></hy-icon>
            </view>
        </view>
        <text
            :style="[actionStyle]"
            class="hy-search__action"
            :class="[(showActionBtn || show) && 'hy-search__action--active']"
            @tap.stop.prevent="onConfirm"
        >
            {{ actionText }}
        </text>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-search',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { ISearchEmits } from './typing'
import { addUnit, IconConfig } from '../../libs'
import type {
    InputOnBlurEvent,
    InputOnConfirmEvent,
    InputOnFocusEvent,
    InputOnInputEvent
} from '@uni-helper/uni-types'
import searchProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 搜索组件，集成了常见搜索框所需功能，用户可以一键引入，开箱即用。
 * @displayName hy-search
 */
defineOptions({})

const props = defineProps(searchProps)
const emit = defineEmits<ISearchEmits>()

const keyword = ref<string>(props.modelValue)
// 显示右边搜索按钮
const show = ref<boolean>(false)
// 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
const focused = ref(false)

watch(
    () => keyword.value,
    (newValue: string) => {
        emit('update:modelValue', newValue)
        emit('change', newValue)
    }
)

// 是否显示右边控件
const showActionBtn = computed<boolean>(() => {
    return !props.animation && props.showAction
})
// 是否显示清除控件
const showClear = computed(() => {
    const { clearable, disabled } = props
    return clearable && !disabled && !!focused.value && keyword.value !== ''
})

/**
 * 值改变触发
 * */
const inputChange = (e: InputOnInputEvent) => {
    keyword.value = e.detail.value
}
/**
 * @description 清空输入
 * */
const onClear = () => {
    keyword.value = ''
    // 延后发出事件，避免在父组件监听clear事件时，value为更新前的值(不为空)
    nextTick(() => {
        emit('clear')
    })
}
/**
 * @description 确定搜索
 * */
const onSearch = (e: InputOnConfirmEvent) => {
    emit('search', e, e.detail.value)
    try {
        // 收起键盘
        uni.hideKeyboard()
    } catch (e) {}
}
/**
 * @description 点击右边自定义按钮的事件
 */
const onConfirm = () => {
    emit('confirm', keyword.value)
    try {
        // 收起键盘
        uni.hideKeyboard()
    } catch (e) {}
}
/**
 * @description 获取焦点
 * */
const onFocus = (e: InputOnFocusEvent) => {
    focused.value = true
    // 开启右侧搜索按钮展开的动画效果
    if (props.animation && props.showAction) show.value = true
    emit('focus', e, keyword.value)
}

// 失去焦点
const onBlur = (e: InputOnBlurEvent) => {
    show.value = false
    emit('blur', e, keyword.value)
}
/**
 * @description 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
 * */
const clickHandler = () => {
    if (props.disabled) emit('click')
}
/**
 * @description 点击左边图标
 * */
const clickIcon = () => {
    emit('clickIcon', keyword.value)
    try {
        // 收起键盘
        uni.hideKeyboard()
    } catch (e) {}
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
