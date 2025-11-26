<template>
    <view
        :class="{
            'hy-tabbar-group__placeholder':
                fixed && placeholder && safeAreaInsetBottom && shape === 'round'
        }"
    >
        <view :class="rootClass" :style="rootStyle">
            <slot></slot>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-tabbar-group',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script lang="ts" setup>
import { computed, provide, toRefs, type CSSProperties, ref, onUnmounted } from 'vue'
import tabbarGroupProps from './props'
import type { ITabBarGroupEmits } from './typing'

/**
 * 底部导航栏，用于在不同页面之间进行切换。
 * @displayName hy-tabbar-group
 */
defineOptions({})

const props = defineProps(tabbarGroupProps)
const emit = defineEmits<ITabBarGroupEmits>()

const index = ref(0) // 递增用
const getIndex = () => {
    return index.value++
}

provide('hy-tabbar', {
    ...toRefs(props),
    setChange,
    getIndex
})

// 父属性值
const rootStyle = computed(() => {
    const style: CSSProperties = {
        background: props.bgColor,
        zIndex: props.zIndex
    }
    return Object.assign(style, props.customStyle)
})
// 父类名
const rootClass = computed(() => {
    return [
        'hy-tabbar-group',
        `hy-tabbar-group--${props.shape}`,
        props.customClass,
        props.fixed && 'is-fixed',
        props.safeAreaInsetBottom && 'is-safe',
        props.border && 'is-border'
    ]
})

onUnmounted(() => {
    index.value = 0
})

/**
 * 子项状态变更
 * @param index 子项
 */
function setChange(index: string | number) {
    emit('update:modelValue', index)
    emit('change', {
        value: index
    })
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
