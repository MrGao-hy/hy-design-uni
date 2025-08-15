<template>
  <view :class="`hy-icon ${customClass} hy-icon--${labelPos}`" @tap="clickHandler">
    <image
      class="hy-icon__img"
      v-if="isImg"
      :src="name"
      :mode="imgMode"
      :style="[imgStyle, customStyle]"
    ></image>
    <text v-else class="hy-icon__icon" :class="uClasses" :style="[iconStyle, customStyle]"></text>
    <!-- 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示 -->
    <text
      v-if="label"
      class="hy-icon__label"
      :style="{
        color: labelColor,
        fontSize: addUnit(labelSize),
        marginLeft: labelPos == 'right' ? addUnit(space) : 0,
        marginTop: labelPos == 'bottom' ? addUnit(space) : 0,
      }"
    >
      {{ label }}
    </text>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-icon',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { PropType, CSSProperties } from 'vue'
import { addUnit } from '../../utils'
import type { IIconEmits } from './typing'

/**
 * 基于字体的图标集，包含了大多数常见场景的图标，使用简单，开箱即用，无需自己再写每个图标的样式，直接简单配置即可。支持自定义图标。
 * @displayName hy-icon
 */
defineOptions({})

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 图标名称 */
  name: String,
  /** 图标颜色 */
  color: String,
  /** 图标字体大小，单位px */
  size: {
    type: [Number, String],
    default: '20px',
  },
  /** 是否显示粗体 */
  bold: {
    type: Boolean,
    default: false,
  },
  /** 点击图标的时候传递事件出去的index（用于区分点击了哪一个） */
  index: String,
  /** 自定义扩展前缀，方便用户扩展自己的图标库 */
  customPrefix: {
    type: String,
    default: 'hy-icon',
  },
  /** 图标右侧的label文字 */
  label: String,
  /**
   * label相对于图标的位置，只能right或bottom
   * @values right,bottom
   * */
  labelPos: {
    type: String,
    default: 'right',
  },
  /** label字体大小，单位px */
  labelSize: String,
  /** 图标右侧的label文字颜色 */
  labelColor: String,
  /** label与图标的距离，单位px */
  space: {
    type: [Number, String],
    default: '2px',
  },
  /** 图片的mode */
  imgMode: String,
  /** 显示图片小图标时的宽度 */
  width: [String, Number],
  /** 显示图片小图标时的高度 */
  height: [String, Number],
  /** 图标在垂直方向上的定位 用于解决某些情况下，让图标垂直居中的用途 */
  top: {
    type: [String, Number],
    default: 0,
  },
  /** 是否阻止事件传播 */
  stop: {
    type: Boolean,
    default: false,
  },
  /** 是否旋转 */
  isRotate: {
    type: Boolean,
    default: false,
  },
  /** 图标圆角 */
  round: {
    type: [String, Number],
    default: 0,
  },
  /** 定义需要用到的外部样式 */
  customStyle: Object as PropType<CSSProperties>,
  /** 自定义外部类名 */
  customClass: String,
})
const {
  customPrefix,
  name,
  color,
  size,
  bold,
  top,
  width,
  height,
  stop,
  index,
  isRotate,
  round,
  customClass,
  customStyle,
} = toRefs(props)
const emit = defineEmits<IIconEmits>()

const uClasses = computed(() => {
  let classes: string | string[] = [
    'iconfont',
    `${customPrefix.value}-${name.value}`,
    customPrefix.value,
  ]
  if (isRotate.value) classes.push('hy-rotate')
  if (color.value)
    // 主题色，通过类配置
    classes.push('hy-icon__icon--' + color.value)
  // 阿里，头条，百度小程序通过数组绑定类名时，无法直接使用[a, b, c]的形式，否则无法识别
  // 故需将其拆成一个字符串的形式，通过空格隔开各个类名
  //#ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
  classes = classes.join(' ')
  //#endif
  return classes
})
const iconStyle = computed<CSSProperties>(() => {
  let style: CSSProperties = {}
  style = {
    fontSize: addUnit(size.value),
    lineHeight: addUnit(size.value),
    fontWeight: bold.value ? 'bold' : 'normal',
    // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
    top: addUnit(top.value),
    borderRadius: addUnit(round.value),
    color: color.value,
  }

  return style
})

/**
 * @description 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
 * */
const isImg = computed(() => {
  return name.value?.indexOf('/') !== -1
})
const imgStyle = computed((): CSSProperties => {
  let style: CSSProperties = {}
  // 如果设置width和height属性，则优先使用，否则使用size属性
  style.width = width.value ? addUnit(width.value) : addUnit(size.value)
  style.height = height.value ? addUnit(height.value) : addUnit(size.value)
  style.borderRadius = addUnit(round.value)
  return style
})

/**
 * @description 点击
 * */
const clickHandler = (e: Event) => {
  emit('click', index.value, e)
  // 是否阻止事件冒泡
  stop.value && e.stopPropagation()
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
