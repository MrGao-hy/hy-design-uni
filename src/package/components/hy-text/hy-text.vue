<template>
  <view :class="['hy-text', customClass]" v-if="show" :style="wrapStyle" @tap="clickHandler">
    <text
      :class="['hy-text__price', type && `hy-text__value--${type}`]"
      v-if="mode === 'price'"
      :style="[valueStyle]"
    >
      ￥
    </text>
    <view class="hy-text__prefix-icon" v-if="prefixIcon">
      <HyIcon :name="prefixIcon" :customStyle="iconStyle"></HyIcon>
    </view>
    <template v-if="openType && isMp">
      <button
        class="hy-reset-button hy-text__value"
        :style="[valueStyle]"
        :data-index="index"
        :openType="openType"
        @getuserinfo="onGetUserInfo"
        @contact="onContact"
        @getphonenumber="onGetPhoneNumber"
        @error="onError"
        @launchapp="onLaunchApp"
        @opensetting="onOpenSetting"
        :lang="lang"
        :session-from="sessionFrom"
        :send-message-title="sendMessageTitle"
        :send-message-path="sendMessagePath"
        :send-message-img="sendMessageImg"
        :show-message-card="showMessageCard"
        :app-parameter="appParameter"
      >
        {{ value }}
      </button>
    </template>
    <text
      v-else
      class="hy-text__value"
      :style="[valueStyle]"
      :class="[
        type && `hy-text__value--${type}`,
        lines && `hy-text__value--lines`,
        mode === 'link' && `hy-text__value--link`,
      ]"
    >
      {{ value }}
    </text>
    <view class="hy-text__suffix-icon" v-if="suffixIcon">
      <HyIcon :name="suffixIcon" :customStyle="iconStyle"></HyIcon>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-text',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed, nextTick, toRefs } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import type { ITextEmits } from './typing'
import { addUnit, error, formatName, formatTime, isDate, priceFormat } from '../../utils'

// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 此组件集成了文本类在项目中的常用功能，包括状态，拨打电话，格式化日期，*替换，超链接...等功能。 您大可不必在使用特殊文本时自己定义，text组件几乎涵盖您能使用的大部分场景。
 * @displayName hy-text
 */
defineOptions({})

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 显示的值 */
  text: [String, Number],
  /** 主题颜色 */
  type: String,
  /** 是否显示 */
  show: {
    type: Boolean,
    default: true,
  },
  /** 前置图标 */
  prefixIcon: String,
  /** 后置图标 */
  suffixIcon: String,
  /**
   * 文本处理的匹配模式
   * @values text,price,phone,name,date,link
   * */
  mode: {
    type: String,
    default: 'text',
  },
  /** mode=link下，配置的链接 */
  href: String,
  /** 格式化规则 */
  format: String,
  /** mode=phone时，点击文本是否拨打电话 */
  call: {
    type: Boolean,
    default: false,
  },
  /** 小程序的打开方式 */
  openType: String,
  /** 是否粗体，默认normal */
  bold: {
    type: Boolean,
    default: false,
  },
  /** 是否块状 */
  block: {
    type: Boolean,
    default: false,
  },
  /** 文本显示的行数，如果设置，超出此行数，将会显示省略号 */
  lines: [String, Number],
  /** 文本颜色 */
  color: String,
  /** 字体大小 */
  size: {
    type: [String, Number],
    default: 15,
  },
  /** 图标的样式 */
  iconStyle: {
    type: Object as unknown as PropType<CSSProperties>,
    default: () => ({ fontSize: '15px' }),
  },
  /**
   * 文字装饰，下划线，中划线等，可选值
   * @values none,underline,line-through
   * */
  decoration: String,
  /** 外边距，对象、字符串，数值形式均可 */
  margin: String,
  /** 文本行高 */
  lineHeight: String,
  /**
   * 文本对齐方式
   * @values left,center,right
   * */
  align: {
    type: String,
    default: 'left',
  },
  /**
   * 文字换行
   * @values normal,break-word,anywhere
   * */
  wordWrap: {
    type: String,
    default: 'normal',
  },
  /** 是否占满剩余空间 */
  flex: {
    type: Boolean,
    default: true,
  },
  /** 定义需要用到的外部样式 */
  customStyle: Object as PropType<CSSProperties>,
  /** 自定义外部类名 */
  customClass: String,
})
const {
  type,
  show,
  text,
  mode,
  call,
  bold,
  block,
  color,
  size,
  decoration,
  margin,
  lines,
  lineHeight,
  align,
  flex,
  href,
  format,
  customStyle,
} = toRefs(props)
const emit = defineEmits<ITextEmits>()

