<template>
  <!-- #ifndef APP-NVUE -->
  <button
    :hover-start-time="Number(hoverStartTime)"
    :hover-stay-time="Number(hoverStayTime)"
    :form-type="formType"
    :open-type="openType"
    :app-parameter="appParameter"
    :hover-stop-propagation="hoverStopPropagation"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :lang="lang"
    :data-name="dataName"
    :session-from="sessionFrom"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    @getphonenumber="getphonenumber"
    @getuserinfo="getuserinfo"
    @error="error"
    @opensetting="opensetting"
    @launchapp="launchapp"
    @agreeprivacyauthorization="agreeprivacyauthorization"
    :hover-class="!disabled && !loading ? 'hy-button--active' : ''"
    :style="[baseColor, customStyle]"
    @click="clickHandler"
    :class="['hy-button', 'hy-reset-button', bemClass, customClass]"
  >
    <template v-if="loading">
      <HyLoading :mode="loadingMode" :size="loadingSize" :color="loadingColor"></HyLoading>
      <text class="hy-button__loading-text" :style="[{ fontSize: textSize + 'px' }]">
        {{ loadingText || text }}
      </text>
    </template>
    <template v-else>
      <HyIcon
        v-if="icon?.name"
        :name="icon?.name"
        :color="iconColorCom"
        :size="icon?.size || textSize * 1.35"
        :bold="icon?.bold"
        :customPrefix="icon?.customPrefix"
        :imgMode="icon?.imgMode"
        :width="icon?.width"
        :height="icon?.height"
        :top="icon?.top"
        :stop="icon?.stop"
        :round="icon?.round"
        :customStyle="icon?.customStyle || { marginRight: '2px' }"
      ></HyIcon>
      <!-- @slot 插入默认的值 -->
      <slot>
        <text class="hy-button__text" :style="[{ fontSize: textSize + 'px' }]">{{ text }}</text>
      </slot>
    </template>
  </button>
  <!-- #endif -->

  <!-- #ifdef APP-NVUE -->
  <view
    :hover-start-time="Number(hoverStartTime)"
    :hover-stay-time="Number(hoverStayTime)"
    class="hy-button"
    :hover-class="
      !disabled && !loading && !color && (plain || type === 'info')
        ? 'hy-button--active--plain'
        : !disabled && !loading && !plain
          ? 'hy-button--active'
          : ''
    "
    @click="clickHandler"
    :class="bemClass"
    :style="[baseColor, customStyle]"
  >
    <template v-if="loading">
      <HyLoading :mode="loadingMode" :size="loadingSize" :color="loadingColor"></HyLoading>
      <text
        class="hy-button__loading-text"
        :style="[nvueTextStyle]"
        :class="[plain && `hy-button__text--plain--${type}`]"
      >
        {{ loadingText || text }}
      </text>
    </template>
    <template v-else>
      <HyIcon
        v-if="icon?.name"
        :name="icon?.name"
        :color="iconColorCom"
        :size="icon?.size || textSize * 1.35"
        :bold="icon?.bold"
        :customPrefix="icon?.customPrefix"
        :imgMode="icon?.imgMode"
        :width="icon?.width"
        :height="icon?.height"
        :top="icon?.top"
        :stop="icon?.stop"
        :round="icon?.round"
        :customStyle="icon?.customStyle || { marginRight: '2px' }"
      ></HyIcon>
      <text
        class="hy-button__text"
        :style="[
          {
            marginLeft: icon ? '2px' : 0,
          },
          nvueTextStyle,
        ]"
        :class="[plain && `hy-button__text--plain--${type}`]"
      >
        {{ text }}
      </text>
    </template>
  </view>
  <!-- #endif -->
</template>

