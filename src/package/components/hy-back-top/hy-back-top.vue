<template>
    <hy-transition mode="fade" :customStyle="backTopStyle" :show="show">
        <view class="hy-back-top" :style="contentStyle" @click="backToTop">
            <!-- @slot 默认插槽 -->
            <slot v-if="$slots.default"></slot>
            <template v-else>
                <hy-icon
                    :name="icon?.name || IconConfig.DOWNLOAD"
                    :color="icon?.color"
                    :size="icon?.size"
                    :bold="icon?.bold"
                    :customPrefix="icon?.customPrefix"
                    :imgMode="icon?.imgMode"
                    :width="icon?.width"
                    :height="icon?.height"
                    :top="icon?.top"
                    :stop="icon?.stop"
                    :round="icon?.round"
                    :customStyle="icon?.customStyle"
                ></hy-icon>
                <text v-if="text" class="hy-back-top__text">{{ text }}</text>
            </template>
        </view>
    </hy-transition>
</template>

<script lang="ts">
export default {
    name: 'hy-back-top',
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
import { IconConfig, addUnit, getPx } from '../../libs'
import type { IBackTopEmit } from './typing'
import backTopProps from './props'
// 组件
import HyTransition from '../hy-transition/hy-transition.vue'
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 该组件一个用于长页面，滑动一定距离后，出现返回顶部按钮，方便快速返回顶部的场景。
 * @displayName hy-back-top
 */
defineOptions({})

const props = defineProps(backTopProps)
const emit = defineEmits<IBackTopEmit>()

const backTopStyle = computed<CSSProperties>(() => {
    return {
        bottom: addUnit(props.bottom),
        right: addUnit(props.right),
        width: '40px',
        height: '40px',
        position: 'fixed',
        zIndex: 10
    }
})
const contentStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {
        borderRadius: props.mode === 'circle' ? '50%' : '4px'
    }
    return Object.assign(style, props.customStyle)
})
const show = computed<boolean>(() => {
    return getPx(props.scrollTop) > getPx(props.top)
})
const backToTop = () => {
    uni.pageScrollTo({
        scrollTop: 0,
        // #ifndef MP-ALIPAY
        // 支付宝不支持duration属性
        duration: props.duration
        // #endif
    })
    emit('click')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
