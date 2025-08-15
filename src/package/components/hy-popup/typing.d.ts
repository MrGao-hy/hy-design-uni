import type { CSSProperties } from 'vue'

export default interface HyPopupProps {
  /**
   * @description 是否展示弹窗 (默认 false )
   * */
  show: boolean
  /**
   * @description 是否显示遮罩 （默认 true ）
   * */
  overlay?: boolean
  /**
   * @description 弹出方向（默认 'bottom' ）
   * */
  mode?: HyApp.LayoutType
  /**
   * @description 动画时长，单位ms （默认 300 ）
   * */
  duration?: number
  /**
   * @description 是否显示关闭图标（默认 false ）
   * */
  closeable?: boolean
  /**
   * @description 自定义遮罩的样式
   * */
  overlayStyle?: CSSProperties
  /**
   * @description 遮罩透明度，0-1之间（默认 0.5）
   * */
  overlayOpacity?: number
  /**
   * @description 点击遮罩是否关闭弹窗 （默认  true ）
   * */
  closeOnClickOverlay?: boolean
  /**
   * @description 层级 （默认 10075 ）
   * */
  zIndex?: number
  /**
   * @description 是否为iPhoneX留出底部安全距离 （默认 true ）
   * */
  safeAreaInsetBottom?: boolean
  /**
   * @description 是否留出顶部安全距离（状态栏高度） （默认 false ）
   * */
  safeAreaInsetTop?: boolean
  /**
   * @description 自定义关闭图标位置（默认 'top-right' ）
   * */
  closeIconPos?: 'top-left' | 'top-right'
  /**
   * @description 圆角值（默认 0）
   * */
  round?: string | number
  /**
   * @description 当mode=center时 是否开启缩放（默认 true ）
   * */
  zoom?: boolean
  /**
   * @description 背景颜色
   * */
  bgColor?: string
  /**
   * @description 自定义样式
   * */
  customStyle?: CSSProperties
}

export interface IPopupEmits {
  /** 弹出层打开触发 */
  (e: 'open'): void
  /** 弹出层关闭触发 */
  (e: 'close'): void
  /** 弹出层点击触发 */
  (e: 'click'): void
  /** 显示隐藏触发 */
  (e: 'update:show', visible: boolean): void
}
