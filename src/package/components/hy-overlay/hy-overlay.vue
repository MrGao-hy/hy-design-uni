<template>
    <hy-transition
        :show="show"
        :custom-class="`hy-overlay ${customClass}`"
        :duration="duration"
        :custom-style="overlayStyle"
        :lock-scroll="lockScroll"
        @click="clickHandler"
    >
        <!-- lockScroll=false 时容器整体 pointer-events: none（背景触摸穿透），内容层需显式恢复交互，否则插槽内容继承 none 不可点击 -->
        <view class="hy-overlay__content">
            <slot />
        </view>
    </hy-transition>
</template>

<script lang="ts">
export default {
    name: 'hy-overlay',
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
import type { IOverlayEmits } from './typing'
import overlayProps from './props'
// 组件
import HyTransition from '../hy-transition/hy-transition.vue'

/**
 * 创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景
 * @displayName hy-overlay
 */
defineOptions({})

const props = defineProps(overlayProps)
const emit = defineEmits<IOverlayEmits>()

const overlayStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: props.zIndex,
        bottom: 0,
        pointerEvents: props.passThrough ? 'none' : 'auto',
        'background-color': `rgba(0, 0, 0, ${props.opacity})`
    }
    return Object.assign(style, props.customStyle)
})
const clickHandler = () => {
    emit('click')
}
</script>

<style lang="scss">
@use './index.scss';
</style>
