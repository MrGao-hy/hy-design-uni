import type { CSSProperties } from 'vue'
import { HyApp } from '@/package/typing/modules/common'
import type IconProps from '../hy-icon/typing'

export default interface HySwitchProps {
  /**
   * @description 通过v-model双向绑定的值 （默认 false ）
   * */
  modelValue: boolean | string | number
  /**
   * @description 是否处于加载中（默认 false ）
   * */
  loading?: boolean
  /**
   * @description 是否禁用（默认 false ）
   * */
  disabled?: boolean
  /**
   * @description 开关尺寸，单位px （默认 25 ）
   * */
  size?: HyApp.SizeType | string | number
  /**
   * @description 打开时的背景色 （默认 '#2979ff' ）
   * */
  activeColor?: string
  /**
   * @description 关闭时的背景色 （默认 '#ffffff' ）
   * */
  inactiveColor?: string
  /**
   * @description 打开选择器时通过change事件发出的值 （默认 true ）
   * */
  activeValue?: boolean | string | number
  /**
   * @description 关闭选择器时通过change事件发出的值 （默认 false ）
   * */
  inactiveValue?: boolean | string | number
  /**
   * @description 打开选择器时图标
   * */
  activeIcon?: string
  /**
   * @description 关闭选择器时图标
   * */
  inactiveIcon?: string
  /**
   * @description 图标
   * */
  icon?: IconProps
  /**
   * @description 是否开启异步变更，开启后需要手动控制输入值 （默认 false ）
   * */
  asyncChange?: boolean
  /**
   * @description 圆点与外边框的距离 （默认 0 ）
   * */
  space?: number
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
}

export interface ISwitchEmits {
  /** 改变值触发 */
  (e: 'change', value: boolean): void
  /** 改变值触发 */
  (e: 'update:modelValue', value: boolean): void
}
