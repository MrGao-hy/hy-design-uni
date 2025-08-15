<template>
  <view :class="['hy-divider', customClass]" :style="dividerStyle">
    <HyLine
      :color="lineColor"
      :customStyle="leftLineStyle"
      :style="leftLineStyle"
      :hairline="hairline"
      :dashed="dashed"
    ></HyLine>
    <HyLoading :show="text === 'loading'" size="18" mode="spinner"></HyLoading>
    <text v-if="dot" class="hy-divider__dot">●</text>
    <text v-else-if="text" class="hy-divider__text" :style="textStyle">{{ content }}</text>
    <HyLine
      :color="lineColor"
      :customStyle="rightLineStyle"
      :style="rightLineStyle"
      :hairline="hairline"
      :dashed="dashed"
    ></HyLine>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-divider',
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
import { addUnit } from '../../utils'
// 组件
import HyLine from '../hy-line/hy-line.vue'
import HyLoading from '../hy-loading/hy-loading.vue'
import { IconConfig } from '../../config'

/**
 * 区隔内容的分割线，一般用于页面底部"没有更多"的提示
 * @displayName hy-divider
 */
defineOptions({})

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 是否虚线 */
  dashed: {
    type: Boolean,
    default: false,
  },
  /** 是否细线 */
  hairline: {
    type: Boolean,
    default: true,
  },
  /** 是否以点替代文字，优先于text字段起作用 */
  dot: {
    type: Boolean,
    default: false,
  },
  /**
   * 内容文本的位置
   * @values left,center,right
   * */
  textPosition: {
    type: String,
    default: 'center',
  },
  /** 文本内容，如果为loadMore就是加载前，如果为loading就是加载中，如果为noMore就是没有更多 */
  text: String,
  /** 文本大小 */
  textSize: {
    type: [String, Number],
    default: 14,
  },
  /** 文本颜色 */
  textColor: String,
  /** 线条颜色 */
  lineColor: String,
  /** 加载图标 */
  loadingIcon: {
    type: String,
    default: IconConfig.LOADING,
  },
  /** 加载前的提示语 */
  loadMoreText: {
    type: String,
    default: '加载更多',
  },
  /** 加载中提示语 */
  loadingText: {
    type: String,
    default: '正在加载...',
  },
  /** 没有更多的提示语 */
  noMoreText: {
    type: String,
    default: '没有更多了',
  },
  /** 上边距 */
  marginTop: {
    type: [String, Number],
    default: 0,
  },
  /** 下边距 */
  marginBottom: {
    type: [String, Number],
    default: 0,
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /** 自定义外部类名 */
  customClass: String,
})
const {
  text,
  textSize,
  textColor,
  textPosition,
  dashed,
  lineColor,
  loadMoreText,
  loadingText,
  noMoreText,
  marginTop,
  marginBottom,
  customStyle,
} = toRefs(props)

const isLoad = ['loadMore', 'loading', 'noMore'].includes(text.value)

/**
 * @description 分割线样式
 * */
const dividerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  style.marginTop = addUnit(marginTop.value) || isLoad ? '20px' : addUnit(marginTop.value)
  style.marginBottom = addUnit(marginBottom.value) || isLoad ? '20px' : addUnit(marginBottom.value)
  return Object.assign(style, customStyle.value)
})
/**
 * @description 文本内容
 * */
const content = computed(() => {
  let text = ''
  switch (props.text) {
    case 'loadMore':
      text = loadMoreText.value
      break
    case 'loading':
      text = loadingText.value
      break
    case 'noMore':
      text = noMoreText.value
      break
    default:
      text = props.text
      break
  }
  return text
})
/**
 * @description 文本内容样式
 * */
const textStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  style.fontSize = addUnit(textSize.value)
  style.color = textColor.value
  return style
})

/**
 * @description 左边线条的的样式
 * */
const leftLineStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    marginRight: '20rpx',
  }
  // 如果是在左边，设置左边的宽度为固定值
  if (isLoad) {
    style.width = '80px'
  } else if (textPosition.value === 'left') {
    style.width = '80rpx'
  } else {
    style.flex = 1
  }
  return style
})
/**
 * @description 右边线条的的样式
 * */
const rightLineStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    marginLeft: '20rpx',
  }
  // 如果是在右边，设置右边的宽度为固定值
  if (isLoad) {
    style.width = '80px'
  } else if (textPosition.value === 'right') {
    style.width = '80rpx'
  } else {
    style.flex = 1
  }
  return style
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
