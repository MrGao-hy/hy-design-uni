<template>
  <HyTransition mode="fade" :show="show" :style="transStyle" :duration="fade ? 1000 : 0">
    <view
      :class="['hy-image', 'box-border', customClass]"
      @tap="clickHandler"
      :style="[wrapStyle, backgroundStyle]"
    >
      <image
        v-if="!isError"
        :src="src"
        :mode="mode"
        @error="onErrorHandler"
        @load="onLoadHandler"
        :show-menu-by-longpress="showMenuByLongPress"
        :lazy-load="lazyLoad"
        :class="['hy-image__url', indistinct && 'hy-image__indistinct']"
        :style="{
          width: addUnit(width),
          height: addUnit(height),
          borderRadius: shape == 'circle' ? '1000px' : addUnit(radius),
        }"
      ></image>
      <view
        v-if="showLoading && loading"
        class="hy-image__loading"
        :style="{
          borderRadius: shape == 'circle' ? '50%' : addUnit(radius),
          backgroundColor: bgColor,
          width: addUnit(width),
          height: addUnit(height),
        }"
      >
        <slot name="loading">
          <HyLoading :name="loadingIcon"></HyLoading>
        </slot>
      </view>
      <view
        v-if="showError && isError && !loading"
        class="hy-image__error"
        :style="{
          borderRadius: shape == 'circle' ? '50%' : addUnit(radius),
        }"
      >
        <slot name="error">
          <HyIcon :name="errorIcon" size="30"></HyIcon>
        </slot>
      </view>
    </view>
  </HyTransition>
</template>

<script lang="ts">
export default {
  name: 'hy-image',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref, toRefs, watch } from 'vue'
import type { PropType, CSSProperties } from 'vue'
import type { IImageEmits } from './typing'
import { addUnit, getPx } from '../../utils'
import { IconConfig } from '../../config'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'
import HyTransition from '../hy-transition/hy-transition.vue'
import HyLoading from '../hy-loading/hy-loading.vue'

/**
 * uni-app的image组件的加强版，在继承了原有功能外，还支持淡入动画、加载中、加载失败提示、圆角值和形状等。
 * @displayName hy-image
 */
defineOptions({})

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 图片地址 */
  src: String,
  /** 裁剪模式，见官网说明 */
  mode: {
    type: String,
    default: 'aspectFill',
  },
  /** 宽度，单位任意，如果为数值，则为px单位 */
  width: {
    type: [String, Number],
    default: '',
  },
  /** 高度，单位任意，如果为数值，则为px单位 */
  height: {
    type: [String, Number],
    default: '',
  },
  /**
   * 图片形状
   * @values circle,square
   * */
  shape: {
    type: String,
    default: 'square',
  },
  /** 圆角值，单位任意，如果为数值，则为px单位 */
  radius: {
    type: [Number, String],
    default: 0,
  },
  /** 是否懒加载，仅微信小程序、App、百度小程序、字节跳动小程序有效 */
  lazyLoad: {
    type: Boolean,
    default: true,
  },
  /** 是否开启长按图片显示识别小程序码菜单，仅微信小程序有效 */
  showMenuByLongPress: {
    type: Boolean,
    default: true,
  },
  /** 加载中的图标，或者小图片 */
  loadingIcon: {
    type: String,
    default: IconConfig.LOADING,
  },
  /** 加载失败的图标，或者小图片 */
  errorIcon: {
    type: String,
    default: IconConfig.NOTICE,
  },
  /** 是否显示加载中的图标或者自定义的slot */
  showLoading: {
    type: Boolean,
    default: true,
  },
  /** 是否显示加载错误的图标或者自定义的slot */
  showError: {
    type: Boolean,
    default: true,
  },
  /** 是否需要淡入效果 */
  fade: {
    type: Boolean,
    default: true,
  },
  /** 只支持网络资源，只对微信小程序有效 */
  webp: {
    type: Boolean,
    default: false,
  },
  /** 搭配fade参数的过渡时间，单位ms */
  duration: {
    type: Number,
    default: 500,
  },
  /** 背景颜色，用于深色页面加载图片时，为了和背景色融合 */
  bgColor: String,
  /** 是否模糊图片 */
  indistinct: {
    type: Boolean,
    default: false,
  },
  /** 是否预览图片 */
  previewImage: {
    type: Boolean,
    default: false,
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /** 自定义外部类名 */
  customClass: String,
})
const {
  customStyle,
  duration,
  src,
  width,
  height,
  mode,
  shape,
  radius,
  bgColor,
  previewImage,
  indistinct,
} = toRefs(props)
const emit = defineEmits<IImageEmits>()

// 图片是否加载错误，如果是，则显示错误占位图
const isError = ref(false)
// 初始化组件时，默认为加载中状态
const loading = ref(true)
// 不透明度，为了实现淡入淡出的效果
const opacity = ref(1)
// 过渡时间，因为props的值无法修改，故需要一个中间值
const durationTime = ref(duration.value)
// 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景
const backgroundStyle = ref({})
// 用于fade模式的控制组件显示与否
const show = ref(false)

watch(
  () => src.value,
  (newValue) => {
    if (!newValue) {
      // 如果传入null或者''，或者false，或者undefined，标记为错误状态
      isError.value = true
      loading.value = false
    } else {
      isError.value = false
      loading.value = true
    }
  },
  { immediate: true },
)

const transStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (loading.value || isError.value || width.value == '100%' || mode.value != 'heightFix') {
    style.width = addUnit(width.value)
  } else {
    style.width = 'fit-content'
  }
  if (loading.value || isError.value || height.value == '100%' || mode.value != 'widthFix') {
    style.height = addUnit(height.value)
  } else {
    style.height = 'fit-content'
  }
  return style
})

const wrapStyle = computed(() => {
  const style: CSSProperties = {}
  if (loading.value || isError.value || width.value == '100%' || mode.value != 'heightFix') {
    style.width = addUnit(width.value)
  } else {
    style.width = 'fit-content'
  }
  if (loading.value || isError.value || height.value == '100%' || mode.value != 'widthFix') {
    style.height = addUnit(height.value)
  } else {
    style.height = 'fit-content'
  }
  // 如果是显示圆形，设置一个很多的半径值即可
  style.borderRadius = shape.value == 'circle' ? '10000px' : addUnit(radius.value)
  // 如果设置圆角，必须要有hidden，否则可能圆角无效
  style.overflow = getPx(radius.value) > 0 ? 'hidden' : 'visible'

  return Object.assign(style, customStyle.value)
})

onMounted(() => {
  show.value = true
})

const clickHandler = () => {
  emit('click')

  if (previewImage.value) {
    uni.previewImage({
      urls: [src.value],
    })
  }
}

/**
 * @description 图片加载失败
 * */
const onErrorHandler = (err: Event) => {
  loading.value = false
  isError.value = true
  emit('error', err)
}

/**
 * @description 图片加载成功
 * */
const onLoadHandler = (e: Event) => {
  loading.value = false
  isError.value = false
  emit('load', e)
  removeBgColor()
}

const removeBgColor = () => {
  // 淡入动画过渡完成后，将背景设置为透明色，否则png图片会看到灰色的背景
  backgroundStyle.value = {
    backgroundColor: bgColor.value || '',
  }
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