<script lang="ts">
export default {
  name: 'hy-button',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
/**
 * 该组件内部实现以uni-app的基础button组件为基础，进行二次封装
 * @displayName hy-button
 */
defineOptions({})
import { computed, toRefs } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import { bem, throttle } from '../../utils'
import { ColorConfig } from '../../config'
import type { IButtonEmits } from './typing.d.ts'
import type HyIconProps from '../hy-icon/typing'

// 组件
import HyIcon from '../hy-icon/hy-icon.vue'
import HyLoading from '../hy-loading/hy-loading.vue'

// const props = withDefaults(defineProps<HyButtonProps>(), param)
const props = defineProps({
  /** 是否显示按钮的细边框 */
  hairline: {
    type: Boolean,
    default: false,
  },
  /**
   * 按钮的预置样式
   * @values info,primary,error,warning,success
   * */
  type: {
    type: String,
    default: 'primary',
  },
  /**
   * 按钮尺寸
   * @values large,medium,small,mini
   * */
  size: {
    type: String,
    default: 'medium',
  },
  /**
   * 按钮形状
   * @values circle,square
   * */
  shape: {
    type: String,
    default: 'square',
  },
  /** 按钮是否镂空，背景色透明  */
  plain: {
    type: Boolean,
    default: false,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 按钮名称前是否带 loading 图标 */
  loading: {
    type: Boolean,
    default: false,
  },
  /** 加载中提示文字 */
  loadingText: String,
  /**
   * 加载状态图标类型
   * @values spinner,circle,semicircle
   * */
  loadingMode: {
    type: String,
    default: 'spinner',
  },
  /** 加载图标大小 */
  loadingSize: {
    type: [Number, String],
    default: 13,
  },
  /** 开放能力，具体请看uniapp稳定关于button组件部分说明 */
  openType: String,
  /** 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件 */
  formType: String,
  /** 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 （注：只微信小程序、QQ小程序有效） */
  appParameter: String,
  /** 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效 */
  hoverStopPropagation: {
    type: Boolean,
    default: true,
  },
  /**
   * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文（默认 en ）
   * @values zh_CN,zh_TW,en
   * */
  lang: {
    type: String,
    default: 'en',
  },
  /** 会话来源，openType="contact"时有效 */
  sessionFrom: String,
  /** 会话内消息卡片标题，openType="contact"时有效 */
  sendMessageTitle: String,
  /** 会话内消息卡片点击跳转小程序路径，openType="contact"时有效 */
  sendMessagePath: String,
  /** 会话内消息卡片图片，openType="contact"时有效 */
  sendMessageImg: String,
  /** 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，openType="contact"时有效 */
  showMessageCard: {
    type: Boolean,
    default: false,
  },
  /** 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取 */
  dataName: String,
  /** 节流时间，一定时间内只能触发一次 */
  throttleTime: {
    type: Number,
    default: 0,
  },
  /** 按住后多久出现点击态，单位毫秒 */
  hoverStartTime: {
    type: Number,
    default: 0,
  },
  /** 手指松开后点击态保留时间，单位毫秒 */
  hoverStayTime: {
    type: Number,
    default: 200,
  },
  /** 按钮文字，之所以通过props传入，是因为slot传入的话（注：nvue中无法控制文字的样式） */
  text: String,
  /** 按钮图标api集合 */
  icon: Object as PropType<HyIconProps>,
  /** 按钮颜色，支持传入linear-gradient渐变色 */
  color: String,
  /** 阻止事件冒泡 */
  stop: {
    type: Boolean,
    default: true,
  },
  /** 定义需要用到的外部样式 */
  customStyle: Object as unknown as PropType<CSSProperties>,
  /** 自定义外部类名 */
  customClass: String,
})
const { disabled, loading, throttleTime, stop, size, type, plain, color, icon } = toRefs(props)
const emit = defineEmits<IButtonEmits>()

const textColor = (ColorConfig as any)[type.value]

/**
 * @description 生成bem风格的类名
 */
const bemClass = computed(() => {
  // this.bem为一个computed变量，在mixin中
  if (!color.value) {
    return bem('button', props, ['type', 'shape', 'size'], ['disabled', 'plain', 'hairline'])
  } else {
    // 由于nvue的原因，在有color参数时，不需要传入type，否则会生成type相关的类型，影响最终的样式
    return bem('button', props, ['shape', 'size'], ['disabled', 'plain', 'hairline'])
  }
})

const loadingColor = computed(() => {
  if (plain.value) {
    // 如果有设置color值，则用color值，否则使用type主题颜色
    return color.value ? color.value : ''
  }
  if (type.value === 'info') {
    return '#c9c9c9'
  }
  return '#fff'
})

const iconColorCom = computed((): string => {
  // 如果是镂空状态，设置了color就用color值，否则使用主题颜色，
  if (icon.value?.color) return icon.value?.color
  if (plain.value) {
    return color.value ? color.value : ''
  } else {
    return '#ffffff'
  }
})
const baseColor = computed((): CSSProperties => {
  let style: CSSProperties = {}
  if (color.value) {
    // 针对自定义了color颜色的情况，镂空状态下，就是用自定义的颜色
    style.color = plain.value ? color.value : 'white'
    if (!plain.value) {
      // 非镂空，背景色使用自定义的颜色
      style['background'] = color.value
    }
    if (color.value.indexOf('gradient') !== -1) {
      // 如果自定义的颜色为渐变色，不显示边框，以及通过backgroundImage设置渐变色
      // weex文档说明可以写borderWidth的形式，为什么这里需要分开写？
      // 因为weex是阿里巴巴为了部门业绩考核而做的你懂的东西，所以需要这么写才有效
      style.borderTopWidth = 0
      style.borderRightWidth = 0
      style.borderBottomWidth = 0
      style.borderLeftWidth = 0
      if (!plain.value) {
        style.backgroundImage = color.value
      }
    } else {
      // 非渐变色，则设置边框相关的属性
      style.borderColor = color.value
      style.borderWidth = '1px'
      style.borderStyle = 'solid'
    }
  } else {
    // 针对自定义了color颜色的情况，镂空状态下，就是用自定义的颜色
    // style.color = plain.value ? textColor : "";
  }
  return style
})

// nvue版本按钮的字体不会继承父组件的颜色，需要对每一个text组件进行单独的设置
const nvueTextStyle = computed((): CSSProperties => {
  let style: CSSProperties = {}
  // 针对自定义了color颜色的情况，镂空状态下，就是用自定义的颜色
  if (type.value === 'info') {
    style.color = '#323233'
  }
  if (color.value) {
    style.color = plain.value ? color.value : 'white'
  }
  style.fontSize = textSize.value + 'px'
  return style
})
/**
 * @description 字体大小
 * */
const textSize = computed((): number => {
  let fontSize = 14
  if (size.value === 'large') fontSize = 16
  if (size.value === 'medium') fontSize = 14
  if (size.value === 'small') fontSize = 12
  if (size.value === 'mini') fontSize = 10
  return fontSize
})

const clickHandler = (e: any) => {
  // 非禁止并且非加载中，才能点击
  if (!disabled.value && !loading.value) {
    // 进行节流控制，每this.throttle毫秒内，只在开始处执行
    throttle(() => {
      emit('click', e)
    }, throttleTime.value)
  }
  // 是否阻止事件传播
  stop.value && e.stopPropagation()
}

const getphonenumber = (e: any) => {
  emit('getphonenumber', e)
}
const getuserinfo = (e: any) => {
  emit('getuserinfo', e)
}
const error = (e: any) => {
  emit('error', e)
}
const opensetting = (e: any) => {
  emit('opensetting', e)
}
const launchapp = (e: any) => {
  emit('launchapp', e)
}
const agreeprivacyauthorization = (e: any) => {
  emit('agreeprivacyauthorization', e)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
