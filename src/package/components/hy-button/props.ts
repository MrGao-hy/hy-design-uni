import type { HyButtonProps } from './typing'
import { HyApp } from 'hy-app/typing/modules/common'
import type { CSSProperties, PropType } from 'vue'
import HyIconProps from '@/package/components/hy-icon/typing'

export const defaultProps = {
  /** 是否显示按钮的细边框 */
  hairline: {
    type: Boolean,
    default: false,
  },
  /** 按钮的预置样式 */
  type: {
    type: String as PropType<HyApp.ThemeType>,
    default: 'primary',
    validator: (v) => ['info', 'primary', 'error', 'warning', 'success'].includes(v),
  },
  /** 按钮尺寸 */
  size: {
    type: String as PropType<HyApp.SizeType | 'mini'>,
    default: 'medium',
    validator: (v) => ['large', 'medium', 'small', 'mini'].includes(v),
  },
  /** 按钮形状 */
  shape: {
    type: String as PropType<HyApp.ShapeType>,
    default: 'square',
    validator: (v) => ['circle', 'square'].includes(v),
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
  loadingText: {
    type: String,
    default: '',
  },
  /** 加载状态图标类型 */
  loadingMode: {
    type: String as PropType<HyApp.LoadingMode>,
    default: 'spinner',
    validator: (v) => ['spinner', 'circle', 'semicircle'].includes(v),
  },
  /** 加载图标大小 */
  loadingSize: {
    type: Number,
    default: 13,
  },
  /** 开放能力，具体请看uniapp稳定关于button组件部分说明 */
  openType: {
    type: String,
    default: '',
  },
  /** 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件 */
  formType: {
    type: String,
    default: '',
  },
  /** 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 （注：只微信小程序、QQ小程序有效） */
  appParameter: {
    type: String,
    default: '',
  },
  /** 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效 */
  hoverStopPropagation: {
    type: Boolean,
    default: true,
  },
  /** 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文（默认 en ） */
  lang: {
    type: String,
    default: 'en',
  },
  /** 会话来源，openType="contact"时有效 */
  sessionFrom: {
    type: String,
    default: '',
  },
  /** 会话内消息卡片标题，openType="contact"时有效 */
  sendMessageTitle: {
    type: String,
    default: '',
  },
  /** 会话内消息卡片点击跳转小程序路径，openType="contact"时有效 */
  sendMessagePath: {
    type: String,
    default: '',
  },
  /** 会话内消息卡片图片，openType="contact"时有效 */
  sendMessageImg: {
    type: String,
    default: '',
  },
  /** 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，openType="contact"时有效 */
  showMessageCard: {
    type: Boolean,
    default: false,
  },
  /** 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取 */
  dataName: {
    type: String,
    default: '',
  },
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
  text: {
    type: String,
    default: '',
  },
  /** 按钮图标api集合 */
  icon: {
    type: Object as PropType<HyIconProps>,
    default: () => ({}),
  },
  /** 按钮颜色，支持传入linear-gradient渐变色 */
  color: {
    type: String,
    default: '',
  },
  /** 阻止事件冒泡 */
  stop: {
    type: Boolean,
    default: true,
  },
  /** 阻止事件冒泡 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /** 阻止事件冒泡 */
  customClass: {
    type: String,
  },
} as const
