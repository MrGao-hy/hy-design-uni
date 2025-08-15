import type { CSSProperties } from 'vue'

export interface StepListVo {
  /**
   * @description 标题
   * */
  title?: string
  /**
   * @description 描述
   * */
  desc?: string
  /**
   * @description 是否错误
   * */
  error?: boolean
}
export default interface HyStepsProps {
  /**
   * @description 设置当前处于第几步 (默认 0 )
   * */
  current: number
  /**
   * @description 步骤条的数据集
   * */
  list: StepListVo[]
  /**
   * @description row-横向，column-竖向 (默认 'row' )
   * */
  direction?: HyApp.DirectionType
  /**
   * @description 激活状态颜色 (默认 '#3c9cff' )
   * */
  activeColor?: string
  /**
   * @description 未激活状态颜色 (默认 '#969799' )
   * */
  inactiveColor?: string
  /**
   * @description 激活状态的图标
   * */
  activeIcon?: string
  /**
   * @description 未激活状态图标
   * */
  inactiveIcon?: string
  /**
   * @description 是否显示点类型 (默认 false )
   * */
  dot?: boolean
  /**
   * @description 图标大小  (默认 17 )
   * */
  iconSize?: string | number
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
}

export interface IStepsEmits {
  /** 值改成触发 */
  (e: 'change', index: number): void
  /** 值改成触发 */
  (e: 'update:current', index: number): void
}
