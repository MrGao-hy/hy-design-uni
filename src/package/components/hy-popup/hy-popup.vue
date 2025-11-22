<template>
    <view :class="['hy-popup', customClass]">
        <hy-overlay
            :show="show"
            @click="overlayClick"
            v-if="overlay"
            :zIndex="zIndex"
            :duration="overlayDuration"
            :customStyle="overlayStyle"
            :opacity="overlayOpacity"
        ></hy-overlay>
        <hy-transition
            :show="show"
            :customStyle="transitionStyle"
            :mode="positionMode"
            :duration="duration"
            @afterEnter="afterEnter"
            @click="clickHandler"
        >
            <!-- @click.stop不能去除，去除会导致居中模式下点击内容区域触发关闭弹窗 -->
            <view class="hy-popup__content" :style="[contentStyle]">
                <!--        <u-status-bar v-if="safeAreaInsetTop"></u-status-bar>-->
                <slot></slot>
                <view
                    v-if="closeable"
                    @tap.stop="close"
                    :class="[
                        'hy-popup__content__close',
                        'hy-popup__content__close--' + closeIconPos
                    ]"
                    hover-class="hy-popup__content__close--hover"
                    hover-stay-time="150"
                >
                    <hy-icon :name="IconConfig.CLOSE" color="#909399" size="18" bold></hy-icon>
                </view>
                <!--        <hy-safe-bottom v-if="safeAreaInsetBottom"></hy-safe-bottom>-->
            </view>
        </hy-transition>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-popup',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { CSSProperties } from 'vue'
import type { IPopupEmits } from './typing'
import { addUnit, getWindowInfo, IconConfig } from '../../libs'
import popupProps from './props'
// 组件
import HyTransition from '../hy-transition/hy-transition.vue'
import HyOverlay from '../hy-overlay/hy-overlay.vue'
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出。组件只提供容器，内部内容由用户自定义。
 * @displayName hy-popup
 */
defineOptions({})

const props = defineProps(popupProps)
const emit = defineEmits<IPopupEmits>()

const overlayDuration = ref(props.duration + 50)

watch(
    () => props.show,
    (newValue) => {
        if (newValue) {
            // #ifdef MP-WEIXIN
            // const children = this.$children
            // retryComputedComponentRect(children)
            // #endif
        }
    }
)

const transitionStyle = computed(() => {
    const style: CSSProperties = {
        zIndex: props.zIndex,
        position: 'fixed',
        display: 'flex'
    }
    if (props.mode !== 'center') {
        style[props.mode] = 0
    }
    switch (props.mode) {
        case 'left':
        case 'right':
            style.bottom = 0
            style.top = 0
            break
        case 'top':
        case 'bottom':
            style.left = 0
            style.right = 0
            break
        case 'center':
            Object.assign(style, {
                alignItems: 'center',
                'justify-content': 'center',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            })
            break
        default:
            break
    }

    return style
})
const contentStyle = computed(() => {
    const style: CSSProperties = {}
    // 通过设备信息的safeAreaInsets值来判断是否需要预留顶部状态栏和底部安全局的位置
    // 不使用css方案，是因为nvue不支持css的iPhoneX安全区查询属性
    const { safeAreaInsets } = getWindowInfo()
    if (props.mode !== 'center') {
        style.flex = 1
    }
    // 背景色，一般用于设置为transparent，去除默认的白色背景
    if (props.bgColor) {
        style.backgroundColor = props.bgColor
    }
    if (props.round) {
        const value = addUnit(props.round)
        switch (props.mode) {
            case 'top':
                style.borderBottomLeftRadius = value
                style.borderBottomRightRadius = value
                break
            case 'bottom':
                style.borderTopLeftRadius = value
                style.borderTopRightRadius = value
                break
            case 'center':
                style.borderRadius = value
                break
            default:
                break
        }
    }
    return Object.assign(style, props.customStyle)
})
const positionMode = computed(() => {
    if (props.mode === 'center') {
        return props.zoom ? 'fade-zoom' : 'fade'
    }
    if (props.mode === 'left') {
        return 'slide-left'
    }
    if (props.mode === 'right') {
        return 'slide-right'
    }
    if (props.mode === 'bottom') {
        return 'slide-up'
    }
    if (props.mode === 'top') {
        return 'slide-down'
    }
})

// 点击遮罩
const overlayClick = () => {
    if (props.closeOnClickOverlay) {
        emit('update:show', false)
        emit('close')
    }
}
const close = () => {
    emit('update:show', false)
    emit('close')
}
const afterEnter = () => {
    emit('open')
}
const clickHandler = () => {
    // 由于中部弹出时，其u-transition占据了整个页面相当于遮罩，此时需要发出遮罩点击事件，是否无法通过点击遮罩关闭弹窗
    if (props.mode === 'center') {
        overlayClick()
    }
    emit('click')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
