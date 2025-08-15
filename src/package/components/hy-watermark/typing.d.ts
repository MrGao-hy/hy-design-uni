import type { CSSProperties } from 'vue'

export default interface HyOverlayProps {
  /**
   * @description 显示内容
   * */
  content?: string
  /**
   * @description 显示图片的地址，支持网络图片和base64（钉钉小程序仅支持网络图片）
   * */
  image?: string
  /**
   * @description 图片高度
   * */
  imageHeight?: number
  /**
   * @description 图片宽度
   * */
  imageWidth?: number
  /**
   * @description X轴间距，单位px
   * */
  gutterX?: number
  /**
   * @description Y轴间距，单位px
   * */
  gutterY?: number
  /**
   * @description canvas画布宽度，单位px
   * */
  width?: number
  /**
   * @description canvas画布高度，单位px
   * */
  height?: number
  /**
   * @description 是否为全屏水印
   * */
  fullScreen?: boolean
  /**
   * @description 水印字体颜色
   * */
  color?: string
  /**
   * @description 水印字体大小，单位px
   * */
  size?: number
  /**
   * @description 水印字体样式（仅微信和h5支持），可能的值：normal、italic、oblique
   * */
  fontStyle?: string
  /**
   * @description 水印字体的粗细（仅微信和h5支持）
   * */
  fontWeight?: string
  /**
   * @description 水印字体系列（仅微信和h5支持）
   * */
  fontFamily?: string
  /**
   * @description 水印旋转角度
   * */
  rotate?: number
  /**
   * @description 自定义层级
   * */
  zIndex?: number
  /**
   * @description 自定义透明度，取值 0~1
   * */
  opacity?: number
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
}
