<template>
    <view :style="safeBottomStyle" :class="['hy-safe-bottom', isH5 && 'hy-safe-area-inset-bottom', customClass]">
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-safe-bottom',
    options: {
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, ref, type CSSProperties } from 'vue'
import { addUnit, getWindowInfo, isH5 } from '../../libs'
import safeBottomProps from './props';

const props = defineProps(safeBottomProps);

const safeBottomStyle = computed(() => {
    const style: CSSProperties = {
        background: props.bgColor
    }
    // 某些平台无法识别css的底部安全区变量，所以使用js获取的方式
    const { safeAreaInsets } = getWindowInfo() as any
    const bottom = safeAreaInsets?.bottom || 0
    if (bottom > 0) {
        style.height = addUnit(bottom)
    }

    return Object.assign(style, props.customStyle)
})
</script>
