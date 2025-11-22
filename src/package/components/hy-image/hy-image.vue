<template>
    <hy-transition mode="fade" :show="show" :style="transStyle" :duration="fade ? 1000 : 0">
        <view
            :class="['hy-image', 'box-border', customClass]"
            @tap="clickHandler"
            :style="[wrapStyle, backgroundStyle]"
        >
            <image
                v-if="!isError"
                :src="src"
                :mode="mode"
                @error="onErrorHandler"
                @load="onLoadHandler"
                :show-menu-by-longpress="showMenuByLongPress"
                :lazy-load="lazyLoad"
                :class="['hy-image__url', indistinct && 'hy-image__indistinct']"
                :style="{
                    width: addUnit(width),
                    height: addUnit(height),
                    borderRadius: shape == 'circle' ? '1000px' : addUnit(radius)
                }"
                referrerpolicy="no-referrer"
            ></image>
            <view
                v-if="showLoading && loading"
                class="hy-image__loading"
                :style="{
                    borderRadius: shape == 'circle' ? '50%' : addUnit(radius),
                    backgroundColor: bgColor,
                    width: addUnit(width),
                    height: addUnit(height)
                }"
            >
                <slot v-if="$slots.loading" name="loading"></slot>
                <template v-else>
                    <hy-loading :name="loadingIcon"></hy-loading>
                </template>
            </view>
            <view
                v-if="showError && isError && !loading"
                class="hy-image__error"
                :style="{
                    borderRadius: shape == 'circle' ? '50%' : addUnit(radius)
                }"
            >
                <slot name="error">
                    <hy-icon :name="errorIcon" size="30"></hy-icon>
                </slot>
            </view>
        </view>
    </hy-transition>
</template>

<script lang="ts">
export default {
    name: 'hy-image',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { CSSProperties } from 'vue'
import type { IImageEmits } from './typing'
import { addUnit, getPx } from '../../libs'
import type { ImageOnErrorEvent, ImageOnLoadEvent } from '@uni-helper/uni-types'
import imageProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'
import HyTransition from '../hy-transition/hy-transition.vue'
import HyLoading from '../hy-loading/hy-loading.vue'

/**
 * uni-app的image组件的加强版，在继承了原有功能外，还支持淡入动画、加载中、加载失败提示、圆角值和形状等。
 * @displayName hy-image
 */
defineOptions({})

const props = defineProps(imageProps)
const emit = defineEmits<IImageEmits>()

// 图片是否加载错误，如果是，则显示错误占位图
const isError = ref(false)
// 初始化组件时，默认为加载中状态
const loading = ref(true)
// 不透明度，为了实现淡入淡出的效果
const opacity = ref(1)
// 过渡时间，因为props的值无法修改，故需要一个中间值
const durationTime = ref(props.duration)
// 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景
const backgroundStyle = ref({})
// 用于fade模式的控制组件显示与否
const show = ref(false)

watch(
    () => props.src,
    (newValue) => {
        if (!newValue) {
            // 如果传入null或者''，或者false，或者undefined，标记为错误状态
            isError.value = true
            loading.value = false
        } else {
            isError.value = false
            loading.value = true
        }
    },
    { immediate: true }
)

const transStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}
    if (loading.value || isError.value || props.width == '100%' || props.mode != 'heightFix') {
        style.width = addUnit(props.width)
    } else {
        style.width = 'fit-content'
    }
    if (loading.value || isError.value || props.height == '100%' || props.mode != 'widthFix') {
        style.height = addUnit(props.height)
    } else {
        style.height = 'fit-content'
    }
    return style
})

const wrapStyle = computed(() => {
    const style: CSSProperties = {}
    if (loading.value || isError.value || props.width == '100%' || props.mode != 'heightFix') {
        style.width = addUnit(props.width)
    } else {
        style.width = 'fit-content'
    }
    if (loading.value || isError.value || props.height == '100%' || props.mode != 'widthFix') {
        style.height = addUnit(props.height)
    } else {
        style.height = 'fit-content'
    }
    // 如果是显示圆形，设置一个很多的半径值即可
    style.borderRadius = props.shape == 'circle' ? '10000px' : addUnit(props.radius)
    // 如果设置圆角，必须要有hidden，否则可能圆角无效
    style.overflow = getPx(props.radius) > 0 ? 'hidden' : 'visible'

    return Object.assign(style, props.customStyle)
})

onMounted(() => {
    show.value = true
})

const clickHandler = () => {
    emit('click')

    if (props.previewImage) {
        uni.previewImage({
            urls: [props.src]
        })
    }
}

/**
 * @description 图片加载失败
 * */
const onErrorHandler = (err: ImageOnErrorEvent) => {
    loading.value = false
    isError.value = true
    emit('error', err)
}

/**
 * @description 图片加载成功
 * */
const onLoadHandler = (e: ImageOnLoadEvent) => {
    loading.value = false
    isError.value = false
    emit('load', e)
    removeBgColor()
}

const removeBgColor = () => {
    // 淡入动画过渡完成后，将背景设置为透明色，否则png图片会看到灰色的背景
    backgroundStyle.value = {
        backgroundColor: props.bgColor
    }
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
