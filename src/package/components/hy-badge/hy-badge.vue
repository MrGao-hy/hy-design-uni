<template>
  <text
    v-if="show && ((Number(value) === 0 ? showZero : true) || isDot)"
    :class="[
      'hy-badge',
      isDot ? 'hy-badge--dot' : 'hy-badge--not-dot',
      inverted && 'hy-badge--inverted',
      shape === 'horn' && 'hy-badge--horn',
      `hy-badge--${type}${inverted ? '--inverted' : ''}`,
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
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
/**
 * 该组件一般用于图标右上角显示未读的消息数量，提示用户点击，有圆点和圆包含文字两种形式。
 * @displayName hy-badge
 */
defineOptions({})
import type { IBadgeEmit } from './typing'
import defaultProps from './props'
import { computed, type CSSProperties, PropType, toRefs } from 'vue'
import { addUnit } from '../../utils'

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 是否显示圆点 */
  isDot: {
    type: Boolean,
    default: false,
  },
  /** 显示的内容 */
  value: {
    type: Number,
    default: 0,
  },
  /** 是否显示 */
  show: {
    type: Boolean,
    default: true,
  },
  /** 最大值，超过最大值会显示 '{max}+' */
  max: {
    type: Number,
    default: 999,
  },
  /**
   * 主题类型
   * @values error,warning,success,primary,info
   * */
  type: {
    type: String,
    default: 'error',
  },
  /** 当数值为 0 时，是否展示 Badge */
  showZero: {
    type: Boolean,
    default: false,
  },
  /** 背景颜色，优先级比type高，如设置，type参数会失效 */
  bgColor: String,
  /** 字体颜色 */
  color: String,
  /**
   * 徽标形状
   * @values circle,horn
   * */
  shape: {
    type: String,
    default: 'circle',
  },
  /**
   * 设置数字的显示方式
   * @values overflow,ellipsis,limit
   * */
  numberType: {
    type: String,
    default: 'overflow',
  },
  /**  设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效 */
  offset: Array<number>,
  /** 是否反转背景和字体颜色 */
  inverted: {
    type: Boolean,
    default: false,
  },
  /** 是否绝对定位 */
  absolute: {
    type: Boolean,
    default: false,
  },
  /** 自定义输入框外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
})
const { value, bgColor, color, numberType, absolute, offset, inverted, max, customStyle } =
  toRefs(props)
const emit = defineEmits<IBadgeEmit>()

/**
 * @description 整个组件的样式
 * */
const badgeStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (color.value) {
    style.color = color.value
  }
  if (bgColor.value && !inverted.value) {
    style.backgroundColor = bgColor.value
  }
  if (absolute.value) {
    style.position = 'absolute'
    // 如果有设置offset参数
    if (offset.value && Array.isArray(offset.value)) {
      // top和right分为为offset的第一个和第二个值，如果没有第二个值，则right等于top
      const top = offset.value[0]
      const right = offset.value[1] || top
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
  switch (numberType.value) {
    case 'overflow':
      return Number(value.value) > Number(max.value) ? max.value + '+' : value.value
    case 'ellipsis':
      return Number(value.value) > Number(max.value) ? '...' : value.value
    case 'limit':
      return Number(value.value) > 999
        ? Number(value.value) >= 9999
          ? Math.floor((value.value / 1e4) * 100) / 100 + 'w'
          : Math.floor((value.value / 1e3) * 100) / 100 + 'k'
        : value.value
    default:
      return Number(value.value)
  }
})

const onClick = (e: Event) => {
  emit('click', e)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
