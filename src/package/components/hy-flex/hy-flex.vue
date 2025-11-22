<template>
    <view :class="flexClass" :style="flexStyle">
        <slot />
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-flex',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { addUnit, isArray } from '../../libs'
import flexProps from './props'

const props = defineProps(flexProps)

// 计算 class
const flexClass = computed(() => [
    'hy-flex',
    props.customClass,
    props.vertical && 'hy-flex--vertical'
])

// 计算 style
const flexStyle = computed(() => {
    const gap = isArray(props.gap) ? props.gap : [props.gap, props.gap]
    const [rowGap, colGap] = gap.map((v) => addUnit(v))

    return {
        display: 'flex',
        'justify-content': props.justify,
        'align-items': props.align,
        'flex-wrap': props.wrap,
        flex: props.flex,
        'flex-basis': props.basis,
        'row-gap': colGap,
        'column-gap': rowGap,
        ...props.customStyle
    }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
