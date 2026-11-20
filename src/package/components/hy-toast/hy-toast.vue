<template>
    <hy-overlay
        :show="isShow"
        :pass-through="tmpConfig.overlay"
        :opacity="tmpConfig.cover ? 0.5 : 0"
        :zIndex="zIndex"
        :custom-style="overlayStyle"
    >
        <view :style="[contentStyle, customStyle]" :class="[contentClass, customClass]">
            <hy-loading
                v-if="tmpConfig.loading"
                :mode="tmpConfig.loadMode || 'circle'"
                :color="loadingIconColor"
                inactiveColor="rgba(255, 255, 255, 0.3)"
                size="25"
                :customStyle="{ marginBottom: '20rpx' }"
            ></hy-loading>
            <view
                v-else-if="iconNameCom"
                :class="['hy-toast__content--icon', `hy-toast__content--icon__${tmpConfig.type}`]"
            >
                <hy-icon
                    :name="iconNameCom"
                    :size="iconPropsCom.size"
                    :color="iconPropsCom.color"
                    custom-class="hy-toast__icon"
                ></hy-icon>
            </view>
            <text
                :class="[
                    'hy-toast__content--text',
                    !tmpConfig.icon && !tmpConfig.loading
                        ? `hy-toast__content--text__${tmpConfig.type}`
                        : ''
                ]"
            >
                {{ tmpConfig.message }}
            </text>
        </view>
    </hy-overlay>
</template>

<script lang="ts">
export default {
    name: 'hy-toast',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import type { CSSProperties } from 'vue'
import type { IToastExpose, ToastOptions } from './typing'
import { ColorConfig, iconFillName, getWindowInfo, hexToRgb } from '../../libs'
import toastProps from './props'
// 组件
import HyOverlay from '../hy-overlay/hy-overlay.vue'
import HyIcon from '../hy-icon/hy-icon.vue'
import HyLoading from '../hy-loading/hy-loading.vue'

/**
 * Toast 组件主要用于消息通知、加载提示、操作结果提示等醒目提示效果，我们为其提供了多种丰富的API。
 * @displayName hy-toast
 */
defineOptions({})

const props = defineProps(toastProps)

const isShow = ref(false)
const tmpConfig = ref<ToastOptions>({})
const config: ToastOptions = reactive({
    message: props.message,
    type: props.type,
    duration: props.duration,
    icon: props.icon,
    position: props.position,
    complete: null,
    overlay: props.overlay,
    cover: props.cover,
    loading: props.loading,
    loadMode: props.loadMode
})
let timer: any = null

const isThemeType = (type: string): boolean =>
    ['error', 'warning', 'success', 'primary', 'info'].includes(type)

const overlayStyle = computed(() => {
    const style: CSSProperties = {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    }
    return style
})

const iconNameCom = computed(() => {
    const { icon, type } = tmpConfig.value
    // 只有不为none，并且type为error|warning|succes|info时候，才显示图标
    if (!icon || !type) {
        return ''
    }
    if (icon === true) {
        return isThemeType(type) ? iconFillName(type) : ''
    }
    return typeof icon === 'string' ? icon : icon?.name
})

/** 图标尺寸与颜色：icon 传对象配置时读取其值，否则使用默认值 */
const iconPropsCom = computed(() => {
    const icon = tmpConfig.value.icon || props.icon
    if (typeof icon === 'object' && icon !== null) {
        return {
            size: icon.size || 21,
            color: icon.color
        }
    }
    return { size: 21, color: '' }
})

/**
 * 内容盒子的样式
 * */
const contentStyle = computed(() => {
    const windowHeight = getWindowInfo().windowHeight,
        style: CSSProperties = {}
    let value = 0
    // 根据top和bottom，对Y轴进行窗体高度的百分比偏移
    if (tmpConfig.value.position === 'top') {
        value = -windowHeight * 0.25
    } else if (tmpConfig.value.position === 'bottom') {
        value = windowHeight * 0.25
    }
    style.transform = `translateY(${value}px)`
    return style
})

const contentClass = computed(() => {
    return [
        'hy-toast__content',
        'hy-toast__' + tmpConfig.value.type,
        tmpConfig.value.loading && 'hy-toast__content--loading'
    ]
})

const loadingIconColor = computed(() => {
    let colorTmp = 'rgb(255, 255, 255)'
    if (isThemeType(tmpConfig.value.type!)) {
        // loading-icon组件内部会对color参数进行一个透明度处理，该方法要求传入的颜色值
        // 必须为rgb格式的，所以这里做一个处理
        colorTmp = hexToRgb(ColorConfig[tmpConfig.value.type!]) as string
    }
    return colorTmp
})

onMounted(() => {
    // 监听全局事件
    uni.$on('__hy_toast_open__', show)
    uni.$on('__hy_toast_close__', hide)
})

onUnmounted(() => {
    uni.$off('__hy_toast_open__', show)
    uni.$off('__hy_toast_close__', hide)
})

/**
 * 显示toast组件，由父组件通过xxx.show(options)形式调用
 * */
const show = (options: ToastOptions) => {
    // 清除定时器
    clearTimer()
    tmpConfig.value = { ...config, ...options }
    isShow.value = true
    // -1时不自动关闭
    if (tmpConfig.value.duration !== -1 && !tmpConfig.value.loading) {
        timer = setTimeout(() => {
            // 倒计时结束，清除定时器，隐藏toast组件
            clearTimer()
            // 判断是否存在callback方法，如果存在就执行
            typeof tmpConfig.value.complete === 'function' && tmpConfig.value.complete()
        }, tmpConfig.value.duration)
    }
}

/**
 * 隐藏toast组件，由父组件通过ref形式调用
 * */
const hide = () => {
    clearTimer()
}
/**
 * 清除定时任务
 * */
const clearTimer = () => {
    isShow.value = false
    // 清除定时器
    clearTimeout(timer)
    timer = null
    // 防止后面请求还是loading状态
    // config.loading = false
}

defineExpose<IToastExpose>({
    show,
    hide
})
</script>

<style lang="scss">
@use './index.scss';
</style>
