<template>
    <!-- 传入默认插槽时包裹内容，角标骑缝定位于内容右上角 -->
    <view
        v-if="hasSlot"
        class="hy-badge__wrapper"
        :class="customClass"
        :style="customStyle"
    >
        <slot></slot>
        <text v-if="showBadge" :class="badgeClass" :style="badgeStyle" @tap="onClick">
            {{ isDot ? '' : showValue }}
        </text>
    </view>
    <!-- 未传插槽时保持独立角标形态 -->
    <text
        v-else-if="showBadge"
        :class="[badgeClass, customClass]"
        :style="[customStyle, badgeStyle]"
        @tap="onClick"
    >
        {{ isDot ? '' : showValue }}
    </text>
</template>

<script lang="ts">
export default {
    name: 'hy-badge',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { CSSProperties } from 'vue'
import type { IBadgeEmits } from './typing'
import { addUnit } from '../../libs'
import badgeProps from './props'

/**
 * 该组件一般用于图标右上角显示未读的消息数量，提示用户点击，有圆点和圆包含文字两种形式。
 * 传入默认插槽后组件以包裹形态渲染，角标自动骑缝定位于内容右上角；
 * 未传插槽时保持独立角标形态，可通过absolute和offset自行定位。
 * @displayName hy-badge
 */
defineOptions({})

const props = defineProps(badgeProps)
const emit = defineEmits<IBadgeEmits>()

const slots = useSlots()

// 是否传入默认插槽内容，传入后组件以包裹形态渲染
const hasSlot = computed<boolean>(() => !!slots.default)

// 是否显示角标（数值为0时按showZero决定，圆点模式恒显示）
const showBadge = computed<boolean>(
    () => props.show && ((Number(props.value) === 0 ? props.showZero : true) || props.isDot)
)

// 角标类名，插槽模式下追加骑缝定位类
const badgeClass = computed(() => [
    'hy-badge',
    props.isDot ? 'hy-badge--dot' : 'hy-badge--not-dot',
    props.inverted && 'hy-badge--inverted',
    props.shape === 'horn' && 'hy-badge--horn',
    props.border && 'hy-badge--border',
    `hy-badge--${props.type}${props.inverted ? '--inverted' : ''}`,
    hasSlot.value && 'hy-badge--locate'
])

/**
 * @description 整个组件的样式
 * */
const badgeStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {
        zIndex: props.zIndex,
        color: props.color
    }
    if (props.bgColor && !props.inverted) {
        style.backgroundColor = props.bgColor
    }
    if (hasSlot.value) {
        // 插槽模式：角标默认骑缝于内容右上角，offset作为[top, right]微调
        if (props.offset && Array.isArray(props.offset)) {
            const top = props.offset[0]
            const right = props.offset[1] || top
            style.top = addUnit(Number(top))
            style.right = addUnit(Number(right))
        }
    } else if (props.absolute) {
        style.position = 'absolute'
        // 如果有设置offset参数
        if (props.offset && Array.isArray(props.offset)) {
            // top和right分为为offset的第一个和第二个值，如果没有第二个值，则right等于top
            const top = props.offset[0]
            const right = props.offset[1] || top
            style.top = addUnit(Number(top))
            style.left = addUnit(Number(right))
        }
    }
    return style
})
/**
 * @description 显示值
 * */
const showValue = computed(() => {
    switch (props.numberType) {
        case 'overflow':
            return Number(props.value) > Number(props.max) ? props.max + '+' : props.value
        case 'ellipsis':
            return Number(props.value) > Number(props.max) ? '...' : props.value
        case 'limit': {
            const num = Number(props.value)
            return num > 999
                ? num >= 9999
                    ? Math.floor((num / 1e4) * 100) / 100 + 'w'
                    : Math.floor((num / 1e3) * 100) / 100 + 'k'
                : props.value
        }
        default:
            return Number(props.value)
    }
})

const onClick = (e: Event) => {
    emit('click', e)
}
</script>

<style lang="scss">
@use './index.scss';
</style>
