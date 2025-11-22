<template>
    <text
        v-if="show && ((Number(value) === 0 ? showZero : true) || isDot)"
        :class="[
            'hy-badge',
            isDot ? 'hy-badge--dot' : 'hy-badge--not-dot',
            inverted && 'hy-badge--inverted',
            shape === 'horn' && 'hy-badge--horn',
            `hy-badge--${type}${inverted ? '--inverted' : ''}`,
            customClass
        ]"
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
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { IBadgeEmit } from './typing'
import { addUnit } from '../../libs'
import badgeProps from './props'

/**
 * 该组件一般用于图标右上角显示未读的消息数量，提示用户点击，有圆点和圆包含文字两种形式。
 * @displayName hy-badge
 */
defineOptions({})

const props = defineProps(badgeProps)
const emit = defineEmits<IBadgeEmit>()

/**
 * @description 整个组件的样式
 * */
const badgeStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}
    if (props.color) {
        style.color = props.color
    }
    if (props.bgColor && !props.inverted) {
        style.backgroundColor = props.bgColor
    }
    if (props.absolute) {
        style.position = 'absolute'
        // 如果有设置offset参数
        if (props.offset && Array.isArray(props.offset)) {
            // top和right分为为offset的第一个和第二个值，如果没有第二个值，则right等于top
            const top = props.offset[0]
            const right = props.offset[1] || top
            style.top = addUnit(top)
            style.left = addUnit(right)
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
        case 'limit':
            return Number(props.value) > 999
                ? Number(props.value) >= 9999
                    ? Math.floor((props.value / 1e4) * 100) / 100 + 'w'
                    : Math.floor((props.value / 1e3) * 100) / 100 + 'k'
                : props.value
        default:
            return Number(props.value)
    }
})

const onClick = (e: Event) => {
    emit('click', e)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