const wrapStyle = computed(() => {
  const style: CSSProperties = {
    margin: margin.value,
    justifyContent:
      align.value === 'left' ? 'flex-start' : align.value === 'center' ? 'center' : 'flex-end',
  }
  // 占满剩余空间
  if (flex.value) {
    style.flex = 1
    // #ifndef APP-NVUE
    style.width = '100%'
    // #endif
  }
  return style
})
const valueStyle = computed(() => {
  const style: CSSProperties = {
    textDecoration: decoration.value,
    fontWeight: bold.value ? 'bold' : 'normal',
    fontSize: addUnit(size.value),
  }
  !type.value && (style.color = color.value)
  lineHeight.value && (style.lineHeight = addUnit(lineHeight.value))
  block.value && (style.display = 'block')
  return Object.assign(style, customStyle.value)
})

/**
 * @description 格式化值
 * */
const value = computed(() => {
  switch (mode.value) {
    case 'price':
      // 如果text不为金额进行提示
      if (!/^\d+(\.\d+)?$/.test(text.value.toString())) {
        error('金额模式下，text参数需要为金额格式')
      }
      // 进行格式化，判断用户传入的format参数为正则，或者函数，如果没有传入format，则使用默认的金额格式化处理
      if (typeof format.value === 'function') {
        // 如果用户传入的是函数，使用函数格式化
        return format.value(text.value)
      }
      // 如果format非正则，非函数，则使用默认的金额格式化方法进行操作
      return priceFormat(text.value, 2)
    case 'date':
      // 判断是否合法的日期或者时间戳
      !isDate(text.value) && error('日期模式下，text参数需要为日期或时间戳格式')
      // 进行格式化，判断用户传入的format参数为正则，或者函数，如果没有传入format，则使用默认的格式化处理
      if (typeof format.value === 'function') {
        // 如果用户传入的是函数，使用函数格式化
        return format.value(text)
      }
      if (format.value) {
        // 如果format非正则，非函数，则使用默认的时间格式化方法进行操作
        return formatTime(text.value, format.value)
      }
      // 如果没有设置format，则设置为默认的时间格式化形式
      return formatTime(text.value, 'yyyy-MM-dd')
    case 'phone':
      // 判断是否合法的手机号
      // !test.mobile(text) && error('手机号模式下，text参数需要为手机号码格式')
      if (typeof format.value === 'function') {
        // 如果用户传入的是函数，使用函数格式化
        return format.value(text)
      }
      if (format.value === 'encrypt') {
        // 如果format为encrypt，则将手机号进行星号加密处理
        return `${text.value.toString().substring(0, 3)}****${text.value.toString().substring(7)}`
      }
      return text.value
    case 'name':
      // 判断是否合法的字符粗
      if (typeof text.value !== 'string') {
        error('姓名模式下，text参数需要为字符串格式')
      } else {
        if (typeof format.value === 'function') {
          // 如果用户传入的是函数，使用函数格式化
          return format.value(text)
        }
        if (format.value === 'encrypt') {
          // 如果format为encrypt，则将姓名进行星号加密处理
          return formatName(text.value)
        }
      }
      return text.value
    case 'link':
      return text.value
    default:
      return text.value
  }
})

const isMp = computed(() => {
  let mp = false
  // #ifdef MP
  mp = true
  // #endif
  return mp
})

const clickHandler = (e) => {
  // 如果为手机号模式，拨打电话
  if (call.value && mode.value === 'phone') {
    uni.makePhoneCall({
      phoneNumber: text.value,
    })
  }
  // 如果是有链接跳转
  if (href.value && mode.value === 'link') {
    toLink()
  }
  emit('click', e)
}

const toLink = () => {
  // #ifdef APP-PLUS
  plus.runtime.openURL(href.value)
  // #endif
  // #ifdef H5
  window.open(href.value)
  // #endif
  // #ifdef MP
  uni.setClipboardData({
    data: href.value,
    success: () => {
      uni.hideToast()
      nextTick(() => {
        uni.showToast({ title: '链接已复制，请在浏览器打开' })
      })
    },
  })
  // #endif
}
</script>

<style scoped lang="scss">
@import './index.scss';
@import '../../libs/css/mixin.scss';
/*超出出现省略号*/
.hy-text__value--lines {
  @include multiEllipsis(v-bind(lines));
}
</style>
