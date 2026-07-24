<template>
    <hy-transition mode="fade" :show="show" :custom-style="{ display: 'inline-block' }">
        <view class="hy-tag__wrapper cursor-pointer">
            <view :class="tagClass" @tap="clickHandler" :style="tagStyle">
                <slot v-if="$slots.icon" name="icon"></slot>
                <hy-icon
                    v-else-if="icon?.name"
                    :name="icon?.name"
                    :color="hyIconColor"
                    :size="hyIconSize"
                    :bold="icon?.bold"
                    :customPrefix="icon?.customPrefix"
                    :imgMode="icon?.imgMode"
                    :width="icon?.width"
                    :height="icon?.height"
                    :top="icon?.top"
                    :stop="icon?.stop"
                    :round="icon?.round"
                    :customStyle="Object.assign({ marginRight: '3px' }, icon?.customStyle)"
                ></hy-icon>
                <view :class="textClass" :style="textStyle">
                    <slot v-if="$slots.default"></slot>
                    <template v-else>{{ label }}</template>
                </view>
                <!-- 关闭按钮 -->
                <view
                    :class="['hy-tag__close', `hy-tag__close--${size}`]"
                    v-if="closable"
                    @tap.stop="closeHandler"
                    :style="{ backgroundColor: closeColor }"
                >
                    <hy-icon :name="IconConfig.CLOSE" :size="closeSize" color="#ffffff"></hy-icon>
                </view>
            </view>
        </view>
    </hy-transition>
</template>

<script lang="ts">
export default {
    name: 'hy-tag',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { ITagEmits } from './typing'
import { IconConfig, colorGradient } from '../../libs'
import tagProps from './props'

// 组件
import HyTransition from '../hy-transition/hy-transition.vue'
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * tag组件一般用于标记和选择，我们提供了更加丰富的表现形式，能够较全面的涵盖您的使用场景
 * @displayName hy-tag
 */
defineOptions({})

const props = defineProps(tagProps)
const emit = defineEmits<ITagEmits>()

/**
 * tag类名
 * */
const tagClass = computed((): string[] => {
    let classes = ['hy-tag', `hy-tag--${props.shape}`, `hy-tag--${props.size}`, props.customClass]
    if (props.disabled) {
        classes.push('hy-tag--disabled')
    } else {
        const arr = [
            props.plain ? `hy-tag--${props.type}--plain` : `hy-tag--${props.type}`,
            props.plain && props.plainFill && `hy-tag--${props.type}--plain__fill`
        ].filter(Boolean)
        classes = classes.concat(arr as string[])
    }
    return classes
})
/**
 * tag样式
 * */
const tagStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {
        marginRight: props.closable ? '10px' : 0,
        marginTop: props.closable ? '10px' : 0,
        background: props.bgColor,
        borderColor: props.borderColor
    }

    if (props.color) {
        if (props.plain) {
            style.borderColor = props.color
            if (props.plainFill) {
                style.background = colorGradient(props.color, '#FFFFFF', 100)[90]
            }
        } else {
            style.background = props.color
            style.borderColor = props.color
        }
    }

    return Object.assign(style, props.customStyle)
})

/**
 * 文本样式
 * */
const textStyle = computed(() => {
    const style: CSSProperties = {}
    if (props.color && props.plain) style.color = props.color
    return style
})
/**
 * 文本类名
 * */
const textClass = computed((): string[] => {
    return [`hy-tag__text`, `hy-tag__text--${props.size}`]
})

/**
 * 关闭图标icon大小
 */
const closeSize = computed(() => {
    const sizeMap: Record<string, number> = { large: 14, medium: 12, small: 10, mini: 8 }
    return sizeMap[props.size] || 12
})
/**
 * 图标大小
 * */
const hyIconSize = computed(() => {
    if (props.icon?.size) {
        return props.icon.size
    }
    const sizeMap: Record<string, number> = { large: 18, medium: 14, small: 12, mini: 10 }
    return sizeMap[props.size] || 14
})
/**
 * 图标颜色
 * */
const hyIconColor = computed(() => {
    return props.icon?.color ? props.icon.color : props.plain ? props.type : '#ffffff'
})

/**
 * 点击关闭按钮
 * */
const closeHandler = () => {
    if (!props.disabled) {
        emit('close', props.value)
    }
}
/**
 * 点击标签
 * */
const clickHandler = () => {
    if (!props.disabled) {
        emit('click', {
            label: props.label,
            value: props.value
        })
    }
}
</script>

<style lang="scss">
@use './index.scss';
</style>
