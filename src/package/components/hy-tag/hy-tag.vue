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
                <text :class="textClass" :style="textStyle">
                    <slot>
                        {{ text }}
                    </slot>
                </text>
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
 * @description tag类名
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
 * @description tag样式
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
 * @description 文本样式
 * */
const textStyle = computed(() => {
    const style: CSSProperties = {}
    if (props.color && props.plain) style.color = props.color
    return style
})
/**
 * @description 文本类名
 * */
const textClass = computed((): string[] => {
    return [`hy-tag__text`, `hy-tag__text--${props.size}`]
})

/**
 * @description 关闭图标icon大小
 */
const closeSize = computed(() => {
    return props.size === 'large' ? 15 : props.size === 'medium' ? 13 : 11
})
/**
 * @description 图标大小
 * */
const hyIconSize = computed(() => {
    if (props.icon?.size) {
        return props.icon.size
    } else {
        return props.size === 'large' ? 18 : props.size === 'medium' ? 14 : 10
    }
})
/**
 * @description 图标颜色
 * */
const hyIconColor = computed(() => {
    return props.icon?.color ? props.icon.color : props.plain ? props.type : '#ffffff'
})

/**
 * @description 点击关闭按钮
 * */
const closeHandler = () => {
    if (!props.disabled) {
        emit('close', props.text)
    }
}
/**
 * @description 点击标签
 * */
const clickHandler = () => {
    if (!props.disabled) {
        emit('click', {
            value: props.text,
            name: props.name
        })
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
