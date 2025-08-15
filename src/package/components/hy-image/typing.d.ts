import type { CSSProperties } from 'vue'

export default interface HyImageProps {
  /**
   * @description 图片地址
   * */
  src?: string
  /**
   * @description 裁剪模式，见官网说明 （默认 'aspectFill' ）
   * */
  mode?: HyApp.ImageModeVo
  /**
   * @description 宽度，单位任意，如果为数值，则为px单位 （默认 '300' ）
   * */
  width?: string | number
  /**
   * @description 高度，单位任意，如果为数值，则为px单位 （默认 '225' ）
   * */
  height?: string | number
  /**
   * @description 图片形状，circle-圆形，square-方形 （默认 'square' ）
   * */
  shape?: HyApp.ShapeType
  /**
   * @description 圆角值，单位任意，如果为数值，则为px单位 （默认 0 ）
   * */
  radius?: number | string
  /**
   * @description 是否懒加载，仅微信小程序、App、百度小程序、字节跳动小程序有效 （默认 true ）
   * */
  lazyLoad?: boolean
  /**
   * @description 是否开启长按图片显示识别小程序码菜单，仅微信小程序有效 （默认 true ）
   * */
  showMenuByLongPress?: boolean
  /**
   * @description 加载中的图标，或者小图片 （默认 'photo' ）
   * */
  loadingIcon?: string
  /**
   * @description 加载失败的图标，或者小图片 （默认 'error-circle' ）
   * */
  errorIcon?: string
  /**
   * @description 是否显示加载中的图标或者自定义的slot （默认 true ）
   * */
  showLoading?: boolean
  /**
   * @description 是否显示加载错误的图标或者自定义的slot （默认 true ）
   * */
  showError?: boolean
  /**
   * @description 是否需要淡入效果 （默认 true ）
   * */
  fade?: boolean
  /**
   * @description 只支持网络资源，只对微信小程序有效 （默认 false ）
   * */
  webp?: boolean
  /**
   * @description 搭配fade参数的过渡时间，单位ms （默认 500 ）
   * */
  duration?: number
  /**
   * @description 背景颜色，用于深色页面加载图片时，为了和背景色融合  (默认 '#f3f4f6' )
   * */
  bgColor?: string
  /**
   * @description 是否模糊图片  (默认 false )
   * */
  indistinct?: boolean
  /**
   * @description 是否预览图片  (默认 false )
   * */
  previewImage?: boolean
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
}

export interface IImageEmits {
  /** 点击触发 */
  (e: 'click'): void
  /** 图片加载错误触发 */
  (e: 'error', err: Event): void
  /** 图片加载中触发 */
  (e: 'load', event: Event): void
}
