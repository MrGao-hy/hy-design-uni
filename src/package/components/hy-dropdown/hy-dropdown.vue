<template>
    <view class="hy-dropdown" :style="dropdownStyle">
        <slot></slot>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-dropdown',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { provide, ref, computed } from 'vue'
import type { CSSProperties } from 'vue'
import { addUnit } from '../../libs'
import dropdownProps from './props'

/**
 * 主要提供筛选下拉筛选框，内置基础筛选功能，可以根据自己的需求自定义筛选项。
 * @displayName hy-dropdown
 */
defineOptions({})

const props = defineProps(dropdownProps)

//样式设置
const dropdownStyle = computed(() => {
    const style: CSSProperties = props.sticky
        ? {
              position: 'fixed',
              left: 0,
              // #ifdef H5
              top: '44px',
              // #endif
              // #ifndef H5
              top: '0px'
              // #endif
          }
        : {}
    style.height = addUnit(props.height)
    if (props.borderBottom) style.borderBottom = '1px solid #dadbde'

    return Object.assign(style, props.customStyle)
})

//当前打开的项（以标题标识）
const currentDropItem = ref('')
provide('dropdownProps', props)
provide('currentDropItem', currentDropItem)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
