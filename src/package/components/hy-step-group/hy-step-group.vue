<template>
    <view :class="rootClass" :style="[groupStyle, customStyle]">
        <slot />
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-step-group',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { useChildren } from '../../libs'
import type { IStepGroupContext } from './typing'
import { STEP_GROUP_KEY, createStepItemCssVars } from './steps'
import stepGroupProps from './props'

const props = defineProps(stepGroupProps)

const { linkChildren } = useChildren(STEP_GROUP_KEY)

// 向子组件注入当前组件的 props 代理，子组件读取时保持响应性
linkChildren({ props })

/** 根节点类名 */
const rootClass = computed<string>(() => {
    return `hy-step-group ${props.customClass} ${props.direction === 'column' ? 'is-vertical' : ''}`
})

/** 容器样式：把颜色/尺寸 props 映射为 hy-step-item 的组件级 CSS 变量，子步骤项统一继承 */
const groupStyle = computed<CSSProperties>(() => {
    return createStepItemCssVars({
        activeColor: props.activeColor,
        inactiveColor: props.inactiveColor,
        iconSize: props.iconSize
    })
})
</script>

<style lang="scss">
@use './index.scss';
</style>
