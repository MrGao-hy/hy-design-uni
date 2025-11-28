<template>
    <view :class="['hy-cell', customClass]" :style="customStyle">
        <slot></slot>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-cell',
    options: {
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { provide, toRefs } from 'vue'
import cellProps from './props'
import type { ICellEmits } from './typing'

const props = defineProps(cellProps)
const emit = defineEmits<ICellEmits>()

provide('hy-cell', {
    ...toRefs(props),
    onClick: (name: string | number) => {
        emit('click', name)
    }
})
</script>

<style lang="scss" scoped></style>
