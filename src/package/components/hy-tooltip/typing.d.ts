import type { CSSProperties } from 'vue'

export default interface HyTooltipProps {
  /**
   * @description 需要显示的提示文字
   * */
  text: string
  /**
   * @description 点击复制按钮时，复制的文本，为空则使用text值
   * */
  copyText?: string
  /**
   * @description 文本大小（默认 14 ）
   * */
  size?: number | string
  /**
   * @description 字体颜色（默认 '#606266' ）
   * */
  color?: string
  /**
   * @description 弹出提示框时，文本的背景色（默认 'transparent' ）
   * */
  bgColor?: string
  /**
   * @description 弹出提示的方向，top-上方，bottom-下方（默认 'top' ）
   * */
  direction?: HyApp.TopBottomType
  /**
   * @description 弹出提示的z-index，nvue无效（默认 10071 ）
   * */
  zIndex?: number
  /**
   * @description 是否显示复制按钮（默认 true ）
   * */
  showCopy?: boolean
  /**
   * @description 扩展的按钮组
   * */
  buttons?: string[]
  /**
   * @description 是否显示透明遮罩以防止触摸穿透（默认 true ）
   * */
  overlay?: boolean
  /**
   * @description 是否显示遮罩
   * */
  showToast?: boolean
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
}

export interface ITooltipEmits {
  /** 点击菜单按钮触发 */
  (e: 'click', index: number): void
}
