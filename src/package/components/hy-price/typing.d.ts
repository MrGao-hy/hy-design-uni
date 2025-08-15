import type { CSSProperties } from 'vue'

export default interface HyPriceProps {
  /**
   * @description 传入金额值
   * */
  text: string | number
  /**
   * @description 金额符号（默认：￥）
   * */
  symbol?: string
  /**
   * @description 比例大小（默认：1.4）
   * */
  ratio?: number
  /**
   * @description 保留小数点后几位数（默认：2）
   * */
  num?: number
  /**
   * @description 字体颜色（默认：#FE3232）
   * */
  color?: string
  /**
   * @description 字体大小（默认：12）
   * */
  size?: string | number
  /**
   * @description 字体粗细（默认：500）
   * */
  weight?: number
  /**
   * @description 是否倾斜（默认：false）
   * */
  slant?: boolean
  /**
   * @description 自定义样式
   * */
  customStyle?: CSSProperties
}
