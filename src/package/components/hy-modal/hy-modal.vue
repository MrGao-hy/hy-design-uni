<template>
    <HyPopup
        mode="center"
        :zoom="zoom"
        :show="modelValue"
        :round="round"
        :customStyle="{
            overflow: 'hidden',
            marginTop: `-${addUnit(negativeTop)}`
        }"
        :closeOnClickOverlay="closeOnClickOverlay"
        :safeAreaInsetBottom="false"
        :duration="400"
        @click="clickHandler"
    >
        <view
            class="hy-modal"
            :style="{
                width: addUnit(width)
            }"
        >
            <view class="hy-modal__title" v-if="title">{{ title }}</view>
            <view
                class="hy-modal__content"
                :style="{
                    paddingTop: `${title ? 12 : 25}px`
                }"
            >
                <slot v-if="$slots.default"></slot>
                <text v-else class="hy-modal__content--text">
                    {{ content }}
                </text>
            </view>
            <view class="hy-modal__button--group__confirm-button" v-if="$slots.confirmButton">
                <slot name="confirmButton"></slot>
            </view>
            <template v-else>
                <view
                    :class="[
                        'hy-modal__button--group',
                        showCancelButton &&
                            showConfirmButton &&
                            (!buttonReverse
                                ? 'hy-modal__button--exact'
                                : 'hy-modal__button--exact--reverse')
                    ]"
                    :style="{
                        flexDirection: buttonReverse ? 'row-reverse' : 'row'
                    }"
                >
                    <view
                        class="hy-modal__button--group__wrapper first hy-modal__button--group__wrapper--cancel"
                        :hover-stay-time="150"
                        hover-class="hy-modal__button--group__wrapper--hover"
                        v-if="showCancelButton"
                        @tap.stop="cancelHandler"
                    >
                        <text
                            class="hy-modal__button--group__wrapper--text hy-modal__button--group__wrapper--cancel__text"
                            :style="{
                                color: cancelColor
                            }"
                        >
                            {{ cancelText }}
                        </text>
                    </view>
                    <view
                        class="hy-modal__button--group__wrapper last hy-modal__button--group__wrapper--confirm"
                        :hover-stay-time="150"
                        hover-class="hy-modal__button--group__wrapper--hover"
                        v-if="showConfirmButton"
                        @tap="confirmHandler"
                    >
                        <hy-loading v-if="load" mode="circle"></hy-loading>
                        <text
                            v-else
                            class="hy-modal__button--group__wrapper--text hy-modal__button--group__wrapper--confirm__text"
                            :style="{
                                color: confirmColor
                            }"
                        >
                            {{ confirmText }}
                        </text>
                    </view>
                </view>
            </template>
        </view>
    </HyPopup>
</template>

<script lang="ts">
export default {
    name: 'hy-modal',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { IModalEmits } from './typing'
import { addUnit, sleep } from '../../libs'
import modalProps from './props'
// 组件
import HyPopup from '../hy-popup/hy-popup.vue'
import HyLoading from '../hy-loading/hy-loading.vue'

/**
 * 弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作。
 * @displayName hy-modal
 */
defineOptions({})

const props = defineProps(modalProps)
const emit = defineEmits<IModalEmits>()
const load = ref(props.loading)

watch(
    () => props.loading,
    (newVal) => {
        load.value = props.loading
    }
)

watch(
    () => props.modelValue,
    (newVal) => {
        if (!newVal) load.value = false
    }
)

/**
 * @description 点击确定按钮
 * */
const confirmHandler = async () => {
    if (load.value) return
    // 如果配置了异步关闭，将按钮值为loading状态
    emit('confirm')

    await sleep()
    if (!props.loading && props.autoClose) {
        emit('update:modelValue', false)
    }
}

/**
 * @description 点击取消按钮
 * */
const cancelHandler = () => {
    emit('update:modelValue', false)
    emit('cancel')
}

/**
 * @description 点击遮罩
 * */
const clickHandler = () => {
    if (props.closeOnClickOverlay) {
        emit('update:modelValue', false)
        emit('close')
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
.modal__content__text {
    text-align: v-bind(contentTextAlign);
}
</style>
