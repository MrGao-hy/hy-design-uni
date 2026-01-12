<template>
    <HyPopup
        mode="center"
        :zoom="modalOptions.zoom || zoom"
        :show="showModal"
        :round="modalOptions.round || round"
        :customStyle="{
            overflow: 'hidden',
            marginTop: `-${addUnit(modalOptions.negativeTop || negativeTop)}`
        }"
        :closeOnClickOverlay="modalOptions.closeOnClickOverlay || closeOnClickOverlay"
        :safeAreaInsetBottom="false"
        :duration="400"
        @click="clickHandler"
    >
        <view
            class="hy-modal"
            :style="{
                width: addUnit(modalOptions.width || width)
            }"
        >
            <view class="hy-modal__title" v-if="modalOptions.title || title">{{
                modalOptions.title || title
            }}</view>
            <view
                class="hy-modal__content"
                :style="{
                    paddingTop: `${modalOptions.title || title ? 12 : 25}px`,
                    textAlign: modalOptions.contentTextAlign
                }"
            >
                <slot v-if="$slots.default"></slot>
                <text v-else class="hy-modal__content--text">
                    {{ modalOptions.content || content }}
                </text>
            </view>
            <view class="hy-modal__button--group__confirm-button" v-if="$slots.confirmButton">
                <slot name="confirmButton"></slot>
            </view>
            <template v-else>
                <view
                    :class="[
                        'hy-modal__button--group',
                        (modalOptions.showCancelButton || showCancelButton) &&
                            (modalOptions.showConfirmButton || showConfirmButton) &&
                            (!(modalOptions.buttonReverse || buttonReverse)
                                ? 'hy-modal__button--exact'
                                : 'hy-modal__button--exact--reverse')
                    ]"
                    :style="{
                        flexDirection:
                            modalOptions.buttonReverse || buttonReverse ? 'row-reverse' : 'row'
                    }"
                >
                    <view
                        class="hy-modal__button--group__wrapper first hy-modal__button--group__wrapper--cancel"
                        :hover-stay-time="150"
                        hover-class="hy-modal__button--group__wrapper--hover"
                        v-if="modalOptions.showCancelButton || showCancelButton"
                        @tap.stop="cancelHandler"
                    >
                        <text
                            class="hy-modal__button--group__wrapper--text hy-modal__button--group__wrapper--cancel__text"
                            :style="{
                                color: modalOptions.cancelColor || cancelColor
                            }"
                        >
                            {{ modalOptions.cancelText || cancelText }}
                        </text>
                    </view>
                    <view
                        class="hy-modal__button--group__wrapper last hy-modal__button--group__wrapper--confirm"
                        :hover-stay-time="150"
                        hover-class="hy-modal__button--group__wrapper--hover"
                        v-if="modalOptions.showConfirmButton || showConfirmButton"
                        @tap="confirmHandler"
                    >
                        <hy-loading v-if="modalLoading" mode="circle"></hy-loading>
                        <text
                            v-else
                            class="hy-modal__button--group__wrapper--text hy-modal__button--group__wrapper--confirm__text"
                            :style="{
                                color: modalOptions.confirmColor || confirmColor
                            }"
                        >
                            {{ modalOptions.confirmText || confirmText }}
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
import { ref, watch, computed } from 'vue'
import type { IModalEmits } from './typing'
import { addUnit, sleep, useMessageInject } from '../../libs'
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

// 尝试从 useMessage 注入状态
const messageState = useMessageInject()

// 计算属性，优先使用注入的状态
const showModal = computed(() => {
    return messageState?.showModal.value || props.modelValue
})

const modalLoading = computed(() => {
    return messageState?.loading.value || props.loading
})

const modalOptions = computed(() => {
    return messageState?.modalOptions || {}
})

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
    if (modalLoading.value) return

    // 优先使用注入的确认处理
    if (messageState?.confirmHandler) {
        messageState.confirmHandler()
    } else {
        // 如果配置了异步关闭，将按钮值为loading状态
        emit('confirm')

        await sleep()
        if (!props.loading && props.autoClose) {
            emit('update:modelValue', false)
        }
    }
}

/**
 * @description 点击取消按钮
 * */
const cancelHandler = () => {
    // 优先使用注入的取消处理
    if (messageState?.cancelHandler) {
        messageState.cancelHandler()
    } else {
        emit('update:modelValue', false)
        emit('cancel')
    }
}

/**
 * @description 点击遮罩
 * */
const clickHandler = () => {
    const closeOnClickOverlay = modalOptions.value.closeOnClickOverlay || props.closeOnClickOverlay

    if (closeOnClickOverlay) {
        // 优先使用注入的关闭处理
        if (messageState?.closeHandler) {
            messageState.closeHandler()
        } else {
            emit('update:modelValue', false)
            emit('close')
        }
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
.modal__content__text {
    text-align: v-bind(contentTextAlign);
}
</style>
