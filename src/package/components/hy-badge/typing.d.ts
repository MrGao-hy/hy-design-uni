import type { CSSProperties } from 'vue'

export default interface HyBadgeProps {
  /**
   * @description 是否显示圆点 （默认 false ）
   * */
  isDot?: boolean
  /**
   * @description 显示的内容
   * */
  value?: number
  /**
   * @description 是否显示 （默认 true ）
   * */
  show?: boolean
  /**
   * @description 最大值，超过最大值会显示 '{max}+'  （默认999）
   * */
  max?: number
  /**
   * @description 主题类型，error|warning|success|primary|info （默认 'error' ）
   * */
  type?: HyApp.ThemeType
  /**
   * @description 当数值为 0 时，是否展示 Badge （默认 false ）
   * */
  showZero?: boolean
  /**
   * @description 背景颜色，优先级比type高，如设置，type参数会失效
   * */
  bgColor?: string | null
  /**
   * @description 字体颜色 （默认 '#ffffff' ）
   * */
  color?: string | null
  /**
   * @description 徽标形状，circle-四角均为圆角，horn-左下角为直角 （默认 'circle' ）
   * */
  shape?: 'circle' | 'horn'
  /**
   * @description 设置数字的显示方式，overflow|ellipsis|limit  （默认 'overflow' ）
   * */
  numberType?: 'overflow' | 'ellipsis' | 'limit'
  /**
   * @description 设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效
   * */
  offset?: number[] | null
  /**
   * @description 是否反转背景和字体颜色（默认 false ）
   * */
  inverted?: boolean
  /**
   * @description 是否绝对定位（默认 false ）
   * */
  absolute?: boolean
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
}

export interface IBadgeEmit {
  /** 点击触发 */
  (e: 'click', event: Event): void
}
