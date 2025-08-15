<template>
  <HyTransition mode="fade" :customStyle="backTopStyle" :show="show">
    <!-- @slot 默认插槽 -->
    <slot>
      <view class="hy-back-top" :style="contentStyle" @click="backToTop">
        <HyIcon
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
        ></HyIcon>
        <text v-if="text" class="hy-back-top__text">{{ text }}</text>
      </view>
    </slot>
  </HyTransition>
</template>

<script lang="ts">
export default {
  name: 'hy-back-top',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import { addUnit, getPx } from '../../utils'
import { IconConfig } from '../../config'
import type { IBackTopEmit } from './typing'
import type HyIconProps from '../hy-icon/typing'
// 组件
import HyTransition from '../hy-transition/hy-transition.vue'
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 该组件一个用于长页面，滑动一定距离后，出现返回顶部按钮，方便快速返回顶部的场景。
 * @displayName hy-back-top
 */
defineOptions({})

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /**
   * 返回顶部的形状
   * @values circle,square
   * */
  mode: {
    type: String,
    default: 'circle',
  },
  /** 自定义图标属性集合 */
  icon: {
    type: Object as PropType<HyIconProps>,
  },
  /** 提示文字 */
  text: String,
  /** 返回顶部滚动时间 */
  duration: {
    type: Number,
    default: 500,
  },
  /** 滚动距离 */
  scrollTop: {
    type: Number,
    default: 0,
  },
  /** 距离顶部多少距离显示，单位px */
  top: {
    type: Number,
    default: 400,
  },
  /** 返回顶部按钮到底部的距离，单位px */
  bottom: {
    type: Number,
    default: 100,
  },
  /** 返回顶部按钮到右边的距离，单位px */
  right: {
    type: Number,
    default: 20,
  },
  /** 层级 */
  zIndex: {
    type: Number,
    default: 888,
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default: {
      transform: 'rotate(180deg)',
    },
  },
})
const { customStyle, duration, mode, bottom, right, top, scrollTop } = toRefs(props)
const emit = defineEmits<IBackTopEmit>()

const backTopStyle = computed<CSSProperties>(() => {
  return {
    bottom: addUnit(bottom.value),
    right: addUnit(right.value),
    width: '40px',
    height: '40px',
    position: 'fixed',
    zIndex: 10,
  }
})
const contentStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    borderRadius: mode.value === 'circle' ? '50%' : '4px',
  }
  return Object.assign(style, customStyle.value)
})
const show = computed<boolean>(() => {
  return getPx(scrollTop.value) > getPx(top.value)
})
const backToTop = () => {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: duration.value,
  })
  emit('click')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
