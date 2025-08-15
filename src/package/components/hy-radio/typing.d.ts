import type { CSSProperties } from 'vue'
import { CheckboxColumnsVo, IFieldNames } from '../hy-check-button/typing'

export default interface HyRadioProps {
  /**
   * @description 双向绑定值，数组类型
   * */
  modelValue: string | number
  /**
   * @description 接受数组值
   * */
  columns: CheckboxColumnsVo[]
  /**
   * @description 自定义接收columns的键
   * */
  fieldNames?: IFieldNames
  /**
   * @description checkbox组件的标示符
   * */
  name?: string
  /**
   * @description 形状，square为方形，circle为圆型
   * */
  shape?: HyApp.ShapeType
  /**
   * @description 整体的大小
   * */
  size?: HyApp.SizeType | string | number
  /**
   * @description 是否默认选中
   * */
  checkbox?: boolean
  /**
   * @description 是否禁用
   * */
  disabled?: boolean
  /**
   * @description 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
   * */
  activeColor?: string
  /**
   * @description 未选中的颜色
   * */
  inactiveColor?: string
  /**
   * @description 图标的大小，单位px
   * */
  iconSize?: string
  /**
   * @description 图标颜色
   * */
  iconColor?: string
  /**
   * @description label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
   * */
  label?: string
  /**
   * @description label的字体大小，px单位
   * */
  labelSize?: string | number
  /**
   * @description label的颜色
   * */
  labelColor?: string
  /**
   * @description 勾选图标的对齐方式，left-左边，right-右边
   * */
  iconPlacement?: HyApp.LeftRightType
  /**
   * @description 竖向配列时，是否显示下划线
   * */
  borderBottom?: boolean
  /**
   * @description 是否禁止点击提示语选中复选框
   * */
  labelDisabled?: boolean
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
  /**
   * @description 布局方式，row-横向，column-纵向
   * */
  placement?: HyApp.DirectionType
}

export interface IRadioEmits {
  /** 选择触发 */
  (e: 'change', temp: CheckboxColumnsVo): void
  /** 更新值触发 */
  (e: 'update:modelValue', temp: any): void
}
