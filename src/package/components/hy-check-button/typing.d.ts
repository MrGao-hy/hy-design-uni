export interface CheckboxColumnsVo extends FieldNamesType {
  /**
   * @description 显示文本内容
   * */
  label?: string
  /**
   * @description 值
   * */
  value?: string | number
  /**
   * @description 是否选中
   * */
  checked?: boolean
  /**
   * @description 是否禁用
   * */
  disabled?: boolean
}
export interface IFieldNames {
  /**
   * @description 自定义columns的文本键
   * */
  label: string
  /**
   * @description 自定义columns的值键
   * */
  value: string
  /**
   * @description 自定义columns的选中键
   * */
  checked: string
}

export type FieldNamesType = {
  [key in keyof IFieldNames as IFieldNames[key]]?: string | number | boolean
}

export default interface HyCheckButtonProps {
  /**
   * @description 选中得值，radio是字符串，checkbox是数组
   * */
  modelValue: (string | number) | (string | number)[]
  /**
   * @description 选择列表数据
   * */
  columns: CheckboxColumnsVo[]
  /**
   * @description columns对应得键
   * */
  fieldNames?: IFieldNames
  /**
   * @description 选择单选框还是复选框
   * */
  selectType?: 'checkbox' | 'radio'
  /**
   * @description 禁用
   * */
  disabled?: boolean
  /**
   * @description 每行几列，每列等宽
   * */
  col?: string
  /**
   * @description 设置每行间距,需要加单位
   * */
  gap?: string
  /**
   * @description 标签类型info、primary、success、warning、error （默认 'primary' ）
   * */
  type?: HyApp.ThemeType
  /**
   * @description 标签的大小，large，medium，small （默认 'medium' ）
   * */
  size?: HyApp.SizeType
  /**
   * @description tag的形状，circle（两边半圆形）, square（方形，带圆角）（默认 'square' ）
   * */
  shape?: HyApp.ShapeType
}

export interface ICheckButtonEmits {
  /** 选择触发 */
  (e: 'change', value: any): void
  /** 更新值触发 */
  (e: 'update:modelValue', value: any): void
}
