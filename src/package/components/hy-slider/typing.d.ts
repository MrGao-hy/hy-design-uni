import type { CSSProperties } from 'vue'

export default interface HySliderProps {
  /**
   * @description 滑块默认值（默认0）
   * */
  modelValue?: number
  /**
   * @description 滑块的大小，取值范围为 12 - 28
   * */
  blockSize?: number | string
  /**
   * @description 最小值（默认0）
   * */
  min?: number
  /**
   * @description 最大值（默认100）
   * */
  max?: number
  /**
   * @description 步长（默认1）
   * */
  step?: number
  /**
   * @description 底部选择部分的背景颜色（默认#2979ff）
   * */
  activeColor?: string
  /**
   * @description 底部条背景颜色（默认#c0c4cc）
   * */
  inactiveColor?: string
  /**
   * @description 滑块颜色（默认#ffffff）
   * */
  blockColor?: string
  /**
   * @description 是否显示当前的选择值
   * */
  showValue?: boolean
  /**
   * @description 是否禁用滑块(默认为false)
   * */
  disabled?: boolean
  /**
   * @description 给滑块自定义样式，对象形式
   * */
  blockStyle?: CSSProperties
  /**
   * @description 是否渲染uni-app框架内置组件（默认false）
   * */
  useNative?: boolean
  /**
   * @description 滑块条高度，单位rpx（默认6）
   * */
  height?: string | number
  /**
   * @description 双滑块时值
   * */
  rangeValue?: number[]
  /**
   * @description 是否区间的模式
   * */
  isRange?: boolean
  /**
   * @description 自定义样式
   * */
  customStyle?: CSSProperties
}

export interface ISliderEmits {
  /** 开始滑动触发 */
  (e: 'start'): void
  /** 触发事件（拖动过程中） */
  (e: 'changing', value: number): void
  /** 触发事件 */
  (e: 'change', value: number): void
  /** 数值改变触发 */
  (e: 'update:modelValue', value: number | number[]): void
}
